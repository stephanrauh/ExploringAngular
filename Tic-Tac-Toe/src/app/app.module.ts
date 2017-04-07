import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {GridComponent} from './gameplay/grid/grid.component';
import {EngineService} from './gameplay/engine.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';
import {environment} from '../environments/environment';
import {MockHttpModule} from './mock-http/mock-http.module';
import 'hammerjs';
import {SidebarComponent} from './sidebar/sidebar.component';
import {GameBoardComponent} from './game-board/game-board.component';
import {RegistrationFormComponent} from './registration/registration-form.component';
import {RouterModule, Routes} from '@angular/router';
import {IsRegisterdGuard} from './registration/is-registerd-guard';
import {UserService} from './registration/user.service';
import {HighscoreComponent} from './highscore/highscore.component';
import {HistoryService} from './gameplay/history.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'registration'},
  {path: 'registration', component: RegistrationFormComponent},
  {path: 'play', component: GameBoardComponent, canActivate: [IsRegisterdGuard]},
  {path: 'highscore', loadChildren: "app/highscore/highscore.module#HighscoreModule", canActivate: [IsRegisterdGuard]}
];

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    SidebarComponent,
    GameBoardComponent,
    RegistrationFormComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    environment.production ? HttpModule : MockHttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  providers: [
    EngineService,
    UserService,
    IsRegisterdGuard,
    HistoryService
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {
}
