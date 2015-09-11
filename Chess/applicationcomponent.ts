/// <reference path="typings/angular2/angular2.d.ts" />
/// <reference path="chessboard.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';
import {ChessBoardComponent} from "./chessboardcomponent";


// Annotation section
@Component({
    selector: 'application'
})
@View({
    templateUrl: 'ApplicationComponent.html',
    directives: [ChessBoardComponent]
})
// Component controller
class ApplicationComponent {
}

bootstrap(ApplicationComponent);
