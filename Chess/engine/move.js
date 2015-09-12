define(["require", "exports"], function (require, exports) {
    var Move = (function () {
        function Move(fromRow, fromCol, toRow, toCol, promotion, capture, chess) {
            if (chess === void 0) { chess = false; }
            this.fromRow = fromRow;
            this.fromCol = fromCol;
            this.toRow = toRow;
            this.toCol = toCol;
            this.promotion = promotion;
            this.capture = capture;
            this.chess = chess;
        }
        Move.prototype.toString = function () {
            var colNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
            var result = colNames[this.fromCol];
            result += this.fromRow;
            if (0 == this.capture)
                result += "-";
            else
                result += "x";
            result += colNames[this.toCol];
            result += this.toRow;
            if (this.chess)
                result += "+";
            return result;
        };
        return Move;
    })();
    exports.Move = Move;
});
//# sourceMappingURL=move.js.map