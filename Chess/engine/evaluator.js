define(["require", "exports", "./pieces"], function (require, exports, pieces_1) {
    var Evaluator = (function () {
        function Evaluator() {
        }
        Evaluator.evaluatePosition = function (fields, whiteThreats, blackThreats, isWhitePlaying) {
            var PERFORMANCE_MEASURE_start = window.performance.now();
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
                        materialSumWhite += pieces_1.PieceModule.PieceUtils.materialValue(piece);
                        if (piece == 1)
                            positionalSumWhite += Evaluator.WHITE_PAWN_POSITION_VALUES[row][col];
                        else
                            positionalSumWhite += Evaluator.POSITIONAL_VALUES[row][col];
                        var threatLevel = blackThreats[row][col] - whiteThreats[row][col];
                        if (isWhitePlaying)
                            threatLevel++;
                        threatSumWhite += threatLevel * Evaluator.WHITE_PAWN_POSITION_VALUES[row][col];
                    }
                    else if (piece < 0) {
                        materialSumBlack += pieces_1.PieceModule.PieceUtils.materialValue(piece);
                        if (piece == -1)
                            positionalSumBlack += Evaluator.WHITE_PAWN_POSITION_VALUES[row][col];
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
            var valueOfPawn = pieces_1.PieceModule.PieceUtils.materialValue(1);
            var result = (materialSumWhite + positionalSumWhite + (threatSumWhite / 3) + (coverageSumWhite * valueOfPawn / 6))
                - (materialSumBlack + positionalSumBlack + (threatSumBlack / 3) + (coverageSumBlack * valueOfPawn / 6));
            var PERFORMANCE_MEASURE_stop = window.performance.now();
            Evaluator.PERFORMANCE_MEASURE_SUM += PERFORMANCE_MEASURE_stop - PERFORMANCE_MEASURE_start;
            Evaluator.PERFORMANCE_MEASURE_COUNT++;
            return result;
        };
        Evaluator.showPerformanceStats = function () {
            console.log(Evaluator.PERFORMANCE_MEASURE_COUNT + " evaluations took " + Evaluator.PERFORMANCE_MEASURE_SUM + " ms");
        };
        Evaluator.POSITIONAL_VALUES = [[0, 10, 20, 30, 30, 20, 10, 0],
            [10, 20, 30, 40, 40, 30, 20, 10],
            [15, 30, 60, 80, 80, 60, 30, 15],
            [20, 40, 70, 100, 100, 70, 40, 20],
            [20, 40, 70, 100, 100, 70, 40, 20],
            [15, 30, 40, 80, 80, 40, 30, 15],
            [10, 20, 30, 40, 40, 30, 20, 10],
            [0, 10, 20, 30, 30, 20, 10, 0],
        ];
        Evaluator.WHITE_PAWN_POSITION_VALUES = [[200, 200, 200, 200, 200, 200, 200, 200],
            [55, 70, 110, 180, 180, 110, 70, 55],
            [45, 60, 90, 160, 160, 90, 60, 45],
            [35, 50, 70, 130, 130, 70, 50, 35],
            [20, 40, 50, 110, 110, 50, 40, 20],
            [15, 30, 40, 50, 50, 40, 30, 15],
            [20, 30, 60, 40, 40, 60, 40, 30],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];
        Evaluator.PERFORMANCE_MEASURE_SUM = 0;
        Evaluator.PERFORMANCE_MEASURE_COUNT = 0;
        return Evaluator;
    })();
    exports.Evaluator = Evaluator;
});
//# sourceMappingURL=evaluator.js.map