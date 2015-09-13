define(["require", "exports"], function (require, exports) {
    var Move = (function () {
        function Move(fromRow, fromCol, toRow, toCol, promotion, capture, whiteKingHasMoved, whiteLeftRookHasMoved, whiteRightRookHasMoved, blackKingHasMoved, blackLeftRookHasMoved, blackRightRookHasMoved, enPassantCol, captureRow, secondColFrom, secondColTo) {
            if (whiteKingHasMoved === void 0) { whiteKingHasMoved = false; }
            if (whiteLeftRookHasMoved === void 0) { whiteLeftRookHasMoved = false; }
            if (whiteRightRookHasMoved === void 0) { whiteRightRookHasMoved = false; }
            if (blackKingHasMoved === void 0) { blackKingHasMoved = false; }
            if (blackLeftRookHasMoved === void 0) { blackLeftRookHasMoved = false; }
            if (blackRightRookHasMoved === void 0) { blackRightRookHasMoved = false; }
            if (enPassantCol === void 0) { enPassantCol = -1; }
            if (captureRow === void 0) { captureRow = -1; }
            if (secondColFrom === void 0) { secondColFrom = -1; }
            if (secondColTo === void 0) { secondColTo = -1; }
            this.fromRow = fromRow;
            this.fromCol = fromCol;
            this.toRow = toRow;
            this.toCol = toCol;
            this.promotion = promotion;
            this.capture = capture;
            this.whiteKingHasMoved = whiteKingHasMoved;
            this.whiteLeftRookHasMoved = whiteLeftRookHasMoved;
            this.whiteRightRookHasMoved = whiteRightRookHasMoved;
            this.blackKingHasMoved = blackKingHasMoved;
            this.blackLeftRookHasMoved = blackLeftRookHasMoved;
            this.blackRightRookHasMoved = blackRightRookHasMoved;
            this.enPassantCol = enPassantCol;
            this.captureRow = captureRow;
            this.secondColFrom = secondColFrom;
            this.secondColTo = secondColTo;
            this.check = false;
            this.checkMate = false;
            this.staleMate = false;
        }
        Move.prototype.toString = function () {
            var colNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
            var result = colNames[this.fromCol];
            result += (8 - this.fromRow);
            if (0 == this.capture)
                result += "-";
            else
                result += "x";
            result += colNames[this.toCol];
            result += (8 - this.toRow);
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