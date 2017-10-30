import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('scrollAnimation', [
      state('central', style({
        opacity: 1,
        transform: 'translateX(0px)'
      })),
      state('left', style({
        opacity: 1,
        transform: 'translateX(-246px)'
      })),
      state('right', style({
        opacity: 1,
        transform: 'translateX(246px)'
      })),
      transition('central => left', animate('300ms ease-out')),
      transition('central => right', animate('300ms ease-in')),
      transition('* => central', animate('0ms'))
    ])
  ]

})
export class CarouselComponent implements AfterContentInit {

  @ViewChild('outer')
  outer: ElementRef;


  @ViewChild('inner')
  scrollarea: ElementRef;

  public state = 'central';

  public maxIndex: number;

  public firstVisibleIndex = 0;

  public center: number;

  constructor() { }

  ngAfterContentInit() {
    const nativeScrollArea = this.scrollarea.nativeElement as HTMLDivElement;
    this.maxIndex = nativeScrollArea.children.length;
    const w = nativeScrollArea.offsetWidth;
    const l = nativeScrollArea.offsetLeft;
    this.center = (w / 2) + l;
   }

  public onClick($event: MouseEvent): void {
    let direction: string;
    if ($event.clientX > this.center) {
      direction = 'right';
    } else {
      direction = 'left';
    }
    if (this.state === 'central' && direction === 'left') {
      if (this.firstVisibleIndex < this.maxIndex) {
        this.state = direction;
      }
    } else if (this.state === 'central' && direction === 'right') {
      if (this.firstVisibleIndex > 0) {
        this.state = direction;
      }
    }
  }

  public resetState() {
    if (this.state === 'left') {
      console.log('go left');
      this.firstVisibleIndex++;
      this.resetStateWithoutMoving();
    } else if (this.state === 'right') {
      console.log('go right');
      this.firstVisibleIndex--;
      this.resetStateWithoutMoving();
    }
  }

  public resetStateWithoutMoving() {
    this.state = 'central';
    const nativeScrollArea = this.scrollarea.nativeElement as HTMLDivElement;
    console.log(nativeScrollArea.style.left);
    console.log(nativeScrollArea.style.position);
    nativeScrollArea.style.left = String(-246 * this.firstVisibleIndex) + 'px';

  }
}
