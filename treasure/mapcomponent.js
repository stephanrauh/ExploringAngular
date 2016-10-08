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
var MapComponent = (function () {
    function MapComponent() {
        this._size = 10;
        this.piex = 0;
        this.piey = 0;
        this.pieHidden = true;
        this.size = 20;
    }
    Object.defineProperty(MapComponent.prototype, "size", {
        set: function (newSize) {
            this._size = newSize;
            this.fields = new Array(this._size);
            for (var x = 0; x < this._size; x++) {
                this.fields[x] = new Array(this._size);
                for (var y = 0; y < this._size; y++)
                    this.fields[x][y] = Math.floor(Math.random() * 1.5);
            }
            this.destinationX = Math.floor(newSize * Math.random());
            this.destinationY = Math.floor(newSize * Math.random());
            this.fields[this.destinationX][this.destinationY] = 2;
        },
        enumerable: true,
        configurable: true
    });
    MapComponent.prototype.backgroundcolor = function (piece) {
        if (0 == piece)
            return "#0000000";
        else
            return "#FFFFFF";
    };
    MapComponent.prototype.fieldVisible = function (x, y) {
        return this.fields[x][y] > 0;
    };
    MapComponent.prototype.fieldClass = function (x, y) {
        if (this.fields[x][y] == 2)
            return "destination";
        else if (this.fields[x][y] > 0)
            return "circle";
        else
            return "";
    };
    MapComponent.prototype.click = function (colindex, rowindex) {
        this.piex = 32 * colindex - 92;
        this.piey = 26.5 * rowindex - 75;
        this.pieHidden = false;
    };
    MapComponent.prototype.pieposition = function () {
        return "absolute";
    };
    MapComponent.prototype.pierotation = function () {
        return "rotate(0deg)";
    };
    MapComponent = __decorate([
        angular2_1.Component({
            selector: 'map'
        }),
        angular2_1.View({
            directives: [angular2_1.NgFor],
            templateUrl: 'mapcomponent.html'
        }), 
        __metadata('design:paramtypes', [])
    ], MapComponent);
    return MapComponent;
})();
exports.MapComponent = MapComponent;
//# sourceMappingURL=mapcomponent.js.map