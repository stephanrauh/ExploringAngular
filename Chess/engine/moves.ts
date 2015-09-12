import {Engine} from "./chessboard";
import {Move} from './move';

export class Moves {
    private _legalMoves: Array<Move> = null;
    constructor(private chessboard: Engine.Chessboard) { }

    get legalMoves(): Array<Move> {
        this.calculateLegalMoves();
        return this._legalMoves;
    }

    isLegalMove(fromRow: number, fromCol: number, toRow: number, toCol: number) {
        this.calculateLegalMoves();
        for (var index in this._legalMoves) {
            var move: Move = this._legalMoves[index]
            if (move.fromRow == fromRow && move.fromCol == fromCol && move.toRow == toRow && move.toCol == toCol)
                return true;
        }
        return false;
    }

    calculateLegalMoves() {
        if (null == this._legalMoves) {
            var result: Array<Move> = new Array<Move>();
            for (var row: number = 0; row < this.chessboard.fields.length; row++) {
                var currentRow: number[] = this.chessboard.fields[row];
                for (var col: number = 0; col < currentRow.length; col++) {
                    var piece: number = this.chessboard.fields[row][col];
                    if (this.chessboard.isWhitePlaying) {
                        if (piece > 0)
                            this.addWhiteMoves(row, col, piece, this.chessboard.fields, result);
                    } else if (piece < 0)
                        this.addBlackMoves(row, col, piece, this.chessboard.fields, result);
                }
            }
            this._legalMoves = result;
        }
    }

    addWhiteMoves(row: number, col: number, piece: number, fields: number[][], result: Array<Move>) {
        this.addCommonMoves(row, col, piece, fields, -1, result);
    }

    addBlackMoves(row: number, col: number, piece: number, fields: number[][], result: Array<Move>) {
        this.addCommonMoves(row, col, piece, fields, 1, result);
    }

    addCommonMoves(row: number, col: number, piece: number, fields: number[][], pawnMoveDirection: number, result: Array<Move>) {
        if (piece == -1 || piece == 1)
            this.addCommonMovesForAPawn(row, col, fields, pawnMoveDirection, result);
        else if (piece == -2 || piece == 2)
            this.addCommonMovesForARook(row, col, fields, result);
        else if (piece == -3 || piece == 3)
            this.addCommonMovesForAKnight(row, col, fields, result);
        else if (piece == -4 || piece == 4)
            this.addCommonMovesForABishop(row, col, fields, result);
        else if (piece == -5 || piece == 5)
            this.addCommonMovesForAQueen(row, col, fields, result);
        else if (piece == -6 || piece == 6)
            this.addCommonMovesForAKing(row, col, fields, result);
    }

    isTargetEmptyOrCanBeCaptured(toRow: number, toCol: number, sourcePiece: number, fields: number[][]): boolean {
        var targetPiece: number = fields[toRow][toCol]
        if (sourcePiece > 0 && targetPiece <= 0)
            return true;
        if (sourcePiece < 0 && targetPiece >= 0)
            return true;
        return false
    }

    isTargetCanBeCaptured(toRow: number, toCol: number, sourcePiece: number, fields: number[][]): boolean {
        var targetPiece: number = fields[toRow][toCol]
        if (sourcePiece > 0 && targetPiece < 0)
            return true;
        if (sourcePiece < 0 && targetPiece > 0)
            return true;
        return false
    }

    isTargetEmpty(toRow: number, toCol: number, sourcePiece: number, fields: number[][]): boolean {
        var targetPiece: number = fields[toRow][toCol]
        if (targetPiece == 0)
            return true;
        return false
    }



