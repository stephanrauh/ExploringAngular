export class Move {
  constructor(public fromRow:number, public fromCol:number, public toRow:number, public toCol:number,
              public promotion:number, public capture: number){}
}
