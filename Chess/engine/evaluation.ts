import {PieceModule} from "./pieces"

export class Evaluation {
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

    public static evaluatePosition(fields: number[][]): number {
        var materialSumWhite = 0;
        var materialSumBlack = 0;
        var positionalSumWhite = 0;
        var positionalSumBlack = 0;

        for (var row = 0; row < 8; row++) {
            for (var col = 0; col < 8; col++) {
                var piece = fields[row][col]
                if (piece > 0) {
                    materialSumWhite += PieceModule.PieceUtils.materialValue(piece);
                    if (piece==1)
                      positionalSumWhite += Evaluation.WHITE_PAWN_POSITION_VALUES[row][col];
                    else
                      positionalSumWhite += Evaluation.POSITIONAL_VALUES[row][col];
                }
                else if (piece < 0) {
                    materialSumBlack += PieceModule.PieceUtils.materialValue(piece);
                    if (piece==-1)
                      positionalSumBlack += Evaluation.WHITE_PAWN_POSITION_VALUES[row][col];
                    else
                      positionalSumBlack += Evaluation.POSITIONAL_VALUES[7-row][col];
                }
            }
        }
        return (materialSumWhite + positionalSumWhite) - (materialSumBlack + positionalSumBlack);
    }
}
