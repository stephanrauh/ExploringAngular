/// <reference path="typings/angular2/angular2.d.ts" />
import {Component, View, NgFor, bootstrap, Query, QueryList} from 'angular2/angular2';
import {ChessEngineAPI} from './engine/chessboardUI';
import {Move} from './engine/move';

@Component({
    selector: 'history'
})
@View({
    directives: [NgFor],
    templateUrl: 'HistoryComponent.html'
})
export class HistoryComponent {
    constructor(private chessboard: ChessEngineAPI.ChessboardUI) { }

    public moveHistory(): Array<string> {
        var result: Array<string> =
            this.chessboard.moveHistory.map((m: Move, index:number) => ((index%2==0?((1+index/2)+". "):"") + m.toString()))
        return result;
    }
}
