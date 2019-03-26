import { Component } from '@angular/core';
import { ChessEngineAPI } from '../engine/chessboardUI';

@Component({
  selector: 'settings',
  templateUrl: './SettingsComponent.html'
})
export class SettingsComponent {
  constructor(private chessboard: ChessEngineAPI.ChessboardUI) {}

  public onSubmit() {
    alert('Hello ' + this.chessboard.breadth + ' / ' + this.chessboard.lookahead);
  }
}
