/// <reference path="../typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';

// Annotation section
@Component({
  selector: 'playground',
  properties:['name']
})
@View({
  templateUrl: "playground.html"

})
// Component controller
export class PlaygroundComponent {
  name: string = "initial value";
  constructor() {
  }
}
