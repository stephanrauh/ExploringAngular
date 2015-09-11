/// <reference path="typings/angular2/angular2.d.ts" />
import {Component, Attribute, View, NgFor, bootstrap} from 'angular2/angular2';

// Annotation section
@Component({
  selector: 'field',
  properties: ['piece','row: row', 'col']
})
@View({
  directives: [NgFor],
  templateUrl: 'field.html'
})
export class FieldComponent {
      _row: string;
      set row(val:string) {this._row=val; }
      get row(): string   {return this._row;}
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
