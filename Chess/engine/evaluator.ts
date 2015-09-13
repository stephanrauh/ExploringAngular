import {PieceModule} from "./pieces"

export class Evaluator {
    private static POSITIONAL_VALUES: number[][] =
    [[0, 10, 20, 30, 30, 20, 10, 0],
        [10, 20, 30, 40, 40, 30, 20, 10],
        [15, 30, 60, 80, 80, 60, 30, 15],
        [20, 40, 70, 100, 100, 70, 40, 20],
        [20, 40, 70, 100, 100, 70, 40, 20],
        [15, 30, 40, 80, 80, 40, 30, 15],
        [10, 20, 30, 40, 40, 30, 20, 10],
        [0, 10, 20, 30, 30, 20, 10, 0],
    ];
    private static WHITE_PAWN_POSITION_VALUES: number[][] =
    [[200, 200, 200, 200, 200, 200, 200, 200],
        [55, 70, 110, 180, 180, 110, 70, 55],
        [45, 60, 90, 160, 160, 90, 60, 45],
        [35, 50, 70, 130, 130, 70, 50, 35],
        [20, 40, 50, 110, 110, 50, 40, 20],
        [15, 30, 40, 50, 50, 40, 30, 15],
        [20, 30, 60, 40, 40, 60, 40, 30],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];

    static PERFORMANCE_MEASURE_SUM: number = 0
    static PERFORMANCE_MEASURE_COUNT: number = 0

    public static evaluatePosition(fields: number[][], whiteThreats: number[][], blackThreats: number[][], isWhitePlaying: boolean): number {
        var PERFORMANCE_MEASURE_start = window.performance.now();
        var materialSumWhite = 0;
        var materialSumBlack = 0;
        var positionalSumWhite = 0; // white fields in the middle of the chessboard add to this number
        var positionalSumBlack = 0; // white fields in the middle of the chessboard add to this number
        var threatSumWhite = 0; // sum of the material values of the white pieces that are either protected by white pieces (negative threat)
                                // or attacked by black pieces (positive threat)
        var threatSumBlack = 0; // sum of the material values of the black pieces that are either protected by black pieces (negative threat)
                                // or attacked by white pieces (positive threat)
        var coverageSumWhite = 0; // number of empty fields white pieces may reach unharmed
        var coverageSumBlack = 0; // number of empty fields black pieces may reach unharmed

        for (var row = 0; row < 8; row++) {
            for (var col = 0; col < 8; col++) {
                var piece = fields[row][col]
                if (piece > 0) { // white
                    materialSumWhite += PieceModule.PieceUtils.materialValue(piece);
                    if (piece == 1)
                        positionalSumWhite += Evaluator.WHITE_PAWN_POSITION_VALUES[row][col];
                    else
                        positionalSumWhite += Evaluator.POSITIONAL_VALUES[row][col];
                    var threatLevel = blackThreats[row][col] - whiteThreats[row][col]
                    if (isWhitePlaying)
                        threatLevel++; //the own piece is threatened - white must react
                    threatSumWhite += threatLevel * Evaluator.WHITE_PAWN_POSITION_VALUES[row][col]
                }
                else if (piece < 0) { // black
                    materialSumBlack += PieceModule.PieceUtils.materialValue(piece);
                    if (piece == -1)
                        positionalSumBlack += Evaluator.WHITE_PAWN_POSITION_VALUES[row][col];
                    else
                        positionalSumBlack += Evaluator.POSITIONAL_VALUES[7 - row][col];
                    var threatLevel = whiteThreats[row][col] - blackThreats[row][col]
                    if (!isWhitePlaying)
                        threatLevel++; //the own piece is threatened - white must react
                    threatSumBlack += threatLevel * Evaluator.WHITE_PAWN_POSITION_VALUES[row][col]
                } else { // empty field
                    var threatLevel = blackThreats[row][col] - whiteThreats[row][col]
                    if (isWhitePlaying) {
                      if (threatLevel<0)
                        coverageSumWhite++
                      else if (threatLevel > 0) {
                        coverageSumBlack++
                      }
                    }

                }
            }
        }
        var valueOfPawn = PieceModule.PieceUtils.materialValue(1);
        var result = (materialSumWhite + positionalSumWhite + (threatSumWhite/3) + (coverageSumWhite*valueOfPawn/6))
              - (materialSumBlack + positionalSumBlack + (threatSumBlack/3) + (coverageSumBlack*valueOfPawn/6))
        var PERFORMANCE_MEASURE_stop = window.performance.now();
        Evaluator.PERFORMANCE_MEASURE_SUM += PERFORMANCE_MEASURE_stop-PERFORMANCE_MEASURE_start
        Evaluator.PERFORMANCE_MEASURE_COUNT++

        return result;
    }

    public static showPerformanceStats() {
      console.log(Evaluator.PERFORMANCE_MEASURE_COUNT + " evaluations took " + Evaluator.PERFORMANCE_MEASURE_SUM + " ms");
    }
}
