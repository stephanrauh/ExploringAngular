import { Component } from '@angular/core';
import { PieceUtils } from '../engine/pieces';
import { ChessboardUI } from '../engine/chessboardUI';

@Component({
  selector: 'app-captured-pieces',
  templateUrl: './captured-pieces.component.html',
  standalone: false
})
export class CapturedPiecesComponent {
  constructor(private chessboard: ChessboardUI) {}

  capturedPiecesFilenames(): Array<string> {
    const sorted = this.chessboard.capturedPieces.sort((n1, n2) => this.isBefore(n1, n2));
    const filenames = sorted.map(piece => PieceUtils.fileName(piece));
    return filenames;
  }

  isBefore(piece1: number, piece2: number) {
    const materialValue1: number = PieceUtils.materialValue(piece1);
    const materialValue2: number = PieceUtils.materialValue(piece2);
    if (materialValue1 === materialValue2) return piece2 - piece1;
    return materialValue2 - materialValue1;
  }
}
