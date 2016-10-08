import {Component, View, bootstrap, NgIf} from 'angular2/angular2';
import {MapComponent} from './mapcomponent';

// Annotation section
@Component({
    selector: 'application'
})
@View({
    templateUrl: 'applicationcomponent.html',
    directives: [MapComponent]
})
// Component controller
class ApplicationComponent {
  public title = "Treasure Hunt"
}

bootstrap(ApplicationComponent);
