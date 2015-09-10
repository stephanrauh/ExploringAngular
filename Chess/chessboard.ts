/// <reference path="../typings/angular2/angular2.d.ts" />
/// <reference path="field.ts" />
import {Component, View, NgFor, bootstrap} from 'angular2/angular2';

export module ChessUI {
  // Annotation section
  @Component({
    selector: 'chessboard'
  })
  @View({
    directives: [NgFor],
    template: '<div *ng-for="#row of fields; var rowindex=index" style="width: 630px; height: 68px; overflow: hidden;" >\
                    <div *ng-for="#col of row; var colindex=index" style="position: relative; left: 0; top: 0; width: 68px; height: 68px; margin-right:-4px; display: inline-block" >\
                         <div style="position: relative; top: 0; left: 0;"><img style="width:70px;height:70px" src="{{backgroundFileName(rowindex,colindex)}}" /></div>\
                         <div style="position: absolute; top: 0px; left: 0px;"><img style="width:70px;height:70px" src="{{fileName(col)}}" /></div>\
                    </div>\
               </div>'
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
