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
var fieldcomponent_1 = require('./fieldcomponent');
var chessboardUI_1 = require('./engine/chessboardUI');
var ChessBoardComponent = (function () {
    function ChessBoardComponent(chessboard) {
        this.chessboard = chessboard;
    }
    Object.defineProperty(ChessBoardComponent.prototype, "board", {
        get: function () { return this.chessboard; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChessBoardComponent.prototype, "fields", {
        get: function () { return this.board.fields; },
        enumerable: true,
        configurable: true
    });
    ChessBoardComponent = __decorate([
        angular2_1.Component({
            selector: 'chessboard',
            viewBindings: [fieldcomponent_1.FieldComponent]
        }),
        angular2_1.View({
            directives: [angular2_1.NgFor, fieldcomponent_1.FieldComponent],
            templateUrl: 'ChessboardComponent.html'
        }), 
        __metadata('design:paramtypes', [chessboardUI_1.ChessEngineAPI.ChessboardUI])
    ], ChessBoardComponent);
    return ChessBoardComponent;
})();
exports.ChessBoardComponent = ChessBoardComponent;
//# sourceMappingURL=chessboardcomponent.js.map