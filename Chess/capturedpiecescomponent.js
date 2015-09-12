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
define(["require", "exports", 'angular2/angular2', './engine/chessboard', './engine/pieces'], function (require, exports, angular2_1, chessboard_1, pieces_1) {
    var CapturedPiecesComponent = (function () {
        function CapturedPiecesComponent(chessboard) {
            this.chessboard = chessboard;
        }
        CapturedPiecesComponent.prototype.capturedPiecesFilenames = function () {
            var _this = this;
            var sorted = this.chessboard.capturedPieces.sort(function (n1, n2) { return _this.isBefore(n1, n2); });
            var filenames = sorted.map(function (piece) { return pieces_1.PieceModule.PieceUtils.fileName(piece); });
            return filenames;
        };
        CapturedPiecesComponent.prototype.isBefore = function (piece1, piece2) {
            var materialValue1 = pieces_1.PieceModule.PieceUtils.materialValue(piece1);
            var materialValue2 = pieces_1.PieceModule.PieceUtils.materialValue(piece2);
            if (materialValue1 == materialValue2)
                return piece2 - piece1;
            return materialValue2 - materialValue1;
        };
        CapturedPiecesComponent = __decorate([
            angular2_1.Component({
                selector: 'captured-pieces'
            }),
            angular2_1.View({
                directives: [angular2_1.NgFor],
                templateUrl: 'CapturedPiecesComponent.html'
            }), 
            __metadata('design:paramtypes', [chessboard_1.Engine.ChessboardUI])
        ], CapturedPiecesComponent);
        return CapturedPiecesComponent;
    })();
    exports.CapturedPiecesComponent = CapturedPiecesComponent;
});
//# sourceMappingURL=capturedpiecescomponent.js.map