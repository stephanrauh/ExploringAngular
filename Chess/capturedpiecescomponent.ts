/// <reference path="typings/angular2/angular2.d.ts" />
import {Component, View, NgFor, bootstrap, Query, QueryList} from 'angular2/angular2';
import {ChessEngineAPI} from './engine/chessboardUI';
import {PieceModule} from './engine/pieces'

@Component({
    selector: 'captured-pieces'
})
@View({
    directives: [NgFor],
    templateUrl: 'CapturedPiecesComponent.html'
})
export class CapturedPiecesComponent {

    constructor(private chessboard:ChessEngineAPI.ChessboardUI) {}

    capturedPiecesFilenames(): Array<string> {
      var sorted: Array<number>  = this.chessboard.capturedPieces.sort((n1,n2)=> this.isBefore(n1, n2))
      var filenames:Array<string>  = sorted.map((piece) => PieceModule.PieceUtils.fileName(piece))
      return filenames;
    }

    isBefore(piece1: number, piece2: number) {
      var materialValue1: number = PieceModule.PieceUtils.materialValue(piece1)
      var materialValue2: number = PieceModule.PieceUtils.materialValue(piece2)
      if (materialValue1==materialValue2) return piece2-piece1
      return materialValue2-materialValue1
    }
}
