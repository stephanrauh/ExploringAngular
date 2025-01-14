import { Component } from '@angular/core';
import { Move } from './engine/move';
import { ChessboardUI } from './engine/chessboardUI';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false
})
export class AppComponent {
  constructor(private chessboard: ChessboardUI) {}

  public suggestedMove: Move | null = null;

  public get suggestedMoveText(): string {
    if (null === this.suggestedMove) return '';
    else return this.suggestedMove.toString();
  }

  public get title(): string {
    let result = this.chessboard.isWhitePlaying ? 'White move ' : 'Black move ';
    if (this.chessboard.checkMate) result += ' Checkmate!';
    else if (this.chessboard.check) result += ' Check!';
    else if (this.chessboard.ownCheckMate) result += ' Player is checkmate!';
    else if (this.chessboard.ownCheck) result += ' Player is in check!';
    return result;
  }

  public suggestMove(): boolean {
    this.suggestedMove = this.chessboard.suggestMove();
    return false;
  }

  public turnSides(): boolean {
    this.suggestedMove = null;
    const move = this.chessboard.suggestMove();
    if (move !== null) this.chessboard.move(move);
    return false;
  }

  public revertLastMove(): boolean {
    this.suggestedMove = null;
    this.chessboard.revertLastMove();
    return false;
  }
}
