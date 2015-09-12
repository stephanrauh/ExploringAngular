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
define(["require", "exports", 'angular2/angular2', './chessboard'], function (require, exports, angular2_1, chessboard_1) {
    var ChessEngineAPI;
    (function (ChessEngineAPI) {
        var ChessboardUI = (function () {
            function ChessboardUI() {
                this.isPieceSelected = false;
                this.chessboard = new chessboard_1.Engine.Chessboard(new Array());
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
            Object.defineProperty(ChessboardUI.prototype, "moveHistory", {
                get: function () { return this.chessboard.moveHistory; },
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
        ChessEngineAPI.ChessboardUI = ChessboardUI;
    })(ChessEngineAPI = exports.ChessEngineAPI || (exports.ChessEngineAPI = {}));
});
//# sourceMappingURL=chessboardUI.js.map