export class Move {
    constructor(public fromRow: number, public fromCol: number, public toRow: number, public toCol: number,
        public promotion: number, public capture: number) { }

    toString(): string {
        var colNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
        var result = colNames[this.fromCol];
        result += this.fromRow;
        if (0 == this.capture)
            result += "-"
        else
            result += "x";
        result += colNames[this.toCol];
        result += this.toRow;
        return result;
    }
}
