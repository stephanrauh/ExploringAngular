/// <reference path="typings/angular2/angular2.d.ts" />
/// <reference path="chessboard.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';
import {ChessBoardComponent} from "./chessboardcomponent";
import {CapturedPiecesComponent} from './capturedpiecescomponent';
import {Engine} from "./engine/chessboard";
import {HistoryComponent} from './historycomponent';

// Annotation section
@Component({
    selector: 'application',
    bindings: [Engine.ChessboardUI]
})
@View({
    templateUrl: 'ApplicationComponent.html',
    directives: [ChessBoardComponent, HistoryComponent, CapturedPiecesComponent]
})
// Component controller
class ApplicationComponent {
  constructor(private chessboard:Engine.ChessboardUI) {}

  public get title(): String { return this.chessboard.isWhitePlaying?"White move":"Black move"}
}

bootstrap(ApplicationComponent);
