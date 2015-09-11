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
define(["require", "exports", 'angular2/angular2', './fieldcomponent', './engine/chessboard'], function (require, exports, angular2_1, fieldcomponent_1, chessboard_1) {
    var ChessBoardComponent = (function () {
        function ChessBoardComponent() {
            this.board_ = new chessboard_1.Engine.ChessBoard();
            this.isPieceSelected = false;
            ChessBoardComponent.singleton = this;
        }
        Object.defineProperty(ChessBoardComponent.prototype, "board", {
            get: function () { return this.board_; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChessBoardComponent.prototype, "fields", {
            get: function () { return this.board.fields; },
            enumerable: true,
            configurable: true
        });
        ChessBoardComponent.prototype.setSelectedPiece = function (row, col) {
            this.isPieceSelected = true;
            this.selectedPieceRow = row;
            this.selectedPieceCol = col;
            console.log("Set selected piece");
        };
        ChessBoardComponent.prototype.isLegalMove = function (toRow, toCol) {
            if (!this.isPieceSelected)
                return false;
            return this.board.isLegalMove(this.selectedPieceRow, this.selectedPieceCol, toRow, toCol);
        };
        ChessBoardComponent = __decorate([
            angular2_1.Component({
                selector: 'chessboard',
                viewBindings: [fieldcomponent_1.FieldComponent]
            }),
            angular2_1.View({
                directives: [angular2_1.NgFor, fieldcomponent_1.FieldComponent],
                templateUrl: 'chessboard.html'
            }), 
            __metadata('design:paramtypes', [])
        ], ChessBoardComponent);
        return ChessBoardComponent;
    })();
    exports.ChessBoardComponent = ChessBoardComponent;
});
//# sourceMappingURL=chessboardcomponent.js.map