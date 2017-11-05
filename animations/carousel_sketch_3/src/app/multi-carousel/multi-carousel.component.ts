import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-multi-carousel',
  templateUrl: './multi-carousel.component.html',
  styleUrls: ['./multi-carousel.component.css']
})
export class MultiCarouselComponent implements AfterViewInit {

  @Input()
  public width = '400px';

  @Input()
  public tileWidth = 122;

  @ViewChild('container')
  public container: ElementRef;

  private containerDiv: HTMLDivElement;

  public translate: String = 'translateX(0px)';

  public transition: String = '';

  public currentTranslation = 0;

  public nextTranslation = 0;

  private dragging = false;

  private dragStart = 0;


  constructor() { }

  public ngAfterViewInit(): void {
    this.containerDiv = this.container.nativeElement as HTMLDivElement;
    this.containerDiv.addEventListener('webkitAnimationEnd', () => this.animationTerminated(), false);
    this.containerDiv.addEventListener('animationend', () => this.animationTerminated(), false);
    this.containerDiv.addEventListener('oanimationend', () => this.animationTerminated(), false);
  }

  public animationTerminated(): void {
    this.currentTranslation = this.nextTranslation;
    this.translate = `translateX(${this.currentTranslation}px)`;
  }

  public move(direction: string): void {
    this.transition = '';
    this.containerDiv.style.animationName = '';
    const dummy = this.containerDiv.offsetWidth;
    this.containerDiv.style.animationName = direction;
    this.containerDiv.style.animationPlayState = 'running';
    if (direction === 'left') {
      this.nextTranslation -= this.tileWidth;
    } else if (direction === 'right') {
      this.nextTranslation += this.tileWidth;
    }
  }

  public onMouseDown(event: MouseEvent): void {
    console.log('md');
    this.transition = '';
    this.dragging = true;
    this.dragStart = event.screenX;
  }

  public onMouseMove(event: MouseEvent): void {
    if (this.dragging) {
      const movement = event.screenX - this.dragStart;
      this.translate = `translateX(${this.currentTranslation + movement}px)`;
    }
  }

  public onMouseUp(event: MouseEvent): void {
    this.dragging = false;
    const movement = event.screenX - this.dragStart;
    const remainder = movement % this.tileWidth;
    let index = (movement - remainder) / this.tileWidth;
    if (remainder > (this.tileWidth / 2)) {
      index++;
    } else if (remainder < -(this.tileWidth / 2)) {
      index--;
    }
    this.nextTranslation = this.currentTranslation + index * this.tileWidth;
    this.currentTranslation = this.currentTranslation + movement;

    this.moveToTarget();

  }

  public onMouseLeave(event: MouseEvent): void {
    if (this.dragging) {
      this.moveToTarget();
    }
    this.dragging = false;
  }

  private moveToTarget() {
    this.translate = `translateX(${this.nextTranslation}px)`;
    this.transition = 'transform 200ms ease-out';
    this.currentTranslation = this.nextTranslation;
  }

}
