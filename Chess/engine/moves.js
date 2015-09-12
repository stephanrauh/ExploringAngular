define(["require", "exports", './move'], function (require, exports, move_1) {
    var Moves = (function () {
        function Moves(chessboard) {
            this.chessboard = chessboard;
            this._legalMoves = null;
        }
        Object.defineProperty(Moves.prototype, "legalMoves", {
            get: function () {
                this.calculateLegalMoves();
                return this._legalMoves;
            },
            enumerable: true,
            configurable: true
        });
        Moves.prototype.isLegalMove = function (fromRow, fromCol, toRow, toCol) {
            this.calculateLegalMoves();
            for (var index in this._legalMoves) {
                var move = this._legalMoves[index];
                if (move.fromRow == fromRow && move.fromCol == fromCol && move.toRow == toRow && move.toCol == toCol)
                    return true;
            }
            return false;
        };
        Moves.prototype.calculateLegalMoves = function () {
            if (null == this._legalMoves) {
                var result = new Array();
                for (var row = 0; row < this.chessboard.fields.length; row++) {
                    var currentRow = this.chessboard.fields[row];
                    for (var col = 0; col < currentRow.length; col++) {
                        var piece = this.chessboard.fields[row][col];
                        if (this.chessboard.isWhitePlaying) {
                            if (piece > 0)
                                this.addWhiteMoves(row, col, piece, this.chessboard.fields, result);
                        }
                        else if (piece < 0)
                            this.addBlackMoves(row, col, piece, this.chessboard.fields, result);
                    }
                }
                this._legalMoves = result;
            }
        };
        Moves.prototype.addWhiteMoves = function (row, col, piece, fields, result) {
            this.addCommonMoves(row, col, piece, fields, -1, result);
        };
        Moves.prototype.addBlackMoves = function (row, col, piece, fields, result) {
            this.addCommonMoves(row, col, piece, fields, 1, result);
        };
        Moves.prototype.addCommonMoves = function (row, col, piece, fields, pawnMoveDirection, result) {
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
        };
        Moves.prototype.isTargetEmptyOrCanBeCaptured = function (toRow, toCol, sourcePiece, fields) {
            var targetPiece = fields[toRow][toCol];
            if (sourcePiece > 0 && targetPiece <= 0)
                return true;
            if (sourcePiece < 0 && targetPiece >= 0)
                return true;
            return false;
        };
        Moves.prototype.isTargetCanBeCaptured = function (toRow, toCol, sourcePiece, fields) {
            var targetPiece = fields[toRow][toCol];
            if (sourcePiece > 0 && targetPiece < 0)
                return true;
            if (sourcePiece < 0 && targetPiece > 0)
                return true;
            return false;
        };
        Moves.prototype.isTargetEmpty = function (toRow, toCol, sourcePiece, fields) {
            var targetPiece = fields[toRow][toCol];
            if (targetPiece == 0)
                return true;
            return false;
        };
        Moves.prototype.addMoveIfTargetIsEmptyOrCanBeCaptured = function (fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, promotion) {
            if (promotion === void 0) { promotion = 0; }
            if (fromRow < 0 || fromRow >= 8)
                return false;
            if (fromCol < 0 || fromCol >= 8)
                return false;
            if (toRow < 0 || toRow >= 8)
                return false;
            if (toCol < 0 || toCol >= 8)
                return false;
            if (this.isTargetEmptyOrCanBeCaptured(toRow, toCol, sourcePiece, fields)) {
                result.push(new move_1.Move(fromRow, fromCol, toRow, toCol, promotion, fields[toRow][toCol]));
                return true;
            }
            return false;
        };
        Moves.prototype.addMoveIfTargetIsEmpty = function (fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, considerPromotion) {
            if (considerPromotion === void 0) { considerPromotion = false; }
            if (fromRow < 0 || fromRow >= 8)
                return false;
            if (fromCol < 0 || fromCol >= 8)
                return false;
            if (toRow < 0 || toRow >= 8)
                return false;
            if (toCol < 0 || toCol >= 8)
                return false;
            if (this.isTargetEmpty(toRow, toCol, sourcePiece, fields)) {
                if (considerPromotion && (toRow == 0 || toRow == 7)) {
                    result.push(new move_1.Move(fromRow, fromCol, toRow, toCol, 2, fields[toRow][toCol]));
                    result.push(new move_1.Move(fromRow, fromCol, toRow, toCol, 3, fields[toRow][toCol]));
                    result.push(new move_1.Move(fromRow, fromCol, toRow, toCol, 4, fields[toRow][toCol]));
                    result.push(new move_1.Move(fromRow, fromCol, toRow, toCol, 5, fields[toRow][toCol]));
                }
                else
                    result.push(new move_1.Move(fromRow, fromCol, toRow, toCol, 0, fields[toRow][toCol]));
                return true;
            }
            return false;
        };
        Moves.prototype.addMoveIfTargetCanBeCaptured = function (fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, considerPromotion) {
            if (considerPromotion === void 0) { considerPromotion = false; }
            if (fromRow < 0 || fromRow >= 8)
                return false;
            if (fromCol < 0 || fromCol >= 8)
                return false;
            if (toRow < 0 || toRow >= 8)
                return false;
            if (toCol < 0 || toCol >= 8)
                return false;
            if (this.isTargetCanBeCaptured(toRow, toCol, sourcePiece, fields)) {
                if (considerPromotion && (toRow == 0 || toRow == 7)) {
                    result.push(new move_1.Move(fromRow, fromCol, toRow, toCol, 2, fields[toRow][toCol]));
                    result.push(new move_1.Move(fromRow, fromCol, toRow, toCol, 3, fields[toRow][toCol]));
                    result.push(new move_1.Move(fromRow, fromCol, toRow, toCol, 4, fields[toRow][toCol]));
                    result.push(new move_1.Move(fromRow, fromCol, toRow, toCol, 5, fields[toRow][toCol]));
                }
                else
                    result.push(new move_1.Move(fromRow, fromCol, toRow, toCol, 0, fields[toRow][toCol]));
                return true;
            }
            return false;
        };
        Moves.prototype.addCommonMovesForAPawn = function (fromRow, fromCol, fields, pawnMoveDirection, result) {
            var toCol = fromCol;
            var toRow = fromRow + pawnMoveDirection;
            var sourcePiece = fields[fromRow][fromCol];
            if (this.addMoveIfTargetIsEmpty(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, true)) {
                if (sourcePiece > 0 && fromRow == 6) {
                    toRow = toRow + pawnMoveDirection;
                    this.addMoveIfTargetIsEmpty(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
                }
                else if (sourcePiece < 0 && fromRow == 1) {
                    toRow = toRow + pawnMoveDirection;
                    this.addMoveIfTargetIsEmpty(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
                }
            }
            toCol = fromCol + 1;
            toRow = fromRow + pawnMoveDirection;
            this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, true);
            toCol = fromCol - 1;
            toRow = fromRow + pawnMoveDirection;
            this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, true);
            if (this.chessboard.enPassantCol >= 0) {
                if (sourcePiece == 1) {
                    if (fromRow == 3) {
                        if (fromCol == this.chessboard.enPassantCol + 1)
                            this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow - 1, this.chessboard.enPassantCol, sourcePiece, fields, result);
                        else if (fromCol == this.chessboard.enPassantCol - 1)
                            this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow - 1, this.chessboard.enPassantCol, sourcePiece, fields, result);
                    }
                }
                else if (sourcePiece == -1) {
                    if (fromRow == 4) {
                        if (fromCol == this.chessboard.enPassantCol + 1)
                            this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow + 1, this.chessboard.enPassantCol, sourcePiece, fields, result);
                        else if (fromCol == this.chessboard.enPassantCol - 1)
                            this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow + 1, this.chessboard.enPassantCol, sourcePiece, fields, result);
                    }
                }
            }
        };
        Moves.prototype.addCommonMovesForAKnight = function (fromRow, fromCol, fields, result) {
            var toCol = fromCol + 1;
            var toRow = fromRow + 2;
            var sourcePiece = fields[fromRow][fromCol];
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
            toCol = fromCol + 2;
            toRow = fromRow + 1;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
            toCol = fromCol - 1;
            toRow = fromRow + 2;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
            toCol = fromCol - 2;
            toRow = fromRow + 1;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
            toCol = fromCol + 1;
            toRow = fromRow - 2;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
            toCol = fromCol + 2;
            toRow = fromRow - 1;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
            toCol = fromCol - 1;
            toRow = fromRow - 2;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
            toCol = fromCol - 2;
            toRow = fromRow - 1;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
        };
        Moves.prototype.addCommonMovesForABishop = function (fromRow, fromCol, fields, result) {
            var toCol = fromCol;
            var toRow = fromRow;
            var sourcePiece = fields[fromRow][fromCol];
            while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, ++toRow, ++toCol, sourcePiece, fields, result)) { }
            this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
            toCol = fromCol;
            toRow = fromRow;
            while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, --toRow, ++toCol, sourcePiece, fields, result)) { }
            this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
            toCol = fromCol;
            toRow = fromRow;
            while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, ++toRow, --toCol, sourcePiece, fields, result)) { }
            this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
            toCol = fromCol;
            toRow = fromRow;
            while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, --toRow, --toCol, sourcePiece, fields, result)) { }
            this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
        };
        Moves.prototype.addCommonMovesForARook = function (fromRow, fromCol, fields, result) {
            var toCol = fromCol;
            var toRow = fromRow;
            var sourcePiece = fields[fromRow][fromCol];
            while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, ++toRow, toCol, sourcePiece, fields, result)) { }
            this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
            toCol = fromCol;
            toRow = fromRow;
            while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, --toRow, toCol, sourcePiece, fields, result)) { }
            this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
            toCol = fromCol;
            toRow = fromRow;
            while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, toRow, ++toCol, sourcePiece, fields, result)) { }
            this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
            toCol = fromCol;
            toRow = fromRow;
            while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, toRow, --toCol, sourcePiece, fields, result)) { }
            this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
        };
        Moves.prototype.addCommonMovesForAQueen = function (fromRow, fromCol, fields, result) {
            this.addCommonMovesForABishop(fromRow, fromCol, fields, result);
            this.addCommonMovesForARook(fromRow, fromCol, fields, result);
        };
        Moves.prototype.addCommonMovesForAKing = function (fromRow, fromCol, fields, result) {
            var toCol = fromCol;
            var toRow = fromRow + 1;
            var sourcePiece = fields[fromRow][fromCol];
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
            toCol = fromCol + 1;
            toRow = fromRow + 1;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
            toCol = fromCol - 1;
            toRow = fromRow + 1;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
            toCol = fromCol + 1;
            toRow = fromRow;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
            toCol = fromCol - 1;
            toRow = fromRow;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
            toCol = fromCol - 1;
            toRow = fromRow - 1;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
            toCol = fromCol;
            toRow = fromRow - 1;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
            toCol = fromCol + 1;
            toRow = fromRow - 1;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result);
            if (sourcePiece > 0) {
                if ((!this.chessboard.whiteKingHasMoved) && (!this.chessboard.whiteLeftRookHasMoved)) {
                    if (this.isTargetEmpty(fromRow, fromCol - 1, sourcePiece, fields))
                        if (this.isTargetEmpty(fromRow, fromCol - 3, sourcePiece, fields))
                            this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow, fromCol - 2, sourcePiece, fields, result);
                }
                if ((!this.chessboard.whiteKingHasMoved) && (!this.chessboard.whiteRightRookHasMoved)) {
                    if (this.isTargetEmpty(fromRow, fromCol + 1, sourcePiece, fields))
                        this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow, fromCol + 2, sourcePiece, fields, result);
                }
            }
            else {
                if ((!this.chessboard.blackKingHasMoved) && (!this.chessboard.blackLeftRookHasMoved)) {
                    if (this.isTargetEmpty(fromRow, fromCol - 1, sourcePiece, fields))
                        if (this.isTargetEmpty(fromRow, fromCol - 3, sourcePiece, fields))
                            this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow, fromCol - 2, sourcePiece, fields, result);
                }
                if ((!this.chessboard.blackKingHasMoved) && (!this.chessboard.blackRightRookHasMoved)) {
                    if (this.isTargetEmpty(fromRow, fromCol + 1, sourcePiece, fields))
                        this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow, fromCol + 2, sourcePiece, fields, result);
                }
            }
        };
        return Moves;
    })();
    exports.Moves = Moves;
});
//# sourceMappingURL=moves.js.map