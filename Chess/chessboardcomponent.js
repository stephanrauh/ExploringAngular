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
define(["require", "exports", 'angular2/angular2', './fieldcomponent', './engine/chessboardUI'], function (require, exports, angular2_1, fieldcomponent_1, chessboardUI_1) {
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
});
//# sourceMappingURL=chessboardcomponent.js.map