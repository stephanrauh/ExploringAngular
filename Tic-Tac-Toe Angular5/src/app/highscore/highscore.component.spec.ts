import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighscoreComponent } from './highscore.component';

describe('HighscoreComponent', () => {
  let component: HighscoreComponent;
  let fixture: ComponentFixture<HighscoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighscoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
