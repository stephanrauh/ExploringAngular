import {Component} from '@angular/core';
import {ChessBoardComponent} from '../chessboard/chessboardcomponent';
import {ChessEngineAPI} from "../engine/chessboardUI";
import {Piece, PieceUtils} from '../engine/pieces'
import {Input} from "@angular/core";

@Component({
    selector: 'field',
    templateUrl: './FieldComponent.html',
    inputs: ['row', 'col', 'piece'],
    outputs: ['row', 'col', 'piece']
})
export class FieldComponent {
    private _row: number;
    public piece: number;
    public _col: number;

    public set row(index: number) {
        this._row = index;
        console.log("SetRow(" + index + ")")
    }

    public set col(index: number) {
        this._col = index;
        console.log("SetCol(" + index + ")")
    }

    public get col() {
        return this._col;
    }
    public get row() {
        return this._row;
    }

    constructor(private chessboard: ChessEngineAPI.ChessboardUI) {
    }


    private backgroundFileName(rowindex: number, colindex: number): String {
        if ((rowindex + colindex) % 2 == 1)
            return "assets/wikimediaimages/b_empty.png"
        else
            return "assets/wikimediaimages/w_empty.png"
    }

    private borderClass(row: number, col: number): String {
        var piece = this.chessboard.fields[row][col];
        var isOwnPiece = false;
        if (this.chessboard.isWhitePlaying && piece > 0)
            isOwnPiece = true;
        if ((!this.chessboard.isWhitePlaying) && piece < 0)
            isOwnPiece = true;
        if (this.chessboard.isPieceSelected) {
            if (row == this.chessboard.selectedPieceRow)
                if (col == this.chessboard.selectedPieceCol)
                    return "selectedField"
            if (this.chessboard.isLegalMove2(row, col))
                return "fieldInReach"
        }
        if (isOwnPiece)
            if (this.opponentThreats(row, col) > 0)
                return "threatenedField"
        return "field"
    }

    private ownThreats(row: number, col: number): number {
        return this.chessboard.ownThreats(row, col);
    }

    private opponentThreats(row: number, col: number): number {
        return this.chessboard.opponentThreats(row, col);
    }

    private fileName(piece: number) {
        return PieceUtils.fileName(piece);
    }

    private ondragstart(row: number, col: number) {
        this.chessboard.setSelectedPiece(row, col);
    }

    private ondragover(row: number, col: number) {
        if (this.chessboard.isLegalMove2(row, col))
            event.preventDefault();
    }

    private ondragdrop(row: number, col: number) {
        this.chessboard.onclick(row, col);
    }

    private onclick(row: number, col: number) {
        this.chessboard.onclick(row, col);
    }
}
