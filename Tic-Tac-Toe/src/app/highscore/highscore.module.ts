import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HighscoreComponent} from './highscore.component';
import {RouterModule, Routes} from '@angular/router';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {Http, HttpModule} from '@angular/http';
import {
  MissingTranslationHandler, MissingTranslationHandlerParams, TranslateDefaultParser, TranslateLoader, TranslateModule,
  TranslateParser
} from '@ngx-translate/core';
import {MaterialModule} from '@angular/material';
import {MockHttpModule} from '../mock-http/mock-http.module';
import {environment} from '../../environments/environment';

const routes: Routes = [
  {path: '', component: HighscoreComponent}
];

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/highscore/', '.json');
}

export class MyMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    return "Translate me!";
  }
}

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    environment.production ? HttpModule : MockHttpModule,
    TranslateModule.forChild({
      loader: {provide: TranslateLoader, useFactory: createTranslateLoader,  deps: [Http]},
//      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler},
      isolate: true

    })
  ],
  declarations: [
    HighscoreComponent
  ]
})
export class HighscoreModule { }
