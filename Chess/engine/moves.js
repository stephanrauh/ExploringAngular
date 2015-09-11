define(["require", "exports"], function (require, exports) {
    var Moves = (function () {
        function Moves(chessboard) {
            this.chessboard = chessboard;
            this._legalMoves = null;
        }
        Object.defineProperty(Moves.prototype, "legalMoves", {
            get: function () {
                this.calculateLegalMoves();
                return this._legalMoves;
            },
            enumerable: true,
            configurable: true
        });
        Moves.prototype.isLegalMove = function (fromRow, fromCol, toRow, toCol) {
            this.calculateLegalMoves();
            for (var move in this._legalMoves) {
                if (move.fromRow == fromRow && move.fromCol == fromCol && move.toRow == toRow && move.toCol == toCol)
                    return true;
            }
            return false;
        };
        Moves.prototype.calculateLegalMoves = function () {
            if (null == this._legalMoves) {
                var result = new Array();
                for (var row = 0; row < this.chessboard.fields.length; row++) {
                    var currentRow = this.chessboard.fields[row];
                    for (var col = 0; col < currentRow.length; col++) {
                        var piece = this.chessboard.fields[row][col];
                        if (this.chessboard.isWhitePlaying) {
                            if (piece > 0)
                                this.addWhiteMoves(row, col, piece, this.chessboard.fields, result);
                        }
                        else if (piece < 0)
                            this.addBlackMoves(row, col, piece, this.chessboard.fields, result);
                    }
                }
                this._legalMoves = result;
            }
        };
        Moves.prototype.addWhiteMoves = function (row, col, piece, fields, result) {
            this.addCommonMoves(row, col, piece, fields, -1, result);
        };
        Moves.prototype.addBlackMoves = function (row, col, piece, fields, result) {
            this.addCommonMoves(row, col, piece, fields, 1, result);
        };
        Moves.prototype.addCommonMoves = function (row, col, piece, fields, pawnMoveDirection, result) {
            if (piece == -1 || piece == 1)
                this.addCommonMovesForAPawn(row, col, fields, pawnMoveDirection, result);
            else if (piece == -2 || piece == 2)
                this.addCommonMovesForARook(row, col, fields, result);
            else if (piece == -3 || piece == 3)
                this.addCommonMovesForAKnight(row, col, fields, result);
            else if (piece == -4 || piece == 4)
                this.addCommonMovesForABishop(row, col, fields, result);
            else if (piece == -5 || piece == 5)
                this.addCommonMovesForAQueen(row, col, fields, result);
            else if (piece == -6 || piece == 6)
                this.addCommonMovesForAKing(row, col, fields, result);
        };
        Moves.prototype.addCommonMovesForAPawn = function (row, col, fields, pawnMoveDirection, result) {
        };
        Moves.prototype.addCommonMovesForAKnight = function (row, col, fields, result) {
        };
        Moves.prototype.addCommonMovesForABishop = function (row, col, fields, result) {
        };
        Moves.prototype.addCommonMovesForARook = function (row, col, fields, result) {
        };
        Moves.prototype.addCommonMovesForAQueen = function (row, col, fields, result) {
        };
        Moves.prototype.addCommonMovesForAKing = function (row, col, fields, result) {
        };
        return Moves;
    })();
    exports.Moves = Moves;
});
//# sourceMappingURL=moves.js.map