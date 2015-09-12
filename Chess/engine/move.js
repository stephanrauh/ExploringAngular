define(["require", "exports"], function (require, exports) {
    var Move = (function () {
        function Move(fromRow, fromCol, toRow, toCol, promotion, capture) {
            this.fromRow = fromRow;
            this.fromCol = fromCol;
            this.toRow = toRow;
            this.toCol = toCol;
            this.promotion = promotion;
            this.capture = capture;
        }
        return Move;
    })();
    exports.Move = Move;
});
//# sourceMappingURL=move.js.map