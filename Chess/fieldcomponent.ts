/// <reference path="typings/angular2/angular2.d.ts" />
import {Component, Inject, View, NgFor, bootstrap} from 'angular2/angular2';
import {ChessBoardComponent} from './chessboardcomponent';
import {Engine} from "./engine/chessboard";

@Component({
    selector: 'field',
    properties: ['piece', 'row: row', 'col']
})
@View({
    directives: [NgFor],
    templateUrl: 'FieldComponent.html'
})
export class FieldComponent {
    constructor(private chessboard:Engine.ChessboardUI) {}

    private row: number;
    private piece: number;
    private col: number;

    private backgroundFileName(rowindex:number, colindex: number): String {
        if ((rowindex + colindex) % 2 == 1)
            return "wikimediaimages/b_empty.png"
        else
            return "wikimediaimages/w_empty.png"
    }

    private borderClass(row:number, col: number): String {
      if (this.chessboard.isPieceSelected)
         if (row==this.chessboard.selectedPieceRow)
          if (col==this.chessboard.selectedPieceCol)
             return "selectedField"
      return "field"
    }

    private fileName(piece: number) {
        if (0 == piece) return "wikimediaimages/empty.png";
        var prefix = piece < 0 ? "b_" : "w_";
        if (piece < 0) piece = -piece;
        var pieceName: String;
        switch (piece) {
            case 1: pieceName = "pawn"; break;
            case 2: pieceName = "rook"; break;
            case 3: pieceName = "knight"; break;
            case 4: pieceName = "bishop"; break;
            case 5: pieceName = "queen"; break;
            case 6: pieceName = "king"; break;
        }
        return "wikimediaimages/" + prefix + pieceName + ".png";
    }

    private ondragstart(row:number, col:number) {
      this.chessboard.setSelectedPiece(row, col);
    }

    private ondragover(row:number, col:number) {
      if (this.chessboard.isLegalMove2(row, col))
        event.preventDefault();
    }

    private ondragdrop(row:number, col:number) {
      this.chessboard.onclick(row, col);
    }

    private onclick(row:number, col:number) {
      this.chessboard.onclick(row, col);
    }
}
