define(["require", "exports", './move', './evaluator'], function (require, exports, move_1, evaluator_1) {
    var Moves = (function () {
        function Moves(chessboard) {
            this.chessboard = chessboard;
            this._legalMoves = null;
            this._legalOpponentMoves = null;
            this._ownThreats = null;
            this._opponentThreats = null;
            this.check = false;
            this.checkMate = false;
            this.staleMate = false;
            this.ownCheck = false;
            this.ownCheckMate = false;
            this.calculateLegalMoves();
        }
        Object.defineProperty(Moves.prototype, "legalMoves", {
            get: function () {
                this.calculateLegalMoves();
                return this._legalMoves;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Moves.prototype, "legalOpponentMoves", {
            get: function () {
                this.calculateLegalMoves();
                return this._legalOpponentMoves;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Moves.prototype, "ownThreats", {
            get: function () {
                this.calculateLegalMoves();
                return this._ownThreats;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Moves.prototype, "opponentThreats", {
            get: function () {
                this.calculateLegalMoves();
                return this._opponentThreats;
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
            var _this = this;
            if (null == this._legalMoves) {
                var result = new Array();
                var opponentResult = new Array();
                var ownThreats = [
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0]
                ];
                var opponentThreats = [
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0]
                ];
                var ownKingRow;
                var ownKingCol;
                var opponentKingRow;
                var opponentKingCol;
                for (var row = 0; row < this.chessboard.fields.length; row++) {
                    var currentRow = this.chessboard.fields[row];
                    for (var col = 0; col < currentRow.length; col++) {
                        var piece = this.chessboard.fields[row][col];
                        if (this.chessboard.isWhitePlaying) {
                            if (piece > 0)
                                this.addWhiteMoves(row, col, piece, this.chessboard.fields, result, ownThreats);
                            else if (piece < 0)
                                this.addBlackMoves(row, col, piece, this.chessboard.fields, opponentResult, opponentThreats);
                            if (piece == 6) {
                                ownKingRow = row;
                                ownKingCol = col;
                            }
                            else if (piece == -6) {
                                opponentKingRow = row;
                                opponentKingCol = col;
                            }
                        }
                        else {
                            if (piece < 0)
                                this.addBlackMoves(row, col, piece, this.chessboard.fields, result, ownThreats);
                            else if (piece > 0)
                                this.addWhiteMoves(row, col, piece, this.chessboard.fields, opponentResult, opponentThreats);
                            if (piece == -6) {
                                ownKingRow = row;
                                ownKingCol = col;
                            }
                            else if (piece == 6) {
                                opponentKingRow = row;
                                opponentKingCol = col;
                            }
                        }
                    }
                }
                result = result.filter(function (move) { return !_this.kingInChessAfterMove(move, ownKingRow, ownKingCol, opponentThreats); });
                opponentResult = opponentResult.filter(function (move) { return !_this.kingInChessAfterMove(move, opponentKingRow, opponentKingCol, ownThreats); });
                var whiteThreats = this.chessboard.isWhitePlaying ? ownThreats : opponentThreats;
                var blackThreats = this.chessboard.isWhitePlaying ? opponentThreats : ownThreats;
                result.forEach(function (move) {
                    _this.chessboard.moveInternally(move.fromRow, move.fromCol, move.toRow, move.toCol, move.promotion);
                    move.value = evaluator_1.Evaluator.evaluatePosition(_this.chessboard.fields, whiteThreats, blackThreats, _this.chessboard.isWhitePlaying);
                    _this.chessboard.revertLastMoveInternally();
                });
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
                        this.ownCheckMate = true;
                    this.ownCheck = true;
                }
                if (ownThreats[opponentKingRow][opponentKingCol]) {
                    if (this._legalOpponentMoves.length == 0)
                        this.checkMate = true;
                    this.check = true;
                }
                if (result.length == 0) {
                    this.staleMate = true;
                }
            }
        };
        Moves.prototype.kingInChessAfterMove = function (move, kingRow, kingCol, opponentThreats) {
            if (move.fromRow == kingRow && move.fromCol == kingCol) {
                if (opponentThreats[move.toRow][move.toCol] > 0)
                    return true;
                else
                    return false;
            }
            if (opponentThreats[kingRow][kingCol] == 0)
                return false;
            if (opponentThreats[kingRow][kingCol] > 1)
                return true;
            if (move.capture == 0) {
                return true;
            }
            return false;
        };
        Moves.prototype.addWhiteMoves = function (row, col, piece, fields, result, threats) {
            this.addCommonMoves(row, col, piece, fields, -1, result, threats);
        };
        Moves.prototype.addBlackMoves = function (row, col, piece, fields, result, threats) {
            this.addCommonMoves(row, col, piece, fields, 1, result, threats);
        };
        Moves.prototype.addCommonMoves = function (row, col, piece, fields, pawnMoveDirection, result, threats) {
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
        Moves.prototype.addMoveIfTargetIsEmptyOrCanBeCaptured = function (fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats, promotion) {
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
                threats[toRow][toCol]++;
                return true;
            }
            else if (!this.isTargetEmpty(toRow, toCol, sourcePiece, fields)) {
                threats[toRow][toCol]++;
            }
            return false;
        };
        Moves.prototype.addMoveIfTargetIsEmpty = function (fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats, considerPromotion) {
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
                if (sourcePiece != 1 && sourcePiece != -1)
                    threats[toRow][toCol]++;
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
        Moves.prototype.addMoveIfTargetCanBeCaptured = function (fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats, considerPromotion) {
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
                threats[toRow][toCol]++;
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
            else if (!this.isTargetEmpty(toRow, toCol, sourcePiece, fields)) {
                threats[toRow][toCol]++;
            }
            return false;
        };
        Moves.prototype.addCommonMovesForAPawn = function (fromRow, fromCol, fields, pawnMoveDirection, result, threats) {
            var toCol = fromCol;
            var toRow = fromRow + pawnMoveDirection;
            var sourcePiece = fields[fromRow][fromCol];
            if (this.addMoveIfTargetIsEmpty(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats, true)) {
                if (sourcePiece > 0 && fromRow == 6) {
                    toRow = toRow + pawnMoveDirection;
                    this.addMoveIfTargetIsEmpty(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
                }
                else if (sourcePiece < 0 && fromRow == 1) {
                    toRow = toRow + pawnMoveDirection;
                    this.addMoveIfTargetIsEmpty(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
                }
            }
            toCol = fromCol + 1;
            toRow = fromRow + pawnMoveDirection;
            this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats, true);
            if (this.isTargetEmpty(toRow, toCol, sourcePiece, fields)) {
                threats[toRow][toCol]++;
            }
            toCol = fromCol - 1;
            toRow = fromRow + pawnMoveDirection;
            this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats, true);
            if (this.isTargetEmpty(toRow, toCol, sourcePiece, fields)) {
                threats[toRow][toCol]++;
            }
            if (this.chessboard.enPassantCol >= 0) {
                if (sourcePiece == 1) {
                    if (fromRow == 3) {
                        if (fromCol == this.chessboard.enPassantCol + 1)
                            this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow - 1, this.chessboard.enPassantCol, sourcePiece, fields, result, threats);
                        else if (fromCol == this.chessboard.enPassantCol - 1)
                            this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow - 1, this.chessboard.enPassantCol, sourcePiece, fields, result, threats);
                    }
                }
                else if (sourcePiece == -1) {
                    if (fromRow == 4) {
                        if (fromCol == this.chessboard.enPassantCol + 1)
                            this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow + 1, this.chessboard.enPassantCol, sourcePiece, fields, result, threats);
                        else if (fromCol == this.chessboard.enPassantCol - 1)
                            this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow + 1, this.chessboard.enPassantCol, sourcePiece, fields, result, threats);
                    }
                }
            }
        };
        Moves.prototype.addCommonMovesForAKnight = function (fromRow, fromCol, fields, result, threats) {
            var toCol = fromCol + 1;
            var toRow = fromRow + 2;
            var sourcePiece = fields[fromRow][fromCol];
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
            toCol = fromCol + 2;
            toRow = fromRow + 1;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
            toCol = fromCol - 1;
            toRow = fromRow + 2;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
            toCol = fromCol - 2;
            toRow = fromRow + 1;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
            toCol = fromCol + 1;
            toRow = fromRow - 2;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
            toCol = fromCol + 2;
            toRow = fromRow - 1;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
            toCol = fromCol - 1;
            toRow = fromRow - 2;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
            toCol = fromCol - 2;
            toRow = fromRow - 1;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
        };
        Moves.prototype.addCommonMovesForABishop = function (fromRow, fromCol, fields, result, threats) {
            var toCol = fromCol;
            var toRow = fromRow;
            var sourcePiece = fields[fromRow][fromCol];
            while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, ++toRow, ++toCol, sourcePiece, fields, result, threats)) { }
            this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
            toCol = fromCol;
            toRow = fromRow;
            while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, --toRow, ++toCol, sourcePiece, fields, result, threats)) { }
            this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
            toCol = fromCol;
            toRow = fromRow;
            while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, ++toRow, --toCol, sourcePiece, fields, result, threats)) { }
            this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
            toCol = fromCol;
            toRow = fromRow;
            while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, --toRow, --toCol, sourcePiece, fields, result, threats)) { }
            this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
        };
        Moves.prototype.addCommonMovesForARook = function (fromRow, fromCol, fields, result, threats) {
            var toCol = fromCol;
            var toRow = fromRow;
            var sourcePiece = fields[fromRow][fromCol];
            while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, ++toRow, toCol, sourcePiece, fields, result, threats)) { }
            this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
            toCol = fromCol;
            toRow = fromRow;
            while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, --toRow, toCol, sourcePiece, fields, result, threats)) { }
            this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
            toCol = fromCol;
            toRow = fromRow;
            while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, toRow, ++toCol, sourcePiece, fields, result, threats)) { }
            this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
            toCol = fromCol;
            toRow = fromRow;
            while (this.addMoveIfTargetIsEmpty(fromRow, fromCol, toRow, --toCol, sourcePiece, fields, result, threats)) { }
            this.addMoveIfTargetCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
        };
        Moves.prototype.addCommonMovesForAQueen = function (fromRow, fromCol, fields, result, threats) {
            this.addCommonMovesForABishop(fromRow, fromCol, fields, result, threats);
            this.addCommonMovesForARook(fromRow, fromCol, fields, result, threats);
        };
        Moves.prototype.addCommonMovesForAKing = function (fromRow, fromCol, fields, result, threats) {
            var toCol = fromCol;
            var toRow = fromRow + 1;
            var sourcePiece = fields[fromRow][fromCol];
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
            toCol = fromCol + 1;
            toRow = fromRow + 1;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
            toCol = fromCol - 1;
            toRow = fromRow + 1;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
            toCol = fromCol + 1;
            toRow = fromRow;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
            toCol = fromCol - 1;
            toRow = fromRow;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
            toCol = fromCol - 1;
            toRow = fromRow - 1;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
            toCol = fromCol;
            toRow = fromRow - 1;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
            toCol = fromCol + 1;
            toRow = fromRow - 1;
            this.addMoveIfTargetIsEmptyOrCanBeCaptured(fromRow, fromCol, toRow, toCol, sourcePiece, fields, result, threats);
            if (sourcePiece > 0) {
                if ((!this.chessboard.whiteKingHasMoved) && (!this.chessboard.whiteLeftRookHasMoved)) {
                    if (this.isTargetEmpty(fromRow, fromCol - 1, sourcePiece, fields))
                        if (this.isTargetEmpty(fromRow, fromCol - 3, sourcePiece, fields))
                            this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow, fromCol - 2, sourcePiece, fields, result, threats);
                }
                if ((!this.chessboard.whiteKingHasMoved) && (!this.chessboard.whiteRightRookHasMoved)) {
                    if (this.isTargetEmpty(fromRow, fromCol + 1, sourcePiece, fields))
                        this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow, fromCol + 2, sourcePiece, fields, result, threats);
                }
            }
            else {
                if ((!this.chessboard.blackKingHasMoved) && (!this.chessboard.blackLeftRookHasMoved)) {
                    if (this.isTargetEmpty(fromRow, fromCol - 1, sourcePiece, fields))
                        if (this.isTargetEmpty(fromRow, fromCol - 3, sourcePiece, fields))
                            this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow, fromCol - 2, sourcePiece, fields, result, threats);
                }
                if ((!this.chessboard.blackKingHasMoved) && (!this.chessboard.blackRightRookHasMoved)) {
                    if (this.isTargetEmpty(fromRow, fromCol + 1, sourcePiece, fields))
                        this.addMoveIfTargetIsEmpty(fromRow, fromCol, fromRow, fromCol + 2, sourcePiece, fields, result, threats);
                }
            }
        };
        return Moves;
    })();
    exports.Moves = Moves;
});
//# sourceMappingURL=moves.js.map