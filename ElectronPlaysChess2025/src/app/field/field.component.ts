import { Component, Input } from '@angular/core';
import { PieceUtils } from '../engine/pieces';
import { ChessboardUI } from '../engine/chessboardUI';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  standalone: false
})
export class FieldComponent {
  @Input()
  public row!: number;

  @Input()
  public piece!: number;

  @Input()
  public col!: number;

  constructor(private chessboard: ChessboardUI) {}

  public backgroundFileName(rowindex: number, colindex: number): string {
    if ((rowindex + colindex) % 2 === 1) return 'assets/wikimediaimages/b_empty.png';
    else return 'assets/wikimediaimages/w_empty.png';
  }

  public borderClass(row: number, col: number): string {
    const piece = this.chessboard.fields[row][col];
    let isOwnPiece = false;
    if (this.chessboard.isWhitePlaying && piece > 0) isOwnPiece = true;
    if (!this.chessboard.isWhitePlaying && piece < 0) isOwnPiece = true;
    if (this.chessboard.isPieceSelected) {
      if (row === this.chessboard.selectedPieceRow) if (col === this.chessboard.selectedPieceCol) return 'selectedField';
      if (this.chessboard.isLegalMove2(row, col)) return 'fieldInReach';
    }
    if (isOwnPiece) if (this.opponentThreats(row, col) > 0) return 'threatenedField';
    return 'field';
  }

  public ownThreats(row: number, col: number): number {
    return this.chessboard.ownThreats(row, col);
  }

  private opponentThreats(row: number, col: number): number {
    return this.chessboard.opponentThreats(row, col);
  }

  public fileName(piece: number) {
    return PieceUtils.fileName(piece);
  }

  public ondragstart(row: number, col: number) {
    this.chessboard.setSelectedPiece(row, col);
  }

  public ondragover(row: number, col: number) {
    if (this.chessboard.isLegalMove2(row, col)) event?.preventDefault();
  }

  public ondragdrop(row: number, col: number) {
    this.chessboard.onclick(row, col);
  }

  public onclick(row: number, col: number) {
    this.chessboard.onclick(row, col);
  }
}
