import {Component, View, NgFor, bootstrap, Query, QueryList} from 'angular2/angular2';
import {FieldComponent} from './fieldcomponent';
import {ChessEngineAPI} from './engine/chessboardUI';

@Component({
    selector: 'chessboard'
    , viewBindings: [FieldComponent]
})
@View({
    directives: [NgFor, FieldComponent],
    templateUrl: 'ChessboardComponent.html'
})
export class ChessBoardComponent {
    get board(): ChessEngineAPI.ChessboardUI { return this.chessboard }

    get fields() { return this.board.fields }

    constructor(private chessboard:ChessEngineAPI.ChessboardUI) {}
}
