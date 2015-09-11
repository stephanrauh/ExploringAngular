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
define(["require", "exports", 'angular2/angular2', "./chessboardcomponent"], function (require, exports, angular2_1, chessboardcomponent_1) {
    var ApplicationComponent = (function () {
        function ApplicationComponent() {
        }
        ApplicationComponent = __decorate([
            angular2_1.Component({
                selector: 'application'
            }),
            angular2_1.View({
                templateUrl: 'application.html',
                directives: [chessboardcomponent_1.ChessBoardComponent]
            }), 
            __metadata('design:paramtypes', [])
        ], ApplicationComponent);
        return ApplicationComponent;
    })();
    angular2_1.bootstrap(ApplicationComponent);
});
//# sourceMappingURL=applicationcomponent.js.map