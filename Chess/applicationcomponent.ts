/// <reference path="typings/angular2/angular2.d.ts" />
/// <reference path="chessboard.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';
import {ChessBoardComponent} from "./chessboardcomponent";
import {CapturedPiecesComponent} from './capturedpiecescomponent';
import {ChessEngineAPI} from "./engine/chessboardUI";
import {HistoryComponent} from './historycomponent';

// Annotation section
@Component({
    selector: 'application',
    bindings: [ChessEngineAPI.ChessboardUI]
})
@View({
    templateUrl: 'ApplicationComponent.html',
    directives: [ChessBoardComponent, HistoryComponent, CapturedPiecesComponent]
})
// Component controller
class ApplicationComponent {
  constructor(private chessboard:ChessEngineAPI.ChessboardUI) {}

  public get title(): String {
    var result = this.chessboard.isWhitePlaying?"White move ":"Black move "
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
    alert("Suggest move hasn't been implemented yet");
    return false;
  }

  public turnSides(): boolean {
    alert("Turn sides hasn't been implemented yet");
    return false;
  }

  public revertLastMove(): boolean {
    this.chessboard.revertLastMove();
    return false;
  }
}

bootstrap(ApplicationComponent);
