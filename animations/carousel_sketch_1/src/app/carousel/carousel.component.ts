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
      state('show', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      state('hide', style({
        opacity: 0,
        transform: 'translateX(-100%)'
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ])
  ]

})
export class CarouselComponent implements AfterContentInit {

  @ViewChild('outer')
  outer: ElementRef;


  @ViewChild('inner')
  scrollarea: ElementRef;

  state = 'hide';

  constructor() { }

  ngAfterContentInit() {
    const nativeScrollArea = this.scrollarea.nativeElement as HTMLDivElement;
    nativeScrollArea.scrollLeft = 500;
    for (let i = 0; i < nativeScrollArea.childElementCount; i++) {
      const child = nativeScrollArea.children.item(i) as Element;
      console.log(child.clientHeight);
    }
  }

  public onClick(): void {
    if (this.state === 'show') {
      this.state = 'hide';
    } else {
      this.state = 'show';
    }
  }

}
