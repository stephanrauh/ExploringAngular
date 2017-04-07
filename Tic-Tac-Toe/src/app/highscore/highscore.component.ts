import { Component, OnInit } from '@angular/core';
import {EngineService} from '../gameplay/engine.service';
import {Http} from '@angular/http';
import {Highscore} from './highscore';
import {Observable, Subject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.scss']
})
export class HighscoreComponent {

  public highscores$ = new Subject<Highscore[]>();

  constructor(public engineService: EngineService, http: Http, translate: TranslateService) {
    translate.use("es");
    http.get("https://example.com/rest/highscore").subscribe(response => {
      this.highscores$.next(response.json() as Highscore[]);
    });
  }
}
