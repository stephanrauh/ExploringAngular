import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackSideComponent } from './back-side.component';

describe('BackSideComponent', () => {
  let component: BackSideComponent;
  let fixture: ComponentFixture<BackSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
