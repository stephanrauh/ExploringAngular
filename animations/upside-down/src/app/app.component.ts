import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('state', [
      state('false',
        style({
          transform: 'rotateY(0deg)'
        })),
      state('true', style({
        transform: 'rotateY(180deg)'
      })),
      transition('true <=> false', animate('500ms ease-in-out')),
     ])
  ]
})
export class AppComponent {
  public showBack = false;
}
