/// <reference path="typings/angular2/angular2.d.ts" />
import {Component, View, NgFor, bootstrap, Query, QueryList} from 'angular2/angular2';
import {Engine} from './engine/chessboard';

@Component({
    selector: 'captured-pieces'
})
@View({
    directives: [NgFor],
    templateUrl: 'CapturedPiecesComponent.html'
})
export class CapturedPiecesComponent {
    constructor(private chessboard:Engine.ChessboardUI) { console.log("Cap  ")}
}
