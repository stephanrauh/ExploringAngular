import {Component} from '@angular/core';
import {FieldComponent} from '../field/fieldcomponent';
import {ChessEngineAPI} from '../engine/chessboardUI';

@Component({
    selector: 'chessboard',
    templateUrl: './ChessboardComponent.html'
})
export class ChessBoardComponent {
    get board(): ChessEngineAPI.ChessboardUI { return this.chessboard }

    get fields() { return this.board.fields }

    constructor(private chessboard:ChessEngineAPI.ChessboardUI) {}
}
