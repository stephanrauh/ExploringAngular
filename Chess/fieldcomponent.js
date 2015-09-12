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
define(["require", "exports", 'angular2/angular2', "./engine/chessboardUI", './engine/pieces'], function (require, exports, angular2_1, chessboardUI_1, pieces_1) {
    var FieldComponent = (function () {
        function FieldComponent(chessboard) {
            this.chessboard = chessboard;
        }
        FieldComponent.prototype.backgroundFileName = function (rowindex, colindex) {
            if ((rowindex + colindex) % 2 == 1)
                return "wikimediaimages/b_empty.png";
            else
                return "wikimediaimages/w_empty.png";
        };
        FieldComponent.prototype.borderClass = function (row, col) {
            if (this.chessboard.isPieceSelected) {
                if (row == this.chessboard.selectedPieceRow)
                    if (col == this.chessboard.selectedPieceCol)
                        return "selectedField";
                if (this.chessboard.isLegalMove2(row, col))
                    return "fieldInReach";
            }
            return "field";
        };
        FieldComponent.prototype.ownThreats = function (row, col) {
            return this.chessboard.ownThreats(row, col);
        };
        FieldComponent.prototype.opponentThreats = function (row, col) {
            return this.chessboard.opponentThreats(row, col);
        };
        FieldComponent.prototype.fileName = function (piece) {
            return pieces_1.PieceModule.PieceUtils.fileName(piece);
        };
        FieldComponent.prototype.ondragstart = function (row, col) {
            this.chessboard.setSelectedPiece(row, col);
        };
        FieldComponent.prototype.ondragover = function (row, col) {
            if (this.chessboard.isLegalMove2(row, col))
                event.preventDefault();
        };
        FieldComponent.prototype.ondragdrop = function (row, col) {
            this.chessboard.onclick(row, col);
        };
        FieldComponent.prototype.onclick = function (row, col) {
            this.chessboard.onclick(row, col);
        };
        FieldComponent = __decorate([
            angular2_1.Component({
                selector: 'field',
                properties: ['piece', 'row: row', 'col']
            }),
            angular2_1.View({
                directives: [angular2_1.NgFor],
                templateUrl: 'FieldComponent.html'
            }), 
            __metadata('design:paramtypes', [chessboardUI_1.ChessEngineAPI.ChessboardUI])
        ], FieldComponent);
        return FieldComponent;
    })();
    exports.FieldComponent = FieldComponent;
});
//# sourceMappingURL=fieldcomponent.js.map