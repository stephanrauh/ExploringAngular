import {Move} from './move';
import {Chessboard} from './chessboard';

export class Suggestor {
    constructor(public chessboard: Chessboard) { }

    suggestMove(): Move {
      var moves: Move[] = this.chessboard.moves.legalMoves;
      var sortedMoves = moves.sort((m1, m2) => m2.value-m1.value)
      console.log("Suggested moves:")
      sortedMoves.forEach(move => console.log(move.toString() + " " + move.value))
      return sortedMoves[0];
    }
}
