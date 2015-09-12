define(["require", "exports"], function (require, exports) {
    var PieceModule;
    (function (PieceModule) {
        (function (Piece) {
            Piece[Piece["BLACK_KING"] = -6] = "BLACK_KING";
            Piece[Piece["BLACK_QUEEN"] = -5] = "BLACK_QUEEN";
            Piece[Piece["BLACK_BISHOP"] = -4] = "BLACK_BISHOP";
            Piece[Piece["BLACK_KNIGHT"] = -3] = "BLACK_KNIGHT";
            Piece[Piece["BLACK_ROOK"] = -2] = "BLACK_ROOK";
            Piece[Piece["BLACK_PAWN"] = -1] = "BLACK_PAWN";
            Piece[Piece["EMPTY"] = 0] = "EMPTY";
            Piece[Piece["WHITE_PAWN"] = 1] = "WHITE_PAWN";
            Piece[Piece["WHITE_ROOK"] = 2] = "WHITE_ROOK";
            Piece[Piece["WHITE_KNIGHT"] = 3] = "WHITE_KNIGHT";
            Piece[Piece["WHITE_BISHOP"] = 4] = "WHITE_BISHOP";
            Piece[Piece["WHITE_QUEEN"] = 5] = "WHITE_QUEEN";
            Piece[Piece["WHITE_KING"] = 6] = "WHITE_KING";
        })(PieceModule.Piece || (PieceModule.Piece = {}));
        var Piece = PieceModule.Piece;
        var PieceUtils = (function () {
            function PieceUtils() {
            }
            PieceUtils.fileName = function (piece) {
                if (0 == piece)
                    return "wikimediaimages/empty.png";
                var prefix = piece < 0 ? "b_" : "w_";
                if (piece < 0)
                    piece = -piece;
                var pieceName;
                switch (piece) {
                    case 1:
                        pieceName = "pawn";
                        break;
                    case 2:
                        pieceName = "rook";
                        break;
                    case 3:
                        pieceName = "knight";
                        break;
                    case 4:
                        pieceName = "bishop";
                        break;
                    case 5:
                        pieceName = "queen";
                        break;
                    case 6:
                        pieceName = "king";
                        break;
                }
                return "wikimediaimages/" + prefix + pieceName + ".png";
            };
            PieceUtils.materialValue = function (piece) {
                if (piece < 0)
                    piece = -piece;
                if (piece == Piece.WHITE_PAWN)
                    return 1000;
                if (piece == Piece.WHITE_ROOK)
                    return 5000;
                if (piece == Piece.WHITE_KNIGHT)
                    return 3000;
                if (piece == Piece.WHITE_BISHOP)
                    return 3000;
                if (piece == Piece.WHITE_QUEEN)
                    return 10000;
                if (piece == Piece.WHITE_KING)
                    return 1000000;
                return 0;
            };
            return PieceUtils;
        })();
        PieceModule.PieceUtils = PieceUtils;
    })(PieceModule = exports.PieceModule || (exports.PieceModule = {}));
});
//# sourceMappingURL=pieces.js.map