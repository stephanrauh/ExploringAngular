/// <reference path="typings/angular2/angular2.d.ts" />
import {Component, View, NgFor, bootstrap, Query, QueryList} from 'angular2/angular2';
import {Engine} from './engine/chessboard';

@Component({
    selector: 'history'
})
@View({
    directives: [NgFor],
    templateUrl: 'HistoryComponent.html'
})
export class HistoryComponent {
    constructor(private chessboard:Engine.ChessboardUI) {}
}
