define(["require", "exports"], function (require, exports) {
    var Suggestor = (function () {
        function Suggestor(chessboard) {
            this.chessboard = chessboard;
        }
        Suggestor.prototype.suggestMove = function () {
            var moves = this.chessboard.moves.legalMoves;
            var sortedMoves = moves.sort(function (m1, m2) { return m2.value - m1.value; });
            console.log("Suggested moves:");
            sortedMoves.forEach(function (move) { return console.log(move.toString() + " " + move.value); });
            return sortedMoves[0];
        };
        return Suggestor;
    })();
    exports.Suggestor = Suggestor;
});
//# sourceMappingURL=suggestor.js.map