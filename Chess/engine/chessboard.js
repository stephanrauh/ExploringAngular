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
define(["require", "exports", 'angular2/angular2'], function (require, exports, angular2_1) {
    var Engine;
    (function (Engine) {
        var ChessboardUI = (function () {
            function ChessboardUI() {
                this.isPieceSelected = false;
                this.chessboard = new Chessboard();
            }
            Object.defineProperty(ChessboardUI.prototype, "fields", {
                get: function () {
                    return this.chessboard.fields;
                },
                enumerable: true,
                configurable: true
            });
            ChessboardUI.prototype.onclick = function (row, col) {
                if (!this.isPieceSelected)
                    this.setSelectedPiece(row, col);
                else {
                    this.isPieceSelected = false;
                    if (this.chessboard.isLegalMove(this.selectedPieceRow, this.selectedPieceCol, row, col)) {
                        this.chessboard.move(this.selectedPieceRow, this.selectedPieceCol, row, col);
                    }
                }
            };
            ChessboardUI.prototype.setSelectedPiece = function (row, col) {
                if (this.chessboard.fields[row][col] != 0) {
                    this.isPieceSelected = true;
                    this.selectedPieceRow = row;
                    this.selectedPieceCol = col;
                }
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
            function Chessboard() {
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
                console.log("new Chessboard!");
            }
            Object.defineProperty(Chessboard.prototype, "fields", {
                get: function () {
                    return this._fields;
                },
                enumerable: true,
                configurable: true
            });
            Chessboard.prototype.isLegalMove = function (fromRow, fromCol, toRow, toCol) {
                var piece = this.fields[fromRow][fromCol];
                var targetPiece = this.fields[toRow][toCol];
                if (targetPiece > 0 && piece > 0)
                    return false;
                if (targetPiece < 0 && piece < 0)
                    return false;
                return true;
            };
            Chessboard.prototype.move = function (fromRow, fromCol, toRow, toCol) {
                var piece = this.fields[fromRow][fromCol];
                var targetPiece = this.fields[toRow][toCol];
                this.fields[fromRow][fromCol] = 0;
                this.fields[toRow][toCol] = piece;
            };
            return Chessboard;
        })();
    })(Engine = exports.Engine || (exports.Engine = {}));
});
//# sourceMappingURL=chessboard.js.map