import {Component, View, NgFor, bootstrap, Query, QueryList} from 'angular2/angular2';

@Component({
  selector: 'map'
})
@View({
  directives: [NgFor],
  templateUrl: 'mapcomponent.html'
})
export class MapComponent {
  private _size = 10

  private destinationX: number
  private destinationY: number


  public set size(newSize:number) {
    this._size=newSize
    this.fields = new Array<Array<number>>(this._size);
    for (var x=0; x < this._size; x++) {
      this.fields[x] = new Array<number>(this._size);
      for (var y=0; y < this._size; y++)
        this.fields[x][y] = Math.floor(Math.random()*1.5);
    }
    this.destinationX = Math.floor(newSize * Math.random())
    this.destinationY = Math.floor(newSize * Math.random())
    this.fields[this.destinationX][this.destinationY]=2;
  }

  public piex: number= 0
  public piey: number = 0
  public pieHidden = true;


  public fields: Array<Array<number>>;

  constructor() {
    this.size=20;
  }

  public backgroundcolor(piece: number): string {
    if (0 == piece)
      return "#0000000";
    else
      return "#FFFFFF"
  }

  public fieldVisible(x:number, y:number): boolean {
    return this.fields[x][y] > 0;
  }

  public fieldClass(x:number, y:number): string {
    if (this.fields[x][y] == 2)
      return "destination";
    else if (this.fields[x][y] > 0)
      return "circle";
    else
      return "";
  }

  public click(colindex:number, rowindex:number): void {
    this.piex = 32*colindex-92;
    this.piey = 26.5*rowindex-75;
    this.pieHidden=false;
  }

  public pieposition(): string {
    return "absolute";
  }

  public pierotation(): string {
    return "rotate(0deg)"
    }
}
