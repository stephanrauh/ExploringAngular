/// <reference path="typings/angular2/angular2.d.ts" />
/// <reference path="chessboard.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';
import {ChessBoardComponent} from "./chessboardcomponent";
import {Engine} from "./engine/chessboard";

// Annotation section
@Component({
    selector: 'application',
    bindings: [Engine.ChessboardUI]
})
@View({
    templateUrl: 'ApplicationComponent.html',
    directives: [ChessBoardComponent]
})
// Component controller
class ApplicationComponent {
}

bootstrap(ApplicationComponent);
