define(["require", "exports"], function (require, exports) {
    var Suggestor = (function () {
        function Suggestor(chessboard) {
            this.chessboard = chessboard;
        }
        Suggestor.prototype.suggestMove = function () {
            return null;
        };
        return Suggestor;
    })();
    exports.Suggestor = Suggestor;
});
//# sourceMappingURL=suggestor.js.map