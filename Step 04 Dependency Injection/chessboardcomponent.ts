/// <reference path="typings/angular2/angular2.d.ts" />
import {Component, View, NgFor, bootstrap, Query, QueryList} from 'angular2/angular2';
import {FieldComponent} from './fieldcomponent';
import {Engine} from './engine/chessboard';

@Component({
    selector: 'chessboard'
    , viewBindings: [FieldComponent]
})
@View({
    directives: [NgFor, FieldComponent],
    templateUrl: 'ChessboardComponent.html'
})
export class ChessBoardComponent {
    get board(): Engine.ChessboardUI { return this.chessboard }

    get fields() { return this.board.fields }

    constructor(private chessboard:Engine.ChessboardUI) {}
}
