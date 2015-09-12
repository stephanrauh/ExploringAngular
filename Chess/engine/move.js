define(["require", "exports"], function (require, exports) {
    var Move = (function () {
        function Move(fromRow, fromCol, toRow, toCol, promotion, capture, check, checkMate, staleMate) {
            if (check === void 0) { check = false; }
            if (checkMate === void 0) { checkMate = false; }
            if (staleMate === void 0) { staleMate = false; }
            this.fromRow = fromRow;
            this.fromCol = fromCol;
            this.toRow = toRow;
            this.toCol = toCol;
            this.promotion = promotion;
            this.capture = capture;
            this.check = check;
            this.checkMate = checkMate;
            this.staleMate = staleMate;
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
            if (this.checkMate)
                result += "++";
            else if (this.check)
                result += "+";
            else if (this.staleMate)
                result += "stalemate";
            return result;
        };
        return Move;
    })();
    exports.Move = Move;
});
//# sourceMappingURL=move.js.map