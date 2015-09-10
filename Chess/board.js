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
    var Chess;
    (function (Chess) {
        var ChessBoardComponent = (function () {
            function ChessBoardComponent() {
                this.fields = [
                    [-2, -3, -4, -5, -6, -4, -3, -2],
                    [-1, -1, -1, -1, -1, -1, -1, -1],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [2, 3, 4, 5, 6, 4, 3, 2]
                ];
                this.lastBackGround = true;
            }
            ChessBoardComponent.prototype.backgroundFileName = function (rowindex, colindex) {
                if ((rowindex + colindex) % 2 == 1)
                    return "wikimediaimages/b_empty.png";
                else
                    return "wikimediaimages/w_empty.png";
            };
            ChessBoardComponent.prototype.fileName = function (piece) {
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
            ChessBoardComponent = __decorate([
                angular2_1.Component({
                    selector: 'chessboard'
                }),
                angular2_1.View({
                    directives: [angular2_1.NgFor],
                    template: '<div *ng-for="#row of fields; var rowindex=index" style="width: 630px; height: 68px; overflow: hidden;" >\
                  <div *ng-for="#col of row; var colindex=index" style="position: relative; left: 0; top: 0; width: 68px; height: 68px; margin-right:-4px; display: inline-block" >\
                       <div style="position: relative; top: 0; left: 0;"><img style="width:70px;height:70px" src="{{backgroundFileName(rowindex,colindex)}}" /></div>\
                       <div style="position: absolute; top: 0px; left: 0px;"><img style="width:70px;height:70px" src="{{fileName(col)}}" /></div>\
                  </div>\
             </div>'
                }), 
                __metadata('design:paramtypes', [])
            ], ChessBoardComponent);
            return ChessBoardComponent;
        })();
        Chess.ChessBoardComponent = ChessBoardComponent;
    })(Chess = exports.Chess || (exports.Chess = {}));
});
//# sourceMappingURL=board.js.map