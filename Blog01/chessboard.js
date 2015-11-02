define(["require", "exports", './move', './moves'], function (require, exports, move_1, moves_1) {
    var Chessboard = (function () {
        function Chessboard(moveHistory, executeMove) {
            if (executeMove === void 0) { executeMove = false; }
            this.moveHistory = moveHistory;
            this._fields = [
                [-2, -3, -4, -5, -6, -4, -3, -2],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [2, 3, 4, 5, 6, 4, 3, 2]
            ];
            this.capturedPieces = new Array();
            this._isWhitePlaying = true;
            this.whiteKingHasMoved = false;
            this.whiteLeftRookHasMoved = false;
            this.whiteRightRookHasMoved = false;
            this.blackKingHasMoved = false;
            this.blackLeftRookHasMoved = false;
            this.blackRightRookHasMoved = false;
            this.enPassantCol = -1;
            this._moves = new moves_1.Moves(this);
        }
        Object.defineProperty(Chessboard.prototype, "moves", {
            get: function () { return this._moves; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Chessboard.prototype, "check", {
            get: function () { return this._moves.check; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Chessboard.prototype, "checkMate", {
            get: function () { return this._moves.checkMate; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Chessboard.prototype, "staleMate", {
            get: function () { return this._moves.staleMate; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Chessboard.prototype, "ownCheck", {
            get: function () { return this._moves.ownCheck; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Chessboard.prototype, "ownCheckMate", {
            get: function () { return this._moves.ownCheckMate; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Chessboard.prototype, "isWhitePlaying", {
            get: function () { return this._isWhitePlaying; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Chessboard.prototype, "fields", {
            get: function () {
                return this._fields;
            },
            enumerable: true,
            configurable: true
        });
        Chessboard.prototype.ownThreats = function (row, col) {
            return this._moves.ownThreats[row][col];
        };
        Chessboard.prototype.opponentThreats = function (row, col) {
            return this._moves.opponentThreats[row][col];
        };
        Chessboard.prototype.isLegalMove = function (fromRow, fromCol, toRow, toCol) {
            var piece = this.fields[fromRow][fromCol];
            if (this.isWhitePlaying) {
                if (piece < 0)
                    return false;
            }
            else {
                if (piece > 0)
                    return false;
            }
            var targetPiece = this.fields[toRow][toCol];
            if (this.isWhitePlaying) {
                if (targetPiece > 0)
                    return false;
            }
            else {
                if (targetPiece < 0)
                    return false;
            }
            if (targetPiece > 0 && piece > 0)
                return false;
            if (targetPiece < 0 && piece < 0)
                return false;
            return this._moves.isLegalMove(fromRow, fromCol, toRow, toCol);
        };
        Chessboard.prototype.moveInternally = function (fromRow, fromCol, toRow, toCol, promotion) {
            var original_whiteKingHasMoved = this.whiteKingHasMoved;
            var original_whiteLeftRookHasMoved = this.whiteLeftRookHasMoved;
            var original_whiteRightRookHasMoved = this.whiteRightRookHasMoved;
            var original_blackKingHasMoved = this.blackKingHasMoved;
            var original_blackLeftRookHasMoved = this.blackLeftRookHasMoved;
            var original_blackRightRookHasMoved = this.blackRightRookHasMoved;
            var original_enPassantCol = this.enPassantCol;
            var piece = this.fields[fromRow][fromCol];
            var targetPiece = this.fields[toRow][toCol];
            var captureRow = toRow;
            this.fields[fromRow][fromCol] = 0;
            this.fields[toRow][toCol] = piece;
            this._isWhitePlaying = !this._isWhitePlaying;
            if (piece == 1 && fromRow == 1 && toRow == 0) {
                this.fields[toRow][toCol] = promotion;
            }
            else if (piece == -1 && fromRow == 6 && toRow == 7) {
                this.fields[toRow][toCol] = promotion;
            }
            else
                promotion = 0;
            this.enPassantCol = -1;
            if (piece == 1 && fromRow - toRow == 2) {
                this.enPassantCol = toCol;
            }
            if ((piece == 1 || piece == -1) && targetPiece == 0 && fromCol != toCol) {
                targetPiece = this.fields[fromRow][toCol];
                this.fields[fromRow][toCol] = 0;
                captureRow = fromRow;
            }
            var secondColFrom = -1;
            var secondColTo = -1;
            if (piece == -1 && fromRow - toRow == -2) {
                this.enPassantCol = toCol;
            }
            if (piece == 6) {
                this.whiteKingHasMoved = true;
                if (fromCol - toCol == 2) {
                    this.fields[fromRow][0] = 0;
                    this.fields[fromRow][3] = 2;
                    secondColFrom = 0;
                    secondColTo = 3;
                }
                else if (fromCol - toCol == -2) {
                    this.fields[fromRow][7] = 0;
                    this.fields[fromRow][5] = 2;
                    secondColFrom = 7;
                    secondColTo = 5;
                }
            }
            if (piece == -6) {
                this.blackKingHasMoved = true;
                if (fromCol - toCol == 2) {
                    this.fields[fromRow][0] = 0;
                    this.fields[fromRow][3] = -2;
                    secondColFrom = 0;
                    secondColTo = 3;
                }
                else if (fromCol - toCol == -2) {
                    this.fields[fromRow][7] = 0;
                    this.fields[fromRow][5] = -2;
                    secondColFrom = 7;
                    secondColTo = 5;
                }
            }
            if (piece == 2 && fromRow == 7 && fromCol == 0)
                this.whiteLeftRookHasMoved = true;
            if (piece == 2 && fromRow == 7 && fromCol == 7)
                this.whiteRightRookHasMoved = true;
            if (piece == -2 && fromRow == 0 && fromCol == 0)
                this.blackLeftRookHasMoved = true;
            if (piece == -2 && fromRow == 0 && fromCol == 7)
                this.blackRightRookHasMoved = true;
            this.moveHistory.push(new move_1.Move(fromRow, fromCol, toRow, toCol, promotion, targetPiece, original_whiteKingHasMoved, original_whiteLeftRookHasMoved, original_whiteRightRookHasMoved, original_blackKingHasMoved, original_blackLeftRookHasMoved, original_blackRightRookHasMoved, original_enPassantCol, captureRow, secondColFrom, secondColTo, this._moves));
            return targetPiece;
        };
        Chessboard.prototype.move = function (fromRow, fromCol, toRow, toCol, promotion) {
            var targetPiece = this.moveInternally(fromRow, fromCol, toRow, toCol, promotion);
            this.recalculateLegalMovesAndCheck();
            var move = this.moveHistory[this.moveHistory.length - 1];
            move.check = this._moves.ownCheck;
            move.checkMate = this._moves.ownCheckMate;
            move.staleMate = this._moves.staleMate;
            if (0 != targetPiece) {
                this.capturedPieces.push(targetPiece);
            }
            this.recalculateLegalMovesAndCheck();
        };
        Chessboard.prototype.recalculateLegalMovesAndCheck = function () {
            this._moves = new moves_1.Moves(this);
        };
        Chessboard.prototype.revertLastMoveInternally = function () {
            if (this.moveHistory.length == 0) {
                alert("Nothing to revert!");
            }
            else {
                var lastMove = this.moveHistory.pop();
                var piece = this.fields[lastMove.toRow][lastMove.toCol];
                if (lastMove.promotion > 1) {
                    if (piece > 0)
                        piece = 1;
                    else
                        piece = -1;
                }
                this.fields[lastMove.fromRow][lastMove.fromCol] = piece;
                this.fields[lastMove.toRow][lastMove.toCol] = 0;
                this.fields[lastMove.captureRow][lastMove.toCol] = lastMove.capture;
                this._isWhitePlaying = !this._isWhitePlaying;
                this.whiteKingHasMoved = lastMove.whiteKingHasMoved;
                this.whiteLeftRookHasMoved = lastMove.whiteLeftRookHasMoved;
                this.whiteRightRookHasMoved = lastMove.whiteRightRookHasMoved;
                this.blackKingHasMoved = lastMove.blackKingHasMoved;
                this.blackLeftRookHasMoved = lastMove.blackLeftRookHasMoved;
                this.blackRightRookHasMoved = lastMove.blackRightRookHasMoved;
                this.enPassantCol = lastMove.enPassantCol;
                this._moves = lastMove.legalMoves;
                if (lastMove.secondColTo > 0) {
                    this.fields[lastMove.fromRow][lastMove.secondColFrom] = this.fields[lastMove.toRow][lastMove.secondColTo];
                    this.fields[lastMove.toRow][lastMove.secondColTo] = 0;
                }
            }
            return lastMove.capture;
        };
        Chessboard.prototype.revertLastMove = function () {
            var capturedPiece = this.revertLastMoveInternally();
            if (0 != capturedPiece)
                this.capturedPieces.pop();
        };
        return Chessboard;
    })();
    exports.Chessboard = Chessboard;
});
//# sourceMappingURL=chessboard.js.map