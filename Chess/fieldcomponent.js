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
define(["require", "exports", 'angular2/angular2', './chessboardcomponent'], function (require, exports, angular2_1, chessboardcomponent_1) {
    var FieldComponent = (function () {
        function FieldComponent() {
        }
        Object.defineProperty(FieldComponent.prototype, "row", {
            get: function () { return this._row; },
            set: function (val) { this._row = val; },
            enumerable: true,
            configurable: true
        });
        FieldComponent.prototype.backgroundFileName = function (rowindex, colindex) {
            if ((rowindex + colindex) % 2 == 1)
                return "wikimediaimages/b_empty.png";
            else
                return "wikimediaimages/w_empty.png";
        };
        FieldComponent.prototype.borderClass = function (row, col) {
            if (chessboardcomponent_1.ChessBoardComponent.singleton.isPieceSelected)
                if (row == chessboardcomponent_1.ChessBoardComponent.singleton.selectedPieceRow)
                    if (col == chessboardcomponent_1.ChessBoardComponent.singleton.selectedPieceCol)
                        return "selectedField";
            return "field";
        };
        FieldComponent.prototype.fileName = function (piece) {
            if (0 == piece)
                return "wikimediaimages/empty.png";
            var prefix = piece < 0 ? "b_" : "w_";
            if (piece < 0)
                piece = -piece;
            var pieceName;
            switch (piece) {
                case 1:
                    pieceName = "pawn";
                    break;
                case 2:
                    pieceName = "rook";
                    break;
                case 3:
                    pieceName = "knight";
                    break;
                case 4:
                    pieceName = "bishop";
                    break;
                case 5:
                    pieceName = "queen";
                    break;
                case 6:
                    pieceName = "king";
                    break;
            }
            return "wikimediaimages/" + prefix + pieceName + ".png";
        };
        FieldComponent.prototype.ondragstart = function (row, col) {
            console.log("drag start:" + row + "/" + col);
            chessboardcomponent_1.ChessBoardComponent.singleton.setSelectedPiece(row, col);
        };
        FieldComponent.prototype.ondragover = function (row, col) {
            console.log("drag over:" + row + "/" + col);
            if (chessboardcomponent_1.ChessBoardComponent.singleton.isLegalMove(row, col))
                event.preventDefault();
        };
        FieldComponent.prototype.ondragdrop = function (row, col) {
            console.log("drag drop:" + row + "/" + col);
        };
        FieldComponent.prototype.isLegalMove = function (row, col) {
            if (col < 4)
                return false;
            return true;
        };
        FieldComponent = __decorate([
            angular2_1.Component({
                selector: 'field',
                properties: ['piece', 'row: row', 'col']
            }),
            angular2_1.View({
                directives: [angular2_1.NgFor],
                templateUrl: 'field.html'
            }),
            angular2_1.Inject(chessboardcomponent_1.ChessBoardComponent), 
            __metadata('design:paramtypes', [])
        ], FieldComponent);
        return FieldComponent;
    })();
    exports.FieldComponent = FieldComponent;
});
//# sourceMappingURL=fieldcomponent.js.map