

export enum Piece {
    BLACK_KING = -6,
    BLACK_QUEEN = -5,
    BLACK_BISHOP = -4,
    BLACK_KNIGHT = -3,
    BLACK_ROOK = -2,
    BLACK_PAWN = -1,
    EMPTY = 0,
    WHITE_PAWN = 1,
    WHITE_ROOK = 2,
    WHITE_KNIGHT = 3,
    WHITE_BISHOP = 4,
    WHITE_QUEEN = 5,
    WHITE_KING = 6
}

export class PieceUtils {
    public static fileName(piece: number): string {
        if (0 == piece) return "assets/wikimediaimages/empty.png";
        var prefix = piece < 0 ? "b_" : "w_";
        if (piece < 0) piece = -piece;
        var pieceName: String;
        switch (piece) {
            case 1: pieceName = "pawn"; break;
            case 2: pieceName = "rook"; break;
            case 3: pieceName = "knight"; break;
            case 4: pieceName = "bishop"; break;
            case 5: pieceName = "queen"; break;
            case 6: pieceName = "king"; break;
        }
        return "assets/wikimediaimages/" + prefix + pieceName + ".png";
    }

    public static materialValue(piece: number): number {
        if (piece < 0) piece = -piece;
        if (piece == Piece.WHITE_PAWN) return 1000
        if (piece == Piece.WHITE_ROOK) return 5000
        if (piece == Piece.WHITE_KNIGHT) return 3000
        if (piece == Piece.WHITE_BISHOP) return 3000
        if (piece == Piece.WHITE_QUEEN) return 10000
        if (piece == Piece.WHITE_KING) return 100000
        return 0;
    }
}
