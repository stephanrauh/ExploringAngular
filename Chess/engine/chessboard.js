/// <reference path="../typings/angular2/angular2.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'angular2/angular2', './move', './moves'], function (require, exports, angular2_1, move_1, moves_1) {
    var Engine;
    (function (Engine) {
        var ChessboardUI = (function () {
            function ChessboardUI() {
                this.isPieceSelected = false;
                this.chessboard = new Chessboard(new Array());
            }
            Object.defineProperty(ChessboardUI.prototype, "fields", {
                get: function () {
                    return this.chessboard.fields;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ChessboardUI.prototype, "isWhitePlaying", {
                get: function () { return this.chessboard.isWhitePlaying; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ChessboardUI.prototype, "capturedPieces", {
                get: function () { return this.chessboard.capturedPieces; },
                enumerable: true,
                configurable: true
            });
            ChessboardUI.prototype.onclick = function (row, col) {
                if (!this.isPieceSelected)
                    this.setSelectedPiece(row, col);
                else {
                    this.isPieceSelected = false;
                    if (this.chessboard.isLegalMove(this.selectedPieceRow, this.selectedPieceCol, row, col)) {
                        this.chessboard.move(this.selectedPieceRow, this.selectedPieceCol, row, col, this.isWhitePlaying ? 5 : -5);
                    }
                }
            };
            ChessboardUI.prototype.setSelectedPiece = function (row, col) {
                var piece = this.chessboard.fields[row][col];
                if (this.isWhitePlaying) {
                    if (piece <= 0)
                        return;
                }
                else {
                    if (piece >= 0)
                        return;
                }
                this.isPieceSelected = true;
                this.selectedPieceRow = row;
                this.selectedPieceCol = col;
            };
            ChessboardUI.prototype.isLegalMove2 = function (toRow, toCol) {
                if (!this.isPieceSelected)
                    return false;
                return this.chessboard.isLegalMove(this.selectedPieceRow, this.selectedPieceCol, toRow, toCol);
            };
            ChessboardUI = __decorate([
                angular2_1.Injectable(), 
                __metadata('design:paramtypes', [])
            ], ChessboardUI);
            return ChessboardUI;
        })();
        Engine.ChessboardUI = ChessboardUI;
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
                this._moves = new moves_1.Moves(this);
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
                    this.moveHistory.push(new move_1.Move(fromRow, fromCol, toRow, toCol, promotion, targetPiece));
                }
            };
            return Chessboard;
        })();
        Engine.Chessboard = Chessboard;
    })(Engine = exports.Engine || (exports.Engine = {}));
});
//# sourceMappingURL=chessboard.js.map