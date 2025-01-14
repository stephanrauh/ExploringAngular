import { Component } from '@angular/core';
import { ChessboardUI } from '../engine/chessboardUI';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html'
})
export class ChessBoardComponent {
  get board(): ChessboardUI {
    return this.chessboard;
  }

  get fields() {
    return this.board.fields;
  }

  constructor(private chessboard: ChessboardUI) {}
}
