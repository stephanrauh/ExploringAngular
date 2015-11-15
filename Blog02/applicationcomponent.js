var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'angular2/angular2', "./chessboardcomponent", "./chessboardui"], function (require, exports, angular2_1, chessboardcomponent_1, chessboardui_1) {
    var ApplicationComponent = (function () {
        function ApplicationComponent(chessboard) {
            this.chessboard = chessboard;
            this.suggestedMove = null;
        }
        Object.defineProperty(ApplicationComponent.prototype, "suggestedMoveText", {
            get: function () {
                if (null == this.suggestedMove)
                    return "";
                else
                    return this.suggestedMove.toString();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ApplicationComponent.prototype, "title", {
            get: function () {
                var result = this.chessboard.isWhitePlaying ? "White move " : "Black move ";
                if (this.chessboard.checkMate)
                    result += " Checkmate!";
                else if (this.chessboard.check)
                    result += " Check!";
                else if (this.chessboard.ownCheckMate)
                    result += " Player is checkmate!";
                else if (this.chessboard.ownCheck)
                    result += " Player is in check!";
                return result;
            },
            enumerable: true,
            configurable: true
        });
        ApplicationComponent.prototype.suggestMove = function () {
            this.suggestedMove = this.chessboard.suggestMove();
            return false;
        };
        ApplicationComponent.prototype.turnSides = function () {
            this.suggestedMove = null;
            var move = this.chessboard.suggestMove();
            if (move != null)
                this.chessboard.move(move);
            return false;
        };
        ApplicationComponent.prototype.revertLastMove = function () {
            this.suggestedMove = null;
            this.chessboard.revertLastMove();
            return false;
        };
        ApplicationComponent = __decorate([
            angular2_1.Component({
                selector: 'application',
                bindings: [chessboardui_1.ChessEngineAPI.ChessboardUI]
            }),
            angular2_1.View({
                templateUrl: 'ApplicationComponent.html',
                directives: [chessboardcomponent_1.ChessBoardComponent, angular2_1.NgIf]
            }), 
            __metadata('design:paramtypes', [chessboardui_1.ChessEngineAPI.ChessboardUI])
        ], ApplicationComponent);
        return ApplicationComponent;
    })();
    angular2_1.bootstrap(ApplicationComponent);
});
//# sourceMappingURL=applicationcomponent.js.map