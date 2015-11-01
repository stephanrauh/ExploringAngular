define(["require", "exports", "./pieces"], function (require, exports, pieces_1) {
    var Evaluator = (function () {
        function Evaluator() {
        }
        Evaluator.evaluatePosition = function (chessboard, whiteThreats, blackThreats, isWhitePlaying) {
            var PERFORMANCE_MEASURE_start = window.performance.now();
            var fields = chessboard.fields;
            var materialSumWhite = 0;
            var materialSumBlack = 0;
            var positionalSumWhite = 0;
            var positionalSumBlack = 0;
            var threatSumWhite = 0;
            var threatSumBlack = 0;
            var coverageSumWhite = 0;
            var coverageSumBlack = 0;
            for (var row = 0; row < 8; row++) {
                for (var col = 0; col < 8; col++) {
                    var piece = fields[row][col];
                    if (piece > 0) {
                        materialSumWhite += pieces_1.PieceUtils.materialValue(piece);
                        if (piece == 1) {
                            positionalSumWhite += Evaluator.WHITE_PAWN_POSITION_VALUES[row][col];
                            if (col > 0 && row > 0 && row < 5) {
                                if ((1 == fields[row][col - 1]) || (1 == fields[row + 1][col - 1]) || (1 == fields[row - 1][col - 1]))
                                    positionalSumWhite += Evaluator.DOUBLE_PAWN_BONUS[col];
                            }
                        }
                        else
                            positionalSumWhite += Evaluator.POSITIONAL_VALUES[row][col];
                        var threatLevel = blackThreats[row][col] - whiteThreats[row][col];
                        if (isWhitePlaying)
                            threatLevel++;
                        threatSumWhite += threatLevel * Evaluator.WHITE_PAWN_POSITION_VALUES[row][col];
                    }
                    else if (piece < 0) {
                        materialSumBlack += pieces_1.PieceUtils.materialValue(piece);
                        if (piece == -1) {
                            positionalSumBlack += Evaluator.WHITE_PAWN_POSITION_VALUES[row][col];
                            if (col > 0 && row > 2 && row < 7) {
                                if ((-1 == fields[row][col - 1]) || (-1 == fields[row + 1][col - 1]) || (-1 == fields[row - 1][col - 1]))
                                    positionalSumBlack += Evaluator.DOUBLE_PAWN_BONUS[col];
                            }
                        }
                        else
                            positionalSumBlack += Evaluator.POSITIONAL_VALUES[7 - row][col];
                        var threatLevel = whiteThreats[row][col] - blackThreats[row][col];
                        if (!isWhitePlaying)
                            threatLevel++;
                        threatSumBlack += threatLevel * Evaluator.WHITE_PAWN_POSITION_VALUES[row][col];
                    }
                    else {
                        var threatLevel = blackThreats[row][col] - whiteThreats[row][col];
                        if (isWhitePlaying) {
                            if (threatLevel < 0)
                                coverageSumWhite++;
                            else if (threatLevel > 0) {
                                coverageSumBlack++;
                            }
                        }
                    }
                }
            }
            var valueOfPawn = pieces_1.PieceUtils.materialValue(1);
            var result = (materialSumWhite + positionalSumWhite + (threatSumWhite / 5) + (coverageSumWhite * valueOfPawn / 10))
                - (materialSumBlack + positionalSumBlack + (threatSumBlack / 5) + (coverageSumBlack * valueOfPawn / 10));
            if (!chessboard.whiteKingHasMoved) {
                if (!chessboard.whiteLeftRookHasMoved)
                    result += 2500;
                if (!chessboard.whiteRightRookHasMoved)
                    result += 2500;
            }
            if (!chessboard.blackKingHasMoved) {
                if (!chessboard.blackLeftRookHasMoved)
                    result += -2500;
                if (!chessboard.blackRightRookHasMoved)
                    result += -2500;
            }
            if (isWhitePlaying)
                result = -result;
            var PERFORMANCE_MEASURE_stop = window.performance.now();
            Evaluator.PERFORMANCE_MEASURE_SUM += PERFORMANCE_MEASURE_stop - PERFORMANCE_MEASURE_start;
            Evaluator.PERFORMANCE_MEASURE_COUNT++;
            return result;
        };
        Evaluator.showPerformanceStats = function () {
            console.log(Evaluator.PERFORMANCE_MEASURE_COUNT + " evaluations took " + Evaluator.PERFORMANCE_MEASURE_SUM + " ms");
        };
        Evaluator.POSITIONAL_VALUES = [[0, 100, 200, 300, 300, 200, 100, 0],
            [100, 200, 300, 400, 400, 300, 200, 100],
            [150, 300, 600, 800, 800, 600, 300, 150],
            [200, 400, 700, 1000, 1000, 700, 400, 200],
            [200, 400, 700, 1000, 1000, 700, 400, 200],
            [10, 300, 400, 800, 800, 400, 300, 150],
            [100, 200, 300, 400, 400, 300, 200, 100],
            [0, 100, 200, 300, 300, 200, 100, 0],
        ];
        Evaluator.WHITE_PAWN_POSITION_VALUES = [[2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000],
            [550, 700, 1100, 1800, 1800, 1100, 700, 550],
            [450, 600, 900, 1600, 1600, 900, 600, 450],
            [350, 500, 700, 1300, 1300, 700, 500, 350],
            [200, 400, 500, 1100, 1100, 500, 400, 200],
            [150, 300, 400, 500, 500, 400, 300, 150],
            [200, 300, 600, 400, 400, 600, 400, 300],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];
        Evaluator.DOUBLE_PAWN_BONUS = [
            500,
            500,
            600,
            700,
            800,
            700,
            600,
            500];
        Evaluator.PERFORMANCE_MEASURE_SUM = 0;
        Evaluator.PERFORMANCE_MEASURE_COUNT = 0;
        return Evaluator;
    })();
    exports.Evaluator = Evaluator;
});
//# sourceMappingURL=evaluator.js.map