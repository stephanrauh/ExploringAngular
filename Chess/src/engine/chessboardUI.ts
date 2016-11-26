import {Injectable} from '@angular/core';
import {Move} from './move';
import {Moves} from './moves';
import {Chessboard} from './chessboard';
import {Suggestor} from './suggestor';

export module ChessEngineAPI {
  @Injectable() export class ChessboardUI {
    selectedPieceRow: number;
    selectedPieceCol: number;
    isPieceSelected: boolean = false;
    lookahead: number = 3;
    breadth: number = 7;

    private chessboard: Chessboard = new Chessboard(new Array<Move>());

    get fields(): number[][] {
      return this.chessboard.fields;
    }

    get isWhitePlaying(): boolean { return this.chessboard.isWhitePlaying }

    get capturedPieces(): Array<number> { return this.chessboard.capturedPieces }

    get check(): boolean { return this.chessboard.check }
    get checkMate(): boolean { return this.chessboard.checkMate }
    get staleMate(): boolean { return this.chessboard.staleMate }
    get ownCheck(): boolean { return this.chessboard.ownCheck }
    get ownCheckMate(): boolean { return this.chessboard.ownCheckMate }

    public ownThreats(row: number, col: number): number {
      return this.chessboard.ownThreats(row, col);
    }

    public opponentThreats(row: number, col: number): number {
      return this.chessboard.opponentThreats(row, col);
    }

    public suggestMove(): Move {
      return new Suggestor(this.chessboard).suggestMove(this.lookahead, this.breadth);
    }


    get moveHistory(): Array<Move> { return this.chessboard.moveHistory }

    onclick(row: number, col: number): void {
      if (!this.isPieceSelected)
        this.setSelectedPiece(row, col);
      else {
        this.isPieceSelected = false;
        if (this.chessboard.isLegalMove(this.selectedPieceRow, this.selectedPieceCol, row, col)) {
          this.chessboard.move(this.selectedPieceRow, this.selectedPieceCol, row, col, this.isWhitePlaying ? 5 : -5);
          setTimeout(() => {
            var answer = new Suggestor(this.chessboard).suggestMove(this.lookahead, this.breadth)
            if (null != answer)
              this.move(answer)
          }, 10)
        }
      }
    }

    public move(mv: Move) {
      this.chessboard.move(mv.fromRow, mv.fromCol, mv.toRow, mv.toCol, mv.promotion)
    }

    setSelectedPiece(row: number, col: number): void {
      var piece = this.chessboard.fields[row][col];
      if (this.isWhitePlaying) {
        if (piece <= 0) return;
      } else {
        if (piece >= 0) return;
      }

      this.isPieceSelected = true
      this.selectedPieceRow = row
      this.selectedPieceCol = col
    }


    isLegalMove2(toRow: number, toCol: number): boolean {
      if (!this.isPieceSelected)
        return false;
      return this.chessboard.isLegalMove(this.selectedPieceRow, this.selectedPieceCol, toRow, toCol)
    }

    public revertLastMove(): void {
      this.chessboard.revertLastMove();
    }

  }
}
