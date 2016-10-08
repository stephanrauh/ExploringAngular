import {Moves} from './moves'

export class Move {
    public value: number; // result of the evaluation of the position. Not part of the constructor because it is added later.
    public check: boolean = false;
    public checkMate: boolean = false;
    public staleMate: boolean = false;

    constructor(public fromRow: number, public fromCol: number, public toRow: number, public toCol: number,
        public promotion: number, public capture: number,
        public whiteKingHasMoved: boolean = false,
        public whiteLeftRookHasMoved: boolean = false,
        public whiteRightRookHasMoved: boolean = false,
        public blackKingHasMoved: boolean = false,
        public blackLeftRookHasMoved: boolean = false,
        public blackRightRookHasMoved: boolean = false,
        public enPassantCol = -1,
        public captureRow = -1,
        public secondColFrom = -1,
        public secondColTo = -1,
        public legalMoves: Moves = null) {

    }

    toString(): string {
        var colNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
        var result = colNames[this.fromCol];
        result += (8 - this.fromRow);
        if (0 == this.capture)
            result += "-"
        else
            result += "x";
        result += colNames[this.toCol];
        result += (8 - this.toRow);

        if (this.checkMate) result += "++"
        else if (this.check) result += "+"
        else if (this.staleMate) result += "stalemate"
        return result;
    }
}
