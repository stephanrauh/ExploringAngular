import {Component} from '@angular/core';
import {ChessEngineAPI} from '../engine/chessboardUI';
import {Move} from '../engine/move';

@Component({
    selector: 'history',
    templateUrl: './HistoryComponent.html'
})
export class HistoryComponent {
    constructor(private chessboard: ChessEngineAPI.ChessboardUI) { }

    public moveHistory(): Array<string> {
        var result: Array<string> =
            this.chessboard.moveHistory.map((m: Move, index:number) => ((index%2==0?((1+index/2)+". "):"") + m.toString()))
        return result;
    }
}
