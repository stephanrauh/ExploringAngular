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
    public static singleton: ChessBoardComponent;

    board_: Engine.Chessboard = new Engine.Chessboard()

    get board(): Engine.Chessboard { return this.board_ }

    get fields() { return this.board.fields }

    selectedPieceRow: number;
    selectedPieceCol: number;
    isPieceSelected: boolean = false;

    onclick(row: number, col: number): void {
        if (!this.isPieceSelected)
            this.setSelectedPiece(row, col);
        else {
            this.isPieceSelected = false;
            if (this.board.isLegalMove(this.selectedPieceRow, this.selectedPieceCol, row, col)) {
                this.board.move(this.selectedPieceRow, this.selectedPieceCol, row, col);
            }
        }
    }

    setSelectedPiece(row: number, col: number): void {
        this.isPieceSelected = true
        this.selectedPieceRow = row
        this.selectedPieceCol = col
    }

    isLegalMove(toRow: number, toCol: number): boolean {
        if (!this.isPieceSelected)
            return false;
        return this.board.isLegalMove(this.selectedPieceRow, this.selectedPieceCol, toRow, toCol)
    }

    constructor() {
        ChessBoardComponent.singleton = this;
    }
}
