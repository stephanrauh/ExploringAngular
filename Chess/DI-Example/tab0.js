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
//import {Inject} from 'angular2/di';
var Tab = (function () {
    function Tab() {
        console.log("new tab");
    }
    Tab.prototype.addPane = function (pane) { };
    Tab = __decorate([
        angular2_1.Component({ selector: 'tab' }),
        angular2_1.View({ templateUrl: 'tab.html' }), 
        __metadata('design:paramtypes', [])
    ], Tab);
    return Tab;
})();
var Pane = (function () {
    function Pane(tab) {
        console.log("new pane" + this.title);
        console.log("Mit Tab" + tab);
    }
    Pane = __decorate([
        angular2_1.Component({ selector: 'pane' }),
        angular2_1.View({ templateUrl: 'pane.html' }), 
        __metadata('design:paramtypes', [Tab])
    ], Pane);
    return Pane;
})();
// Annotation section
var TabApplicationComponent = (function () {
    function TabApplicationComponent() {
    }
    TabApplicationComponent = __decorate([
        angular2_1.Component({
            selector: 'tabapplication'
        }),
        angular2_1.View({
            templateUrl: 'tabapplication.html',
            directives: [Tab, Pane]
        }), 
        __metadata('design:paramtypes', [])
    ], TabApplicationComponent);
    return TabApplicationComponent;
})();
console.log("Vor Bootsstrap");
angular2_1.bootstrap(TabApplicationComponent);
console.log("nachBS");
//# sourceMappingURL=tab0.js.map