/// <reference path="typings/angular2/angular2.d.ts" />
/// <reference path="field.ts" />
import {Component, View, NgFor, bootstrap} from 'angular2/angular2';
import {FieldComponent} from './field';

export module ChessUI {
  // Annotation section
  @Component({
    selector: 'chessboard'
  })
  @View({
    directives: [NgFor, FieldComponent],
    templateUrl: 'chessboard.html'
  })
  // Component controller
  export class ChessBoardComponent {

    private fields: number[][] = [
      [-2,-3,-4,-5,-6,-4,-3,-2],
      [-1,-1,-1,-1,-1,-1,-1,-1],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1,1],
      [2,3,4,5,6,4,3,2]
      ];

     public lastBackGround = true;

      private backgroundFileName(rowindex, colindex:number):String {
        if ((rowindex+colindex)%2==1)
           return "wikimediaimages/b_empty.png"
        else
           return "wikimediaimages/w_empty.png"
      }

      private fileName(piece: number) {
        if (0 == piece) return "wikimediaimages/empty.png";
        var prefix = piece<0? "b_":"w_";
        if (piece<0) piece=-piece;
        var pieceName: String;
        switch(piece) {
          case 1: pieceName = "pawn"; break;
          case 2: pieceName = "rook"; break;
          case 3: pieceName = "knight"; break;
          case 4: pieceName = "bishop"; break;
          case 5: pieceName = "queen"; break;
          case 6: pieceName = "king"; break;

        }
        return "wikimediaimages/" + prefix + pieceName + ".png";
      }

    constructor() {
    }
  }
}
