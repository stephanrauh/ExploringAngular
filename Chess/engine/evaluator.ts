import {PieceUtils} from "./pieces"
import {Chessboard} from "./chessboard"

export class Evaluator {
    private static POSITIONAL_VALUES: number[][] =
    [[0, 100, 200, 300, 300, 200, 100, 0],
        [100, 200, 300, 400, 400, 300, 200, 100],
        [150, 300, 600, 800, 800, 600, 300, 150],
        [200, 400, 700, 1000, 1000, 700, 400, 200],
        [200, 400, 700, 1000, 1000, 700, 400, 200],
        [10, 300, 400, 800, 800, 400, 300, 150],
        [100, 200, 300, 400, 400, 300, 200, 100],
        [0, 100, 200, 300, 300, 200, 100, 0],
    ];
    private static WHITE_PAWN_POSITION_VALUES: number[][] =
    [[2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000],
        [550, 700, 1100, 1800, 1800, 1100, 700, 550],
        [450, 600, 900, 1600, 1600, 900, 600, 450],
        [350, 500, 700, 1300, 1300, 700, 500, 350],
        [200, 400, 500, 1100, 1100, 500, 400, 200],
        [150, 300, 400, 500, 500, 400, 300, 150],
        [200, 300, 600, 400, 400, 600, 400, 300],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];

    private static DOUBLE_PAWN_BONUS: number[] = [
            500 /* n/a */,
            500 /* A+B */,
            600 /* B+C */,
            700 /* C+D */,
            800 /* D+E */,
            700 /* E + F */,
            600 /* F + G */,
            500 /* G + H */];

    static PERFORMANCE_MEASURE_SUM: number = 0
    static PERFORMANCE_MEASURE_COUNT: number = 0

    public static evaluatePosition(chessboard: Chessboard, whiteThreats: number[][], blackThreats: number[][], isWhitePlaying: boolean
        ): number {
        var PERFORMANCE_MEASURE_start = window.performance.now()
        var fields: number[][]=chessboard.fields
        var materialSumWhite = 0
        var materialSumBlack = 0
        var positionalSumWhite = 0 // white fields in the middle of the chessboard add to this number
        var positionalSumBlack = 0 // white fields in the middle of the chessboard add to this number
        var threatSumWhite = 0 // sum of the material values of the white pieces that are either protected by white pieces (negative threat)
                                // or attacked by black pieces (positive threat)
        var threatSumBlack = 0 // sum of the material values of the black pieces that are either protected by black pieces (negative threat)
                                // or attacked by white pieces (positive threat)
        var coverageSumWhite = 0 // number of empty fields white pieces may reach unharmed
        var coverageSumBlack = 0;// number of empty fields black pieces may reach unharmed

        for (var row = 0; row < 8; row++) {
            for (var col = 0; col < 8; col++) {
                var piece = fields[row][col]
                if (piece > 0) { // white
                    materialSumWhite += PieceUtils.materialValue(piece)
                    if (piece == 1) {
                        positionalSumWhite += Evaluator.WHITE_PAWN_POSITION_VALUES[row][col];
                        if (col>0 && row > 0 && row<5) {
                          if ((1 == fields[row][col-1]) || (1 == fields[row+1][col-1])|| (1 == fields[row-1][col-1]))
                             positionalSumWhite += Evaluator.DOUBLE_PAWN_BONUS[col];
                        }
                    }
                    else
                        positionalSumWhite += Evaluator.POSITIONAL_VALUES[row][col];
                    var threatLevel = blackThreats[row][col] - whiteThreats[row][col]
                    if (isWhitePlaying)
                        threatLevel++; //the own piece is threatened - white must react
                    threatSumWhite += threatLevel * Evaluator.WHITE_PAWN_POSITION_VALUES[row][col]
                }
                else if (piece < 0) { // black
                    materialSumBlack += PieceUtils.materialValue(piece);
                    if (piece == -1) {
                        positionalSumBlack += Evaluator.WHITE_PAWN_POSITION_VALUES[row][col];
                        if (col>0 && row > 2 && row<7) {
                          if ((-1 == fields[row][col-1]) || (-1 == fields[row+1][col-1])|| (-1 == fields[row-1][col-1]))
                             positionalSumBlack += Evaluator.DOUBLE_PAWN_BONUS[col];
                        }
                    }
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
        var valueOfPawn = PieceUtils.materialValue(1);
        var result = (materialSumWhite + positionalSumWhite + (threatSumWhite/5) + (coverageSumWhite*valueOfPawn/10))
              - (materialSumBlack + positionalSumBlack + (threatSumBlack/5) + (coverageSumBlack*valueOfPawn/10))
        // calculate the value of castling
        if (!chessboard.whiteKingHasMoved) {
          if (!chessboard.whiteLeftRookHasMoved)
            result += 2500
            if (!chessboard.whiteRightRookHasMoved)
              result += 2500
        }
        if (!chessboard.blackKingHasMoved) {
          if (!chessboard.blackLeftRookHasMoved)
            result += -2500
            if (!chessboard.blackRightRookHasMoved)
              result += -2500
        }

        if (isWhitePlaying)
           result=-result

        var PERFORMANCE_MEASURE_stop = window.performance.now();
        Evaluator.PERFORMANCE_MEASURE_SUM += PERFORMANCE_MEASURE_stop-PERFORMANCE_MEASURE_start
        Evaluator.PERFORMANCE_MEASURE_COUNT++

        return result;
    }

    public static showPerformanceStats() {
      console.log(Evaluator.PERFORMANCE_MEASURE_COUNT + " evaluations took " + Evaluator.PERFORMANCE_MEASURE_SUM + " ms");
    }
}
