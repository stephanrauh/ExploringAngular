import { Move } from './move';
import { Chessboard } from './chessboard';
import { CheckMateException } from './CheckMateException';
import { StaleMateException } from './StaleMateException';

export class Suggestor {
  constructor(public chessboard: Chessboard) {}

  suggestMove(lookahead: number, breadth: number): Move {
    let PERFORMANCE_MEASURE_start = window.performance.now();
    let moves: Move[] = this.chessboard.moves.legalMoves;
    try {
      this.findBestAnswerTo(lookahead, breadth);
      let sortedMoves = moves.sort((m1, m2) => m2.value - m1.value);
      //                console.log("Suggested moves:")
      //                sortedMoves.forEach(move => console.log(move.toString() + " " + move.value))
      let PERFORMANCE_MEASURE_stop = window.performance.now();
      let PERFORMANCE_MEASURE_SUM = PERFORMANCE_MEASURE_stop - PERFORMANCE_MEASURE_start;
      //        console.log("Total calculation took " + PERFORMANCE_MEASURE_SUM + " ms");
      //        Evaluator.showPerformanceStats()
      return sortedMoves[0];
    } catch (ex) {
      return null; // checkmate or stalemate
    }
  }

  findBestAnswerTo(level: number, breadth: number): Move {
    let moves: Move[] = this.chessboard.moves.legalMoves;
    let sortedMoves = moves.sort((m1, m2) => m2.value - m1.value);
    if (this.chessboard.moves.ownCheckMate) {
      if (sortedMoves.length > 0) {
        console.log('no move should be available! white playing:' + this.chessboard.isWhitePlaying);
        //sortedMoves.forEach((mv) => { console.log(mv.toString()) })
        let histoire = '';
        this.chessboard.moveHistory.forEach(mv => {
          histoire += ' ' + mv.toString();
        });
        console.log(histoire);
        this.chessboard.fields.forEach(row => {
          let line: String = '';
          row.forEach(piece => {
            if (piece < 0) line += ' ' + piece;
            else line += '  ' + piece;
          });
          console.log(line);
        });
      }
      throw new CheckMateException();
    }
    if (sortedMoves.length === 0) {
      console.log('No move');
      if (this.chessboard.moves.ownCheck) throw new CheckMateException();
      else throw new StaleMateException();
    }

    if (level > 1) {
      sortedMoves = sortedMoves.slice(0, breadth);
      sortedMoves = sortedMoves.filter(answer => answer.value > -20000); // can only occur if the king is captured
      let index = 0;
      while (index < breadth && index < sortedMoves.length) {
        let answer = moves[index];
        if (answer.value > 20000) break;
        let captured = this.chessboard.capturedPieces.length;
        let moveCount = this.chessboard.moveHistory.length;
        try {
          this.chessboard.move(answer.fromRow, answer.fromCol, answer.toRow, answer.toCol, answer.promotion);
          let answerToAnswer = this.findBestAnswerTo(level - 1, breadth);

          answer.value = -answerToAnswer.value;
          index++;
        } catch (ex) {
          if (typeof ex === 'CheckMateException') {
            answer.value = 100000;
            break;
          } else answer.value = 0;
        } finally {
          this.chessboard.revertLastMove();
          if (captured !== this.chessboard.capturedPieces.length) {
            console.log('Nanu?' + level + ' ' + answer.toString());
          }
          if (moveCount !== this.chessboard.moveHistory.length) {
            console.log('moves?' + level + ' ' + answer.toString());
          }
        }
      }
      sortedMoves = sortedMoves.sort((m1, m2) => m2.value - m1.value);
    }
    return sortedMoves[0];
  }
}
