/// <reference path="../../typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';
import {PlaygroundComponent} from './playground'


// Annotation section
@Component({
  selector: 'game'
})
@View({
  templateUrl: "game.html",
  directives: [PlaygroundComponent]
})
// Component controller
class GameComponent {
  title: string = "initial value";
  constructor() {
  }
}


bootstrap(GameComponent);
console.log("After Bootstrap in app.js")
