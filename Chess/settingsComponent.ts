import {Component, View, FORM_DIRECTIVES} from 'angular2/angular2';
import {ChessEngineAPI} from './engine/chessboardUI';
import {Move} from './engine/move';

@Component({
    selector: 'settings'
})
@View({
    directives: [FORM_DIRECTIVES],
    templateUrl: 'SettingsComponent.html'
})
export class SettingsComponent {
    constructor(private chessboard: ChessEngineAPI.ChessboardUI) { }

    public moveHistory(): Array<string> {
        var result: Array<string> =
            this.chessboard.moveHistory.map((m: Move, index:number) => ((index%2==0?((1+index/2)+". "):"") + m.toString()))
        return result;
    }
}
