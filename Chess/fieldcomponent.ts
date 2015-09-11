/// <reference path="typings/angular2/angular2.d.ts" />
import {Component, Inject, View, NgFor, bootstrap} from 'angular2/angular2';
import {ChessBoardComponent} from './chessboardcomponent';

// Annotation section
@Component({
    selector: 'field',
    properties: ['piece', 'row: row', 'col']

})
@View({
    directives: [NgFor],
    templateUrl: 'FieldComponent.html'
})
@Inject(ChessBoardComponent)
export class FieldComponent {
//    constructor(private chessboardComponent: ChessBoardComponent) {
//      console.log(chessboardComponent);
//    }

    _row: string;
    set row(val: string) { this._row = val; }
    get row(): string { return this._row; }
    piece: string;
    col: string;

    private backgroundFileName(rowindex:number, colindex: number): String {
        if ((rowindex + colindex) % 2 == 1)
            return "wikimediaimages/b_empty.png"
        else
            return "wikimediaimages/w_empty.png"
    }

    private borderClass(row:number, col: number): String {
      if (ChessBoardComponent.singleton.isPieceSelected)
         if (row==ChessBoardComponent.singleton.selectedPieceRow)
          if (col==ChessBoardComponent.singleton.selectedPieceCol)
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
      ChessBoardComponent.singleton.setSelectedPiece(row, col);
    }

    private ondragover(row:number, col:number) {
      if (ChessBoardComponent.singleton.isLegalMove(row, col))
        event.preventDefault();
    }

    private ondragdrop(row:number, col:number) {
      ChessBoardComponent.singleton.onclick(row, col);
    }

    private onclick(row:number, col:number) {
      ChessBoardComponent.singleton.onclick(row, col);
    }

}
