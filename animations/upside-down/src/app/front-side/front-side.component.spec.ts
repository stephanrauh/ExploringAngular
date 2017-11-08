import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontSideComponent } from './front-side.component';

describe('FrontSideComponent', () => {
  let component: FrontSideComponent;
  let fixture: ComponentFixture<FrontSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
