/// <reference path="typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';
//import {Inject} from 'angular2/di';

@Component({selector: 'tab'})
@View({templateUrl: 'tab.html'})
class Tab {
    addPane(pane) { }
    constructor() {
      console.log("new tab")
    }
}

@Component({selector: 'pane'})
@View({templateUrl: 'pane.html'})
class Pane {
    title: String;
    constructor(tab:Tab) {
      console.log("new pane" + this.title)
      console.log("Mit Tab" + tab)
    }
}


// Annotation section
@Component({
    selector: 'tabapplication'

})
@View({
    templateUrl: 'tabapplication.html',
    directives: [Tab, Pane]
})
// Component controller
class TabApplicationComponent {
}




console.log("Vor Bootsstrap")
bootstrap(TabApplicationComponent);
console.log("nachBS")
