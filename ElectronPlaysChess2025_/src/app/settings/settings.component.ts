import { Component } from '@angular/core';
import { ChessboardUI } from '../engine/chessboardUI';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  constructor(private chessboard: ChessboardUI) {}

  public onSubmit() {
    alert('Hello ' + this.chessboard.breadth + ' / ' + this.chessboard.lookahead);
  }
}
