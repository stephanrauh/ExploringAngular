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
var chessboardUI_1 = require("./engine/chessboardUI");
var pieces_1 = require('./engine/pieces');
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
        var piece = this.chessboard.fields[row][col];
        var isOwnPiece = false;
        if (this.chessboard.isWhitePlaying && piece > 0)
            isOwnPiece = true;
        if ((!this.chessboard.isWhitePlaying) && piece < 0)
            isOwnPiece = true;
        if (this.chessboard.isPieceSelected) {
            if (row == this.chessboard.selectedPieceRow)
                if (col == this.chessboard.selectedPieceCol)
                    return "selectedField";
            if (this.chessboard.isLegalMove2(row, col))
                return "fieldInReach";
        }
        if (isOwnPiece)
            if (this.opponentThreats(row, col) > 0)
                return "threatenedField";
        return "field";
    };
    FieldComponent.prototype.ownThreats = function (row, col) {
        return this.chessboard.ownThreats(row, col);
    };
    FieldComponent.prototype.opponentThreats = function (row, col) {
        return this.chessboard.opponentThreats(row, col);
    };
    FieldComponent.prototype.fileName = function (piece) {
        return pieces_1.PieceUtils.fileName(piece);
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
//# sourceMappingURL=fieldcomponent.js.map