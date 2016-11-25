import {Component} from '@angular/core';
import {ChessEngineAPI} from '../engine/chessboardUI';
import {Move} from '../engine/move';

@Component({
    selector: 'settings',
    templateUrl: './SettingsComponent.html'
})
export class SettingsComponent {
    constructor(private chessboard: ChessEngineAPI.ChessboardUI) { }

    private submitted: boolean = false;

    public onSubmit() {
       this.submitted = true;
       alert('Hello ' + this.chessboard.breadth + ' / ' + this.chessboard.lookahead);
     }
}
