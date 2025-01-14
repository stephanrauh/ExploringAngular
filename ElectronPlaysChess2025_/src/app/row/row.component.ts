import { Component, Input } from '@angular/core';
import { ChessboardUI } from '../engine/chessboardUI';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html'
})
export class RowComponent {
  @Input()
  public row: number;

  constructor(public chessboard: ChessboardUI) {}
}
