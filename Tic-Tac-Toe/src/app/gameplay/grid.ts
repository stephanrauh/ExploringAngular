export enum Cell {EMPTY, X, O}

export class Row {
  public cell: Cell[] = [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY];
}

export class Grid {
  public row: Row[] = [new Row(), new Row(), new Row()];

  public  reset(): void {
    this.row = [new Row(), new Row(), new Row()];
  }
}
