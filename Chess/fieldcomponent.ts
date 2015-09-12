/// <reference path="typings/angular2/angular2.d.ts" />
import {Component, Inject, View, NgFor, bootstrap} from 'angular2/angular2';
import {ChessBoardComponent} from './chessboardcomponent';
import {ChessEngineAPI} from "./engine/chessboardUI";
import {PieceModule} from './engine/pieces'

@Component({
    selector: 'field',
    properties: ['piece', 'row: row', 'col']
})
@View({
    directives: [NgFor],
    templateUrl: 'FieldComponent.html'
})
export class FieldComponent {
    constructor(private chessboard:ChessEngineAPI.ChessboardUI) {}

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
      {
         if (row==this.chessboard.selectedPieceRow)
          if (col==this.chessboard.selectedPieceCol)
             return "selectedField"
        if (this.chessboard.isLegalMove2(row, col))
          return "fieldInReach"
      }
      return "field"
    }

    private ownThreats(row:number, col:number): number {
      return this.chessboard.ownThreats(row, col);
    }

    private opponentThreats(row:number, col:number): number {
      return this.chessboard.opponentThreats(row, col);
    }

    private fileName(piece: number) {
      return PieceModule.PieceUtils.fileName(piece);
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
