import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiCarouselComponent } from './multi-carousel.component';

describe('MultiCarouselComponent', () => {
  let component: MultiCarouselComponent;
  let fixture: ComponentFixture<MultiCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
