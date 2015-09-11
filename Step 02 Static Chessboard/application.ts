/// <reference path="typings/angular2/angular2.d.ts" />
/// <reference path="chessboard.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';
import {ChessUI} from "./chessboard";


// Annotation section
@Component({
  selector: 'application'
})
@View({
  templateUrl: 'application.html',
  directives: [ChessUI.ChessBoardComponent]
})
// Component controller
class ApplicationComponent {
}

bootstrap(ApplicationComponent);
