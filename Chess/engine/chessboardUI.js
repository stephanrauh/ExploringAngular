var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var chessboard_1 = require('./chessboard');
var suggestor_1 = require('./suggestor');
var ChessEngineAPI;
(function (ChessEngineAPI) {
    var ChessboardUI = (function () {
        function ChessboardUI() {
            this.isPieceSelected = false;
            this.lookahead = 3;
            this.breadth = 7;
            this.chessboard = new chessboard_1.Chessboard(new Array());
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
        Object.defineProperty(ChessboardUI.prototype, "check", {
            get: function () { return this.chessboard.check; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChessboardUI.prototype, "checkMate", {
            get: function () { return this.chessboard.checkMate; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChessboardUI.prototype, "staleMate", {
            get: function () { return this.chessboard.staleMate; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChessboardUI.prototype, "ownCheck", {
            get: function () { return this.chessboard.ownCheck; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChessboardUI.prototype, "ownCheckMate", {
            get: function () { return this.chessboard.ownCheckMate; },
            enumerable: true,
            configurable: true
        });
        ChessboardUI.prototype.ownThreats = function (row, col) {
            return this.chessboard.ownThreats(row, col);
        };
        ChessboardUI.prototype.opponentThreats = function (row, col) {
            return this.chessboard.opponentThreats(row, col);
        };
        ChessboardUI.prototype.suggestMove = function () {
            return new suggestor_1.Suggestor(this.chessboard).suggestMove(this.lookahead, this.breadth);
        };
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
                    var answer = new suggestor_1.Suggestor(this.chessboard).suggestMove(this.lookahead, this.breadth);
                    if (null != answer)
                        this.move(answer);
                }
            }
        };
        ChessboardUI.prototype.move = function (mv) {
            this.chessboard.move(mv.fromRow, mv.fromCol, mv.toRow, mv.toCol, mv.promotion);
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
        ChessboardUI.prototype.revertLastMove = function () {
            this.chessboard.revertLastMove();
        };
        ChessboardUI = __decorate([
            angular2_1.Injectable(), 
            __metadata('design:paramtypes', [])
        ], ChessboardUI);
        return ChessboardUI;
    })();
    ChessEngineAPI.ChessboardUI = ChessboardUI;
})(ChessEngineAPI = exports.ChessEngineAPI || (exports.ChessEngineAPI = {}));
//# sourceMappingURL=chessboardUI.js.map