define(["require", "exports"], function (require, exports) {
    var Engine;
    (function (Engine) {
        var ChessBoard = (function () {
            function ChessBoard() {
                this.fields = [
                    [-2, -3, -4, -5, -6, -4, -3, -2],
                    [-1, -1, -1, -1, -1, -1, -1, -1],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [2, 3, 4, 5, 6, 4, 3, 2]
                ];
            }
            ChessBoard.prototype.isLegalMove = function (fromRow, fromCol, toRow, toCol) {
                var piece = this.fields[fromRow][fromCol];
                var targetPiece = this.fields[toRow][toCol];
                if (targetPiece > 0 && piece > 0)
                    return false;
                if (targetPiece < 0 && piece < 0)
                    return false;
                return true;
            };
            return ChessBoard;
        })();
        Engine.ChessBoard = ChessBoard;
    })(Engine = exports.Engine || (exports.Engine = {}));
});
//# sourceMappingURL=chessboard.js.map