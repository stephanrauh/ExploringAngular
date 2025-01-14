import { Component } from '@angular/core';
import { ChessboardUI } from '../engine/chessboardUI';
import { Move } from '../engine/move';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  standalone: false
})
export class HistoryComponent {
  constructor(private chessboard: ChessboardUI) {}

  public moveHistory(): Array<string> {
    const result: Array<string> = this.chessboard.moveHistory.map(
      (m: Move, index: number) => (index % 2 === 0 ? 1 + index / 2 + '. ' : '') + m.toString()
    );
    return result;
  }
}
