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
define(["require", "exports", 'angular2/angular2', "./chessboardcomponent", './capturedpiecescomponent', "./engine/chessboard", './historycomponent'], function (require, exports, angular2_1, chessboardcomponent_1, capturedpiecescomponent_1, chessboard_1, historycomponent_1) {
    var ApplicationComponent = (function () {
        function ApplicationComponent(chessboard) {
            this.chessboard = chessboard;
        }
        Object.defineProperty(ApplicationComponent.prototype, "title", {
            get: function () { return this.chessboard.isWhitePlaying ? "White move" : "Black move"; },
            enumerable: true,
            configurable: true
        });
        ApplicationComponent = __decorate([
            angular2_1.Component({
                selector: 'application',
                bindings: [chessboard_1.Engine.ChessboardUI]
            }),
            angular2_1.View({
                templateUrl: 'ApplicationComponent.html',
                directives: [chessboardcomponent_1.ChessBoardComponent, historycomponent_1.HistoryComponent, capturedpiecescomponent_1.CapturedPiecesComponent]
            }), 
            __metadata('design:paramtypes', [chessboard_1.Engine.ChessboardUI])
        ], ApplicationComponent);
        return ApplicationComponent;
    })();
    angular2_1.bootstrap(ApplicationComponent);
});
//# sourceMappingURL=applicationcomponent.js.map