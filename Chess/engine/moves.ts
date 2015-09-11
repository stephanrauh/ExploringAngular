import {Engine} from "./chessboard";
import {Move} from './move';

export class Moves {
  private _legalMoves: Array<Move> = null;
  constructor(private chessboard: Engine.Chessboard) { }

  get legalMoves(): Array<Move> {
    this.calculateLegalMoves();
    return this._legalMoves;
  }

  isLegalMove(fromRow: number, fromCol: number, toRow: number, toCol: number) {
    this.calculateLegalMoves();
    for (var move in this._legalMoves) {
      if (move.fromRow == fromRow && move.fromCol == fromCol && move.toRow == toRow && move.toCol == toCol)
        return true;
    }
    return false;
  }

  calculateLegalMoves() {
    if (null == this._legalMoves) {
      var result: Array<Move> = new Array<Move>();
      for (var row: number = 0; row < this.chessboard.fields.length; row++) {
        var currentRow: number[] = this.chessboard.fields[row];
        for (var col: number = 0; col < currentRow.length; col++) {
          var piece: number = this.chessboard.fields[row][col];
          if (this.chessboard.isWhitePlaying) {
            if (piece > 0)
              this.addWhiteMoves(row, col, piece, this.chessboard.fields, result);
          } else if (piece < 0)
            this.addBlackMoves(row, col, piece, this.chessboard.fields, result);
        }
      }
      this._legalMoves = result;
    }
  }

  addWhiteMoves(row: number, col: number, piece: number, fields: number[][], result: Array<Move>) {
    this.addCommonMoves(row, col, piece, fields, -1, result);
  }

  addBlackMoves(row: number, col: number, piece: number, fields: number[][], result: Array<Move>) {
    this.addCommonMoves(row, col, piece, fields, 1, result);
  }

  addCommonMoves(row: number, col: number, piece: number, fields: number[][], pawnMoveDirection: number, result: Array<Move>) {
    if (piece == -1 || piece == 1)
      this.addCommonMovesForAPawn(row, col, fields, pawnMoveDirection, result);
    else if (piece == -2 || piece == 2)
      this.addCommonMovesForARook(row, col, fields, result);
    else if (piece == -3 || piece == 3)
      this.addCommonMovesForAKnight(row, col, fields, result);
    else if (piece == -4 || piece == 4)
      this.addCommonMovesForABishop(row, col, fields, result);
    else if (piece == -5 || piece == 5)
      this.addCommonMovesForAQueen(row, col, fields, result);
    else if (piece == -6 || piece == 6)
      this.addCommonMovesForAKing(row, col, fields, result);
  }

  addCommonMovesForAPawn(row: number, col: number, fields: number[][], pawnMoveDirection: number, result: Array<Move>) {

  }
  addCommonMovesForAKnight(row: number, col: number, fields: number[][], result: Array<Move>) {

  }
  addCommonMovesForABishop(row: number, col: number, fields: number[][], result: Array<Move>) {

  }
  addCommonMovesForARook(row: number, col: number, fields: number[][], result: Array<Move>) {

  }
  addCommonMovesForAQueen(row: number, col: number, fields: number[][], result: Array<Move>) {

  }
  addCommonMovesForAKing(row: number, col: number, fields: number[][], result: Array<Move>) {

  }
}
