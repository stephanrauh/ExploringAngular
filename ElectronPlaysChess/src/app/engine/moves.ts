import {Chessboard} from "./chessboard";
import {Move} from './move';
import {Evaluator} from './evaluator'
import {Piece} from './pieces'

export class Moves {
    private _legalMoves: Array<Move> = null;
    private _legalOpponentMoves: Array<Move> = null;
    private _ownThreats: number[][] = null;
    private _opponentThreats: number[][] = null;

    check: boolean = false;
    checkMate: boolean = false;
    staleMate: boolean = false;
    ownCheck: boolean = false;
    ownCheckMate: boolean = false;


    constructor(private chessboard: Chessboard) {
        this.calculateLegalMoves();
    }

    get legalMoves(): Array<Move> {
        this.calculateLegalMoves();
        return this._legalMoves;
    }

    get legalOpponentMoves(): Array<Move> {
        this.calculateLegalMoves();
        return this._legalOpponentMoves;
    }

    get ownThreats(): number[][] {
        this.calculateLegalMoves();
        return this._ownThreats;
    }
    get opponentThreats(): number[][] {
        this.calculateLegalMoves();
        return this._opponentThreats;
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

    /** Note that this function has side effects. It is responsible for setting the
        attributes check, ownCheck, checkMate, ownCheckMate and stalemate of the chessboard.
    */
    calculateLegalMoves() {
        if (null == this._legalMoves) {
            var result: Array<Move> = new Array<Move>();
            var opponentResult: Array<Move> = new Array<Move>();
            var ownThreats: number[][] = [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0]
            ];
            var opponentThreats: number[][] = [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0]
            ];

            var ownKingRow: number;
            var ownKingCol: number;
            var opponentKingRow: number;
            var opponentKingCol: number;

            for (var row: number = 0; row < this.chessboard.fields.length; row++) {
                var currentRow: number[] = this.chessboard.fields[row];
                for (var col: number = 0; col < currentRow.length; col++) {
                    var piece: number = this.chessboard.fields[row][col];
                    if (this.chessboard.isWhitePlaying) {
                        if (piece > 0)
                            this.addWhiteMoves(row, col, piece, this.chessboard.fields, result, ownThreats);
                        else if (piece < 0)
                            this.addBlackMoves(row, col, piece, this.chessboard.fields, opponentResult, opponentThreats);
                        if (piece == 6) {
                            ownKingRow = row;
                            ownKingCol = col;
                        } else if (piece == -6) {
                            opponentKingRow = row;
                            opponentKingCol = col;
                        }
                    } else {
                        if (piece < 0)
                            this.addBlackMoves(row, col, piece, this.chessboard.fields, result, ownThreats);
                        else if (piece > 0)
                            this.addWhiteMoves(row, col, piece, this.chessboard.fields, opponentResult, opponentThreats);
                        if (piece == -6) {
                            ownKingRow = row;
                            ownKingCol = col;
                        } else if (piece == 6) {
                            opponentKingRow = row;
                            opponentKingCol = col;
                        }
                    }
                }
            }

            result = result.filter((move) => !this.kingInChessAfterMove(this.chessboard, move, ownKingRow, ownKingCol, opponentThreats))
            opponentResult = opponentResult.filter((move) => !this.kingInChessAfterMove(this.chessboard, move, opponentKingRow, opponentKingCol, ownThreats))

            var whiteThreats: number[][] = this.chessboard.isWhitePlaying ? ownThreats : opponentThreats
            var blackThreats: number[][] = this.chessboard.isWhitePlaying ? opponentThreats : ownThreats
            result.forEach((move) => {
                this.chessboard.moveInternally(move.fromRow, move.fromCol, move.toRow, move.toCol, move.promotion)
                move.value = Evaluator.evaluatePosition(this.chessboard, whiteThreats, blackThreats, this.chessboard.isWhitePlaying)
                this.chessboard.revertLastMoveInternally()
            })
            this._legalMoves = result;
            this._ownThreats = ownThreats;
            this._legalOpponentMoves = opponentResult;
            this._opponentThreats = opponentThreats;

            this.ownCheckMate = false;
            this.ownCheck = false;
            this.checkMate = false;
            this.check = false;
            this.staleMate = false;
            if (opponentThreats[ownKingRow][ownKingCol]) {
                if (this._legalMoves.length == 0)
                    this.ownCheckMate = true
                this.ownCheck = true
            }

            if (ownThreats[opponentKingRow][opponentKingCol]) {
                if (this._legalOpponentMoves.length == 0)
                    this.checkMate = true
                this.check = true
            }
            if (result.length == 0) {
                this.staleMate = true
            }
        }
    }

    /** Quick check is the king is in check. */
    kingInChessAfterMove(chessboard: Chessboard, move: Move, kingRow: number, kingCol: number, opponentThreats: number[][]): boolean {
        var moveCount = this.chessboard.moveHistory.length
        try {
            if (move.fromRow == kingRow && move.fromCol == kingCol) {
                if (opponentThreats[move.toRow][move.toCol] > 0)
                    return true; // reliable
                else return false; // reliable
            }
            if (opponentThreats[kingRow][kingCol] == 0)
                return false; // reliable
            if (opponentThreats[kingRow][kingCol] > 1)
                return true; // reliable
            if (move.capture == 0) {
                // the board has to be re-evaluated - maybe the moved piece protects the king
                return this.kingInChess(chessboard, move, kingRow, kingCol);
            }
            // the board has to re-evaluated - maybe the offending piece has been captured
            return this.kingInChess(chessboard, move, kingRow, kingCol);;
        }
        finally {
            if (moveCount != this.chessboard.moveHistory.length) {
                console.log("moves? kingInChessAfterMove " + " " + move.toString())
            }
        }
    }

    /** Thourough check if king is in check */
    kingInChess(chessboard: Chessboard, move: Move, kingRow: number, kingCol: number) {
        this.chessboard.moveInternally(move.fromRow, move.fromCol, move.toRow, move.toCol, move.promotion)
        if (move.fromRow == kingRow && move.fromCol == kingCol) {
            kingRow = move.toRow
            kingCol = move.toCol
        }
        var fields = chessboard.fields
        var king = fields[kingRow][kingCol]
        var row = kingRow
        var col = kingCol
        var check = false;
        var reachedLastLine=false;

        try {
            check = check || this.fieldContainsPiece(fields, row + 2, col + 1, (king > 0) ? Piece.BLACK_KNIGHT : Piece.WHITE_KNIGHT);
            check = check || this.fieldContainsPiece(fields, row + 1, col + 2, (king > 0) ? Piece.BLACK_KNIGHT : Piece.WHITE_KNIGHT)
            check = check || this.fieldContainsPiece(fields, row + 2, col - 1, (king > 0) ? Piece.BLACK_KNIGHT : Piece.WHITE_KNIGHT)
            check = check || this.fieldContainsPiece(fields, row + 1, col - 2, (king > 0) ? Piece.BLACK_KNIGHT : Piece.WHITE_KNIGHT)
            check = check || this.fieldContainsPiece(fields, row - 2, col + 1, (king > 0) ? Piece.BLACK_KNIGHT : Piece.WHITE_KNIGHT)
            check = check || this.fieldContainsPiece(fields, row - 1, col + 2, (king > 0) ? Piece.BLACK_KNIGHT : Piece.WHITE_KNIGHT)
            check = check || this.fieldContainsPiece(fields, row - 2, col - 1, (king > 0) ? Piece.BLACK_KNIGHT : Piece.WHITE_KNIGHT)
            check = check || this.fieldContainsPiece(fields, row - 1, col - 2, (king > 0) ? Piece.BLACK_KNIGHT : Piece.WHITE_KNIGHT)
            var opponentPawnDir = (king > 0) ? -1 : 1
            check = check || this.fieldContainsPiece(fields, row + opponentPawnDir, col - 1, (king > 0) ? Piece.BLACK_PAWN : Piece.WHITE_PAWN)
            check = check || this.fieldContainsPiece(fields, row + opponentPawnDir, col + 1, (king > 0) ? Piece.BLACK_PAWN : Piece.WHITE_PAWN)
            check = check || this.fieldContainsPiece(fields, row, col + 1, (king > 0) ? Piece.BLACK_KING : Piece.WHITE_KING)
            check = check || this.fieldContainsPiece(fields, row + 1, col + 1, (king > 0) ? Piece.BLACK_KING : Piece.WHITE_KING)
            check = check || this.fieldContainsPiece(fields, row + 1, col, (king > 0) ? Piece.BLACK_KING : Piece.WHITE_KING)
            check = check || this.fieldContainsPiece(fields, row + 1, col - 1, (king > 0) ? Piece.BLACK_KING : Piece.WHITE_KING)
            check = check || this.fieldContainsPiece(fields, row, col - 1, (king > 0) ? Piece.BLACK_KING : Piece.WHITE_KING)
            check = check || this.fieldContainsPiece(fields, row - 1, col - 1, (king > 0) ? Piece.BLACK_KING : Piece.WHITE_KING)
            check = check || this.fieldContainsPiece(fields, row - 1, col, (king > 0) ? Piece.BLACK_KING : Piece.WHITE_KING)
            check = check || this.fieldContainsPiece(fields, row - 1, col + 1, (king > 0) ? Piece.BLACK_KING : Piece.WHITE_KING)

            while (row < 7 && this.isTargetEmpty(++row, col, fields));
            check = check || this.fieldContainsPiece(fields, row, col, (king > 0) ? Piece.BLACK_QUEEN : Piece.WHITE_QUEEN)
            check = check || this.fieldContainsPiece(fields, row, col, (king > 0) ? Piece.BLACK_ROOK : Piece.WHITE_ROOK)

            row = kingRow
            col = kingCol
            while (row > 0 && this.isTargetEmpty(--row, col, fields));
            check = check || this.fieldContainsPiece(fields, row, col, (king > 0) ? Piece.BLACK_QUEEN : Piece.WHITE_QUEEN)
            check = check || this.fieldContainsPiece(fields, row, col, (king > 0) ? Piece.BLACK_ROOK : Piece.WHITE_ROOK)

            row = kingRow
            col = kingCol
            while (col < 7 && this.isTargetEmpty(row, ++col, fields));
            check = check || this.fieldContainsPiece(fields, row, col, (king > 0) ? Piece.BLACK_QUEEN : Piece.WHITE_QUEEN)
            check = check || this.fieldContainsPiece(fields, row, col, (king > 0) ? Piece.BLACK_ROOK : Piece.WHITE_ROOK)

            row = kingRow
            col = kingCol
            while (col>0 && this.isTargetEmpty(row, --col, fields));
            check = check || this.fieldContainsPiece(fields, row, col, (king > 0) ? Piece.BLACK_QUEEN : Piece.WHITE_QUEEN)
            check = check || this.fieldContainsPiece(fields, row, col, (king > 0) ? Piece.BLACK_ROOK : Piece.WHITE_ROOK)

            row = kingRow
            col = kingCol
            while (row<7 && col<7 && this.isTargetEmpty(++row, ++col, fields));
            check = check || this.fieldContainsPiece(fields, row, col, (king > 0) ? Piece.BLACK_QUEEN : Piece.WHITE_QUEEN)
            check = check || this.fieldContainsPiece(fields, row, col, (king > 0) ? Piece.BLACK_BISHOP : Piece.WHITE_BISHOP)

            row = kingRow
            col = kingCol
            while (row<7 && col>0 && this.isTargetEmpty(++row, --col, fields));
            check = check || this.fieldContainsPiece(fields, row, col, (king > 0) ? Piece.BLACK_QUEEN : Piece.WHITE_QUEEN)
            check = check || this.fieldContainsPiece(fields, row, col, (king > 0) ? Piece.BLACK_BISHOP : Piece.WHITE_BISHOP)

            row = kingRow
            col = kingCol
            while (row>0 && col<7 && this.isTargetEmpty(--row, ++col, fields));
            check = check || this.fieldContainsPiece(fields, row, col, (king > 0) ? Piece.BLACK_QUEEN : Piece.WHITE_QUEEN)
            check = check || this.fieldContainsPiece(fields, row, col, (king > 0) ? Piece.BLACK_BISHOP : Piece.WHITE_BISHOP)

            row = kingRow
            col = kingCol
            while (row>0 && col>0 && this.isTargetEmpty(--row, --col, fields));
            check = check || this.fieldContainsPiece(fields, row, col, (king > 0) ? Piece.BLACK_QUEEN : Piece.WHITE_QUEEN)
            check = check || this.fieldContainsPiece(fields, row, col, (king > 0) ? Piece.BLACK_BISHOP : Piece.WHITE_BISHOP)
reachedLastLine=true;

        } finally {
          this.chessboard.revertLastMoveInternally()
//            console.log("Thourough check analysis: check = " + check + " for " + (king > 0 ? "white" : "black") + " last move: " + move.toString())
//            this.chessboard.fields.forEach((row) => {
//                var line: String = ""
//                row.forEach((piece) => { if (piece < 0) line += " " + piece; else line += "  " + piece })
//                console.log(line)
//            })
//            console.log("------------------------" + reachedLastLine)

        }
        return check
    }

    fieldContainsPiece(fields: number[][], row: number, col: number, piece: number): boolean {
        if (row < 0) return false;
        if (row >= 8) return false;
        if (col < 0) return false;
        if (col >= 8) return false;
        if (fields[row][col] == piece) return true;
        return false;
    }

    addWhiteMoves(row: number, col: number, piece: number, fields: number[][], result: Array<Move>, threats: number[][]) {
        this.addCommonMoves(row, col, piece, fields, -1, result, threats);
    }

    addBlackMoves(row: number, col: number, piece: number, fields: number[][], result: Array<Move>, threats: number[][]) {
        this.addCommonMoves(row, col, piece, fields, 1, result, threats);
    }

    addCommonMoves(row: number, col: number, piece: number, fields: number[][], pawnMoveDirection: number, result: Array<Move>, threats: number[][]) {
        if (piece == -1 || piece == 1)
            this.addCommonMovesForAPawn(row, col, fields, pawnMoveDirection, result, threats);
        else if (piece == -2 || piece == 2)
            this.addCommonMovesForARook(row, col, fields, result, threats);
        else if (piece == -3 || piece == 3)
            this.addCommonMovesForAKnight(row, col, fields, result, threats);
        else if (piece == -4 || piece == 4)
            this.addCommonMovesForABishop(row, col, fields, result, threats);
        else if (piece == -5 || piece == 5)
            this.addCommonMovesForAQueen(row, col, fields, result, threats);
        else if (piece == -6 || piece == 6)
            this.addCommonMovesForAKing(row, col, fields, result, threats);
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

    isTargetEmpty(toRow: number, toCol: number, fields: number[][]): boolean {
        var targetPiece: number = fields[toRow][toCol]
        if (targetPiece == 0)
            return true;
        return false
    }



    /** This method returns true if the move could be added to the list. */
    addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow: number, fromCol: number, toRow: number, toCol: number, sourcePiece: number, fields: number[][], result: Array<Move>, threats: number[][], promotion: number = 0) {
        if (fromRow < 0 || fromRow >= 8) return false;
        if (fromCol < 0 || fromCol >= 8) return false;
        if (toRow < 0 || toRow >= 8) return false;
        if (toCol < 0 || toCol >= 8) return false;
        if (this.isTargetEmptyOrCanBeCaptured(toRow, toCol, sourcePiece, fields)) {
            result.push(new Move(fromRow, fromCol, toRow, toCol, promotion, fields[toRow][toCol]))
            threats[toRow][toCol]++;
            return true;
        } else if (!this.isTargetEmpty(toRow, toCol, fields)) {
            threats[toRow][toCol]++; // increase the counter to indicate that the piece is protected
        }
        return false;
    }

    /** This method returns true if the move could be added to the list. */
    addMoveIfTargetIsEmpty(fromRow: number, fromCol: number, toRow: number, toCol: number, sourcePiece: number, fields: number[][], result: Array<Move>, threats: number[][], considerPromotion: boolean = false) {
        if (fromRow < 0 || fromRow >= 8) return false;
        if (fromCol < 0 || fromCol >= 8) return false;
        if (toRow < 0 || toRow >= 8) return false;
        if (toCol < 0 || toCol >= 8) return false;
        if (this.isTargetEmpty(toRow, toCol, fields)) {
            if (sourcePiece != 1 && sourcePiece != -1)
                threats[toRow][toCol]++; // pawn can't capture when they call this method, so they are no threat
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
    addMoveIfTargetCanBeCaptured(fromRow: number, fromCol: number, toRow: number, toCol: number, sourcePiece: number, fields: number[][], result: Array<Move>, threats: number[][], considerPromotion: boolean = false) {
        if (fromRow < 0 || fromRow >= 8) return false;
        if (fromCol < 0 || fromCol >= 8) return false;
        if (toRow < 0 || toRow >= 8) return false;
        if (toCol < 0 || toCol >= 8) return false;
        if (this.isTargetCanBeCaptured(toRow, toCol, sourcePiece, fields)) {
            threats[toRow][toCol]++;
            if (considerPromotion && (toRow == 0 || toRow == 7)) {
                result.push(new Move(fromRow, fromCol, toRow, toCol, 2, fields[toRow][toCol]))
                result.push(new Move(fromRow, fromCol, toRow, toCol, 3, fields[toRow][toCol]))
                result.push(new Move(fromRow, fromCol, toRow, toCol, 4, fields[toRow][toCol]))
                result.push(new Move(fromRow, fromCol, toRow, toCol, 5, fields[toRow][toCol]))
            } else
                result.push(new Move(fromRow, fromCol, toRow, toCol, 0, fields[toRow][toCol]))
            return true;
        } else if (!this.isTargetEmpty(toRow, toCol, fields)) {
            threats[toRow][toCol]++; // increase the counter to indicate that the piece is protected
        }

        return false;
    }

    addCommonMovesForAPawn(fromRow: number, fromCol: number, fields: number[][], pawnMoveDirection: number, result: Array<Move>, threats: number[][]) {
        var toCol = fromCol;
        var toRow = fromRow + pawnMoveDirection;
        var sourcePiece = fields[fromRow][fromCol]
        if (this.addMoveIfTargetIsEmpty(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats, true)) {
            if (sourcePiece > 0 && fromRow == 6) { //white initial pawn double move
                toRow = toRow + pawnMoveDirection;
                this.addMoveIfTargetIsEmpty(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)
            } else if (sourcePiece < 0 && fromRow == 1) { // black initial pawn double move
                toRow = toRow + pawnMoveDirection;
                this.addMoveIfTargetIsEmpty(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)
            }
        }
        toCol = fromCol + 1;
        toRow = fromRow + pawnMoveDirection;
        this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats, true)
        if (this.isTargetEmpty(toRow, toCol, fields)) {
            threats[toRow][toCol]++
        }

        toCol = fromCol - 1;
        toRow = fromRow + pawnMoveDirection;
        this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats, true)
        if (this.isTargetEmpty(toRow, toCol, fields)) {
            threats[toRow][toCol]++
        }

        if (this.chessboard.enPassantCol >= 0) {
            if (sourcePiece == 1) { // white
                if (fromRow == 3) {
                    if (fromCol == this.chessboard.enPassantCol + 1)
                        this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow - 1, this.chessboard.enPassantCol, sourcePiece, fields, result, threats)
                    else if (fromCol == this.chessboard.enPassantCol - 1)
                        this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow - 1, this.chessboard.enPassantCol, sourcePiece, fields, result, threats)
                }
            } else if (sourcePiece == -1) { // black
                if (fromRow == 4) {
                    if (fromCol == this.chessboard.enPassantCol + 1)
                        this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow + 1, this.chessboard.enPassantCol, sourcePiece, fields, result, threats)
                    else if (fromCol == this.chessboard.enPassantCol - 1)
                        this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow + 1, this.chessboard.enPassantCol, sourcePiece, fields, result, threats)
                }
            }
        }

        // To do: casting when the pawn reaches the last line
    }

    addCommonMovesForAKnight(fromRow: number, fromCol: number, fields: number[][], result: Array<Move>, threats: number[][]) {
        var toCol = fromCol + 1;
        var toRow = fromRow + 2;
        var sourcePiece = fields[fromRow][fromCol]
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)
        toCol = fromCol + 2;
        toRow = fromRow + 1;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)
        toCol = fromCol - 1;
        toRow = fromRow + 2;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)
        toCol = fromCol - 2;
        toRow = fromRow + 1;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)
        toCol = fromCol + 1;
        toRow = fromRow - 2;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)
        toCol = fromCol + 2;
        toRow = fromRow - 1;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)
        toCol = fromCol - 1;
        toRow = fromRow - 2;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)
        toCol = fromCol - 2;
        toRow = fromRow - 1;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)

    }

    addCommonMovesForABishop(fromRow: number, fromCol: number, fields: number[][], result: Array<Move>, threats: number[][]) {
        var toCol = fromCol;
        var toRow = fromRow;
        var sourcePiece = fields[fromRow][fromCol]
        while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, ++toRow, ++toCol, sourcePiece, fields, result, threats)) { }
        this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)

        toCol = fromCol;
        toRow = fromRow;
        while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, --toRow, ++toCol, sourcePiece, fields, result, threats)) { }
        this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)

        toCol = fromCol;
        toRow = fromRow;
        while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, ++toRow, --toCol, sourcePiece, fields, result, threats)) { }
        this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)

        toCol = fromCol;
        toRow = fromRow;
        while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, --toRow, --toCol, sourcePiece, fields, result, threats)) { }
        this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)
    }

    addCommonMovesForARook(fromRow: number, fromCol: number, fields: number[][], result: Array<Move>, threats: number[][]) {
        var toCol = fromCol;
        var toRow = fromRow;
        var sourcePiece = fields[fromRow][fromCol]
        while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, ++toRow, toCol, sourcePiece, fields, result, threats)) { }
        this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)

        toCol = fromCol;
        toRow = fromRow;
        while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, --toRow, toCol, sourcePiece, fields, result, threats)) { }
        this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)

        toCol = fromCol;
        toRow = fromRow;
        while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, toRow, ++toCol, sourcePiece, fields, result, threats)) { }
        this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)

        toCol = fromCol;
        toRow = fromRow;
        while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, toRow, --toCol, sourcePiece, fields, result, threats)) { }
        this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)
    }

    addCommonMovesForAQueen(fromRow: number, fromCol: number, fields: number[][], result: Array<Move>, threats: number[][]) {
        this.addCommonMovesForABishop(fromRow, fromCol, fields, result, threats);
        this.addCommonMovesForARook(fromRow, fromCol, fields, result, threats);
    }
    addCommonMovesForAKing(fromRow: number, fromCol: number, fields: number[][], result: Array<Move>, threats: number[][]) {
        var toCol = fromCol;
        var toRow = fromRow + 1;
        var sourcePiece = fields[fromRow][fromCol]
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)
        toCol = fromCol + 1;
        toRow = fromRow + 1;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)
        toCol = fromCol - 1;
        toRow = fromRow + 1;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)
        toCol = fromCol + 1;
        toRow = fromRow;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)
        toCol = fromCol - 1;
        toRow = fromRow;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)
        toCol = fromCol - 1;
        toRow = fromRow - 1;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)
        toCol = fromCol;
        toRow = fromRow - 1;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)
        toCol = fromCol + 1;
        toRow = fromRow - 1;
        this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats)

        // castling
        if (sourcePiece > 0) { // white is playing
            if ((!this.chessboard.whiteKingHasMoved) && (!this.chessboard.whiteLeftRookHasMoved)) {
                if (this.isTargetEmpty(fromRow, fromCol - 1, fields))
                    if (this.isTargetEmpty(fromRow, fromCol - 3, fields))
                        this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow, fromCol - 2, sourcePiece, fields, result, threats)
            }
            if ((!this.chessboard.whiteKingHasMoved) && (!this.chessboard.whiteRightRookHasMoved)) {
                if (this.isTargetEmpty(fromRow, fromCol + 1, fields))
                    this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow, fromCol + 2, sourcePiece, fields, result, threats)
            }
        } else { // black is playing
            if ((!this.chessboard.blackKingHasMoved) && (!this.chessboard.blackLeftRookHasMoved)) {
                if (this.isTargetEmpty(fromRow, fromCol - 1, fields))
                    if (this.isTargetEmpty(fromRow, fromCol - 3, fields))
                        this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow, fromCol - 2, sourcePiece, fields, result, threats)
            }
            if ((!this.chessboard.blackKingHasMoved) && (!this.chessboard.blackRightRookHasMoved)) {
                if (this.isTargetEmpty(fromRow, fromCol + 1, fields))
                    this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow, fromCol + 2, sourcePiece, fields, result, threats)
            }
        }
    }
}