    /** This method returns true if the move could be added to the list. */
    addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow: number, fromCol: number, toRow: number, toCol: number, sourcePiece: number, fields: number[][], result: Array<Move>, promotion: number = 0) {
        if (fromRow < 0 || fromRow >= 8) return false;
        if (fromCol < 0 || fromCol >= 8) return false;
        if (toRow < 0 || toRow >= 8) return false;
        if (toCol < 0 || toCol >= 8) return false;
        if (this.isTargetEmptyOrCanBeCaptured(toRow, toCol, sourcePiece, fields)) {
            result.push(new Move(fromRow, fromCol, toRow, toCol, promotion, fields[toRow][toCol]))
            return true;
        }
        return false;
    }

    /** This method returns true if the move could be added to the list. */
    addMoveIfTargetIsEmpty(fromRow: number, fromCol: number, toRow: number, toCol: number, sourcePiece: number, fields: number[][], result: Array<Move>, considerPromotion: boolean = false) {
        if (fromRow < 0 || fromRow >= 8) return false;
        if (fromCol < 0 || fromCol >= 8) return false;
        if (toRow < 0 || toRow >= 8) return false;
        if (toCol < 0 || toCol >= 8) return false;
        if (this.isTargetEmpty(toRow, toCol, sourcePiece, fields)) {
            if (considerPromotion && (toRow == 0 || toRow == 7)) {
                result.push(new Move(fromRow, fromCol, toRow, toCol, 2, fields[toRow][toCol]))
                result.push(new Move(fromRow, fromCol, toRow, toCol, 3, fields[toRow][toCol]))
                result.push(new Move(fromRow, fromCol, toRow, toCol, 4, fields[toRow][toCol]))
                result.push(new Move(fromRow, fromCol, toRow, toCol, 5, fields[toRow][toCol]))
            }
            else
                result.push(new Move(fromRow, fromCol, toRow, toCol, 0, fields[toRow][toCol]))

            return true;
        }
        return false;
    }

    /** This method returns true if the move could be added to the list. */
    addMoveIfTargetCanBeCaptured(fromRow: number, fromCol: number, toRow: number, toCol: number, sourcePiece: number, fields: number[][], result: Array<Move>, considerPromotion: boolean = false) {
        if (fromRow < 0 || fromRow >= 8) return false;
        if (fromCol < 0 || fromCol >= 8) return false;
        if (toRow < 0 || toRow >= 8) return false;
        if (toCol < 0 || toCol >= 8) return false;
        if (this.isTargetCanBeCaptured(toRow, toCol, sourcePiece, fields)) {
            if (considerPromotion && (toRow == 0 || toRow == 7)) {
                result.push(new Move(fromRow, fromCol, toRow, toCol, 2, fields[toRow][toCol]))
                result.push(new Move(fromRow, fromCol, toRow, toCol, 3, fields[toRow][toCol]))
                result.push(new Move(fromRow, fromCol, toRow, toCol, 4, fields[toRow][toCol]))
                result.push(new Move(fromRow, fromCol, toRow, toCol, 5, fields[toRow][toCol]))
            } else
                result.push(new Move(fromRow, fromCol, toRow, toCol, 0, fields[toRow][toCol]))
            return true;
        }
        return false;
    }

    addCommonMovesForAPawn(fromRow: number, fromCol: number, fields: number[][], pawnMoveDirection: number, result: Array<Move>) {
        var toCol = fromCol;
        var toRow = fromRow + pawnMoveDirection;
        var sourcePiece = fields[fromRow][fromCol]
        if (this.addMoveIfTargetIsEmpty(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, true)) {
            if (sourcePiece > 0 && fromRow == 6) { //white initial pawn double move
                toRow = toRow + pawnMoveDirection;
                this.addMoveIfTargetIsEmpty(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)
            } else if (sourcePiece < 0 && fromRow == 1) { // black initial pawn double move
                toRow = toRow + pawnMoveDirection;
                this.addMoveIfTargetIsEmpty(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)
            }
        }
        toCol = fromCol + 1;
        toRow = fromRow + pawnMoveDirection;
        this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, true)
        toCol = fromCol - 1;
        toRow = fromRow + pawnMoveDirection;
        this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, true)

        if (this.chessboard.enPassantCol >= 0) {
            if (sourcePiece == 1) { // white
                if (fromRow == 3) {
                    if (fromCol == this.chessboard.enPassantCol + 1)
                        this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow - 1, this.chessboard.enPassantCol, sourcePiece, fields, result)
                    else if (fromCol == this.chessboard.enPassantCol - 1)
                        this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow - 1, this.chessboard.enPassantCol, sourcePiece, fields, result)
                }
            } else if (sourcePiece == -1) { // black
                if (fromRow == 4) {
                    if (fromCol == this.chessboard.enPassantCol + 1)
                        this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow + 1, this.chessboard.enPassantCol, sourcePiece, fields, result)
                    else if (fromCol == this.chessboard.enPassantCol - 1)
                        this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow + 1, this.chessboard.enPassantCol, sourcePiece, fields, result)
                }
            }
        }

        // To do: casting when the pawn reaches the last line
    }

    addCommonMovesForAKnight(fromRow: number, fromCol: number, fields: number[][], result: Array<Move>) {
        var toCol = fromCol + 1;
        var toRow = fromRow + 2;
        var sourcePiece = fields[fromRow][fromCol]
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)
        toCol = fromCol + 2;
        toRow = fromRow + 1;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)
        toCol = fromCol - 1;
        toRow = fromRow + 2;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)
        toCol = fromCol - 2;
        toRow = fromRow + 1;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)
        toCol = fromCol + 1;
        toRow = fromRow - 2;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)
        toCol = fromCol + 2;
        toRow = fromRow - 1;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)
        toCol = fromCol - 1;
        toRow = fromRow - 2;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)
        toCol = fromCol - 2;
        toRow = fromRow - 1;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)

    }

    addCommonMovesForABishop(fromRow: number, fromCol: number, fields: number[][], result: Array<Move>) {
        var toCol = fromCol;
        var toRow = fromRow;
        var sourcePiece = fields[fromRow][fromCol]
        while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, ++toRow, ++toCol, sourcePiece, fields, result)) { }
        this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)

        toCol = fromCol;
        toRow = fromRow;
        while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, --toRow, ++toCol, sourcePiece, fields, result)) { }
        this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)

        toCol = fromCol;
        toRow = fromRow;
        while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, ++toRow, --toCol, sourcePiece, fields, result)) { }
        this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)

        toCol = fromCol;
        toRow = fromRow;
        while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, --toRow, --toCol, sourcePiece, fields, result)) { }
        this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)
    }

    addCommonMovesForARook(fromRow: number, fromCol: number, fields: number[][], result: Array<Move>) {
        var toCol = fromCol;
        var toRow = fromRow;
        var sourcePiece = fields[fromRow][fromCol]
        while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, ++toRow, toCol, sourcePiece, fields, result)) { }
        this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)

        toCol = fromCol;
        toRow = fromRow;
        while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, --toRow, toCol, sourcePiece, fields, result)) { }
        this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)

        toCol = fromCol;
        toRow = fromRow;
        while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, toRow, ++toCol, sourcePiece, fields, result)) { }
        this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)

        toCol = fromCol;
        toRow = fromRow;
        while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, toRow, --toCol, sourcePiece, fields, result)) { }
        this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)
    }

    addCommonMovesForAQueen(fromRow: number, fromCol: number, fields: number[][], result: Array<Move>) {
        this.addCommonMovesForABishop(fromRow, fromCol, fields, result);
        this.addCommonMovesForARook(fromRow, fromCol, fields, result);
    }
    addCommonMovesForAKing(fromRow: number, fromCol: number, fields: number[][], result: Array<Move>) {
        var toCol = fromCol;
        var toRow = fromRow + 1;
        var sourcePiece = fields[fromRow][fromCol]
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)
        toCol = fromCol + 1;
        toRow = fromRow + 1;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)
        toCol = fromCol - 1;
        toRow = fromRow + 1;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)
        toCol = fromCol + 1;
        toRow = fromRow;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)
        toCol = fromCol - 1;
        toRow = fromRow;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)
        toCol = fromCol - 1;
        toRow = fromRow - 1;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)
        toCol = fromCol;
        toRow = fromRow - 1;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)
        toCol = fromCol + 1;
        toRow = fromRow - 1;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result)

        // castling
        if (sourcePiece > 0) { // white is playing
            if ((!this.chessboard.whiteKingHasMoved) && (!this.chessboard.whiteLeftRookHasMoved)) {
                if (this.isTargetEmpty(fromRow, fromCol - 1, sourcePiece, fields))
                    if (this.isTargetEmpty(fromRow, fromCol - 3, sourcePiece, fields))
                        this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow, fromCol - 2, sourcePiece, fields, result)
            }
            if ((!this.chessboard.whiteKingHasMoved) && (!this.chessboard.whiteRightRookHasMoved)) {
                if (this.isTargetEmpty(fromRow, fromCol + 1, sourcePiece, fields))
                    this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow, fromCol + 2, sourcePiece, fields, result)
            }
        } else { // black is playing
            if ((!this.chessboard.blackKingHasMoved) && (!this.chessboard.blackLeftRookHasMoved)) {
                if (this.isTargetEmpty(fromRow, fromCol - 1, sourcePiece, fields))
                    if (this.isTargetEmpty(fromRow, fromCol - 3, sourcePiece, fields))
                        this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow, fromCol - 2, sourcePiece, fields, result)
            }
            if ((!this.chessboard.blackKingHasMoved) && (!this.chessboard.blackRightRookHasMoved)) {
                if (this.isTargetEmpty(fromRow, fromCol + 1, sourcePiece, fields))
                    this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow, fromCol + 2, sourcePiece, fields, result)
            }
        }
    }
}
