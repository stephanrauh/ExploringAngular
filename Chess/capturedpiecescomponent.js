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
var chessboardUI_1 = require('./engine/chessboardUI');
var pieces_1 = require('./engine/pieces');
var CapturedPiecesComponent = (function () {
    function CapturedPiecesComponent(chessboard) {
        this.chessboard = chessboard;
    }
    CapturedPiecesComponent.prototype.capturedPiecesFilenames = function () {
        var _this = this;
        var sorted = this.chessboard.capturedPieces.sort(function (n1, n2) { return _this.isBefore(n1, n2); });
        var filenames = sorted.map(function (piece) { return pieces_1.PieceUtils.fileName(piece); });
        return filenames;
    };
    CapturedPiecesComponent.prototype.isBefore = function (piece1, piece2) {
        var materialValue1 = pieces_1.PieceUtils.materialValue(piece1);
        var materialValue2 = pieces_1.PieceUtils.materialValue(piece2);
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
        __metadata('design:paramtypes', [chessboardUI_1.ChessEngineAPI.ChessboardUI])
    ], CapturedPiecesComponent);
    return CapturedPiecesComponent;
})();
exports.CapturedPiecesComponent = CapturedPiecesComponent;
//# sourceMappingURL=capturedpiecescomponent.js.map