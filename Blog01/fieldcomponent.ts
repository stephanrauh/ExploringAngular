import {Component, Inject, View, NgFor, bootstrap} from 'angular2/angular2';
import {ChessBoardComponent} from './chessboardcomponent';
import {ChessEngineAPI} from "./engine/chessboardui";
import {Piece, PieceUtils} from './engine/pieces'

@Component({
    selector: 'field',
    properties: ['piece', 'row: row', 'col']
})
@View({
    directives: [NgFor],
    templateUrl: 'FieldComponent.html'
})
export class FieldComponent {
    constructor(private chessboard: ChessEngineAPI.ChessboardUI) { }

    private row: number;
    private piece: number;
    private col: number;

    private backgroundFileName(rowindex: number, colindex: number): String {
        if ((rowindex + colindex) % 2 == 1)
            return "wikimediaimages/b_empty.png"
        else
            return "wikimediaimages/w_empty.png"
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
