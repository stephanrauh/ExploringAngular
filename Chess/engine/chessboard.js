/// <reference path="../typings/angular2/angular2.d.ts" />
define(["require", "exports", './move', './moves'], function (require, exports, move_1, moves_1) {
    var Engine;
    (function (Engine) {
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
                console.log("new Chessboard!");
            }
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
            Chessboard.prototype.move = function (fromRow, fromCol, toRow, toCol, promotion) {
                var piece = this.fields[fromRow][fromCol];
                var targetPiece = this.fields[toRow][toCol];
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
                }
                if (piece == -1 && fromRow - toRow == -2) {
                    this.enPassantCol = toCol;
                }
                if (piece == 6) {
                    this.whiteKingHasMoved = true;
                    if (fromCol - toCol == 2) {
                        this.fields[fromRow][0] = 0;
                        this.fields[fromRow][3] = 2;
                    }
                    else if (fromCol - toCol == -2) {
                        this.fields[fromRow][7] = 0;
                        this.fields[fromRow][5] = 2;
                    }
                }
                if (piece == -6) {
                    this.blackKingHasMoved = true;
                    if (fromCol - toCol == 2) {
                        this.fields[fromRow][0] = 0;
                        this.fields[fromRow][3] = -2;
                    }
                    else if (fromCol - toCol == -2) {
                        this.fields[fromRow][7] = 0;
                        this.fields[fromRow][5] = -2;
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
                if (0 != targetPiece) {
                    this.capturedPieces.push(targetPiece);
                }
                this._moves = new moves_1.Moves(this);
                this.moveHistory.push(new move_1.Move(fromRow, fromCol, toRow, toCol, promotion, targetPiece, this._moves.ownCheck, this._moves.ownCheckMate, this._moves.staleMate));
            };
            return Chessboard;
        })();
        Engine.Chessboard = Chessboard;
    })(Engine = exports.Engine || (exports.Engine = {}));
});
//# sourceMappingURL=chessboard.js.map