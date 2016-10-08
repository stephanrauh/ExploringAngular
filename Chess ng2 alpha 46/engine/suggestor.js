var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Suggestor = (function () {
    function Suggestor(chessboard) {
        this.chessboard = chessboard;
    }
    Suggestor.prototype.suggestMove = function (lookahead, breadth) {
        var PERFORMANCE_MEASURE_start = window.performance.now();
        var moves = this.chessboard.moves.legalMoves;
        try {
            this.findBestAnswerTo(lookahead, breadth);
            var sortedMoves = moves.sort(function (m1, m2) { return m2.value - m1.value; });
            //                console.log("Suggested moves:")
            //                sortedMoves.forEach(move => console.log(move.toString() + " " + move.value))
            var PERFORMANCE_MEASURE_stop = window.performance.now();
            var PERFORMANCE_MEASURE_SUM = PERFORMANCE_MEASURE_stop - PERFORMANCE_MEASURE_start;
            //        console.log("Total calculation took " + PERFORMANCE_MEASURE_SUM + " ms");
            //        Evaluator.showPerformanceStats()
            return sortedMoves[0];
        }
        catch (ex) {
            return null; // checkmate or stalemate
        }
    };
    Suggestor.prototype.findBestAnswerTo = function (level, breadth) {
        var moves = this.chessboard.moves.legalMoves;
        var sortedMoves = moves.sort(function (m1, m2) { return m2.value - m1.value; });
        if (this.chessboard.moves.ownCheckMate) {
            if (sortedMoves.length > 0) {
                console.log("no move should be available! white playing:" + this.chessboard.isWhitePlaying);
                sortedMoves.forEach(function (mv) { console.log(mv.toString()); });
                var histoire = "";
                this.chessboard.moveHistory.forEach(function (mv) { histoire += " " + mv.toString(); });
                console.log(histoire);
                this.chessboard.fields.forEach(function (row) {
                    var line = "";
                    row.forEach(function (piece) { if (piece < 0)
                        line += " " + piece;
                    else
                        line += "  " + piece; });
                    console.log(line);
                });
            }
            throw new CheckMateException();
        }
        if (sortedMoves.length == 0) {
            console.log("No move");
            if (this.chessboard.moves.ownCheck)
                throw new CheckMateException();
            else
                throw new StaleMateException();
        }
        if (level > 1) {
            sortedMoves = sortedMoves.slice(0, breadth);
            sortedMoves = sortedMoves.filter(function (answer) { return answer.value > -20000; }); // can only occur if the king is captured
            var index = 0;
            while (index < breadth && index < sortedMoves.length) {
                var answer = moves[index];
                if (answer.value > 20000)
                    break;
                var captured = this.chessboard.capturedPieces.length;
                var moveCount = this.chessboard.moveHistory.length;
                try {
                    this.chessboard.move(answer.fromRow, answer.fromCol, answer.toRow, answer.toCol, answer.promotion);
                    var answerToAnswer = this.findBestAnswerTo(level - 1, breadth);
                    answer.value = -answerToAnswer.value;
                    index++;
                }
                catch (ex) {
                    if (typeof (ex) == "CheckMateException") {
                        answer.value = 100000;
                        break;
                    }
                    else
                        answer.value = 0;
                }
                finally {
                    this.chessboard.revertLastMove();
                    if (captured != this.chessboard.capturedPieces.length) {
                        console.log("Nanu?" + level + " " + answer.toString());
                    }
                    if (moveCount != this.chessboard.moveHistory.length) {
                        console.log("moves?" + level + " " + answer.toString());
                    }
                }
            }
            var sortedMoves = sortedMoves.sort(function (m1, m2) { return m2.value - m1.value; });
        }
        return sortedMoves[0];
    };
    return Suggestor;
})();
exports.Suggestor = Suggestor;
var CheckMateException = (function (_super) {
    __extends(CheckMateException, _super);
    function CheckMateException() {
        _super.apply(this, arguments);
    }
    return CheckMateException;
})(Error);
var StaleMateException = (function (_super) {
    __extends(StaleMateException, _super);
    function StaleMateException() {
        _super.apply(this, arguments);
    }
    return StaleMateException;
})(Error);
//# sourceMappingURL=suggestor.js.map