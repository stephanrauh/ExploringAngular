import {Component} from "@angular/core";
import {ChessEngineAPI} from "../engine/chessboardUI";
import {Move} from "../engine/move";

@Component({
  moduleId: module.id,
  selector: 'chess-app',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.css']
})
// Component controller
export class ChessAppComponent {
  constructor(private chessboard: ChessEngineAPI.ChessboardUI) { }

  public suggestedMove: Move = null

  public get suggestedMoveText(): string {
    if (null == this.suggestedMove)
      return "";
    else
      return this.suggestedMove.toString()
  }

  public get title(): String {
    var result = this.chessboard.isWhitePlaying ? "White move " : "Black move "
    if (this.chessboard.checkMate)
      result += " Checkmate!";
    else if (this.chessboard.check)
      result += " Check!";
    else if (this.chessboard.ownCheckMate)
      result += " Player is checkmate!";
    else if (this.chessboard.ownCheck)
      result += " Player is in check!";
    return result
  }

  public suggestMove(): boolean {
    this.suggestedMove = this.chessboard.suggestMove();
    return false;
  }

  public turnSides(): boolean {
    this.suggestedMove = null
    var move = this.chessboard.suggestMove()
    if (move != null)
      this.chessboard.move(move)
    return false;
  }

  public revertLastMove(): boolean {
    this.suggestedMove = null
    this.chessboard.revertLastMove();
    return false;
  }
}
