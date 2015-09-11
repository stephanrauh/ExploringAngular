export module Engine {
    export class ChessBoard {

        public fields: number[][] = [
            [-2, -3, -4, -5, -6, -4, -3, -2],
            [-1, -1, -1, -1, -1, -1, -1, -1],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [2, 3, 4, 5, 6, 4, 3, 2]
        ];

        isLegalMove(fromRow, fromCol, toRow, toCol: number): boolean {
            var piece: number = this.fields[fromRow][fromCol]
            var targetPiece: number = this.fields[toRow][toCol]
            if (targetPiece > 0 && piece > 0)
                return false;
            if (targetPiece < 0 && piece < 0)
                return false;
            return true;
        }
    }
}
