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

    private submitted: boolean = false;

    public onSubmit() {
       this.submitted = true;
       alert('Hello ' + this.chessboard.breadth + ' / ' + this.chessboard.lookahead);
     }
}
