define(["require", "exports"], function (require, exports) {
    var Engine;
    (function (Engine) {
        var Chessboard = (function () {
            function Chessboard() {
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
            Chessboard.prototype.isLegalMove = function (fromRow, fromCol, toRow, toCol) {
                var piece = this.fields[fromRow][fromCol];
                var targetPiece = this.fields[toRow][toCol];
                if (targetPiece > 0 && piece > 0)
                    return false;
                if (targetPiece < 0 && piece < 0)
                    return false;
                return true;
            };
            Chessboard.prototype.move = function (fromRow, fromCol, toRow, toCol) {
                var piece = this.fields[fromRow][fromCol];
                var targetPiece = this.fields[toRow][toCol];
                this.fields[fromRow][fromCol] = 0;
                this.fields[toRow][toCol] = piece;
            };
            return Chessboard;
        })();
        Engine.Chessboard = Chessboard;
    })(Engine = exports.Engine || (exports.Engine = {}));
});
//# sourceMappingURL=chessboard.js.map