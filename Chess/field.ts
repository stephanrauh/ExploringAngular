/// <reference path="../typings/angular2/angular2.d.ts" />
import {Component, Attribute, View, NgFor, bootstrap} from 'angular2/angular2';


// Annotation section
@Component({
  selector: 'field',
  properties: ['title: title','row: row']
})
@View({
  directives: [NgFor],
  template: '\
      <div style="position: relative; left: 0; top: 0; width: 68px; height: 68px; margin-right:-4px; display: inline-block" >\
           <div style="position: relative; top: 0; left: 0;">\
                <img style="width:70px;height:70px" src="{{backgroundFileName(row,col)}}" />\
           </div>\
           <div style="position: absolute; top: 0px; left: 0px;">\
                piece={{piece}}<img style="width:70px;height:70px" src="{{fileName(piece)}}" />\
            </div>\
     </div>'
})
// Component controller
export class FieldComponent {
      title: string = "Hallo Welt"
      _row: string;
      set row(val:string) {this._row=val; console.log("Setter!");}
      get row(): string { console.log(this.title); console.log("getter!"); return this._row;}
      piece: string;
      col: string;

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
}



// bootstrap(Chess.ChessBoardComponent);
