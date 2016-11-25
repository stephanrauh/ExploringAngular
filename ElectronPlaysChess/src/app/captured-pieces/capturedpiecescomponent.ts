import {Component, Query, QueryList} from '@angular/core';
import {ChessEngineAPI} from '../engine/chessboardUI';
import {Piece, PieceUtils} from '../engine/pieces'

@Component({
    selector: 'captured-pieces',
    templateUrl: './CapturedPiecesComponent.html'
})
export class CapturedPiecesComponent {

    constructor(private chessboard:ChessEngineAPI.ChessboardUI) {}

    capturedPiecesFilenames(): Array<string> {
      var sorted: Array<number>  = this.chessboard.capturedPieces.sort((n1,n2)=> this.isBefore(n1, n2))
      var filenames:Array<string>  = sorted.map((piece) => PieceUtils.fileName(piece))
      return filenames;
    }

    isBefore(piece1: number, piece2: number) {
      var materialValue1: number = PieceUtils.materialValue(piece1)
      var materialValue2: number = PieceUtils.materialValue(piece2)
      if (materialValue1==materialValue2) return piece2-piece1
      return materialValue2-materialValue1
    }
}
