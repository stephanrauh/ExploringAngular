/// <reference path="../typings/angular2/angular2.d.ts" />
/// <reference path="board.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';
import {Chess} from "board";


// Annotation section
@Component({
  selector: 'my-app'
})
@View({
  template: '<h1>Hello {{ name }}, how are you?</h1>'
})
// Component controller
class MyAppComponent {
  name: string;
  constructor() {
    this.name = 'Bobby';
  }
}

var c = Chess.ChessBoardComponent;
console.log("Bootstrap in app.js")
bootstrap(Chess.ChessBoardComponent);
console.log("After Bootstrap in app.js")
