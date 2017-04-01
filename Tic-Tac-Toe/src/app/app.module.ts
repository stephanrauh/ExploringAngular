import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {GridComponent} from './gameplay/grid/grid.component';
import {EngineService} from './gameplay/engine.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';
import {environment} from '../environments/environment';
import {MockHttpModule} from './mock-http/mock-http.module';
import 'hammerjs';
import {SidebarComponent} from './sidebar/sidebar.component';
import {PlaygroundComponent} from './playground/playground.component';
import {RegistrationFormComponent} from './registration/registration-form.component';
import {RouterModule, Routes} from '@angular/router';
import {IsRegisterdGuard} from './registration/is-registerd-guard';
import {UserService} from './registration/user.service';
import {HighscoreComponent} from './highscore/highscore.component';
import {HistoryService} from './gameplay/history.service';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'registration'},
  {path: 'registration', component: RegistrationFormComponent},
  {path: 'play', component: PlaygroundComponent, canActivate: [IsRegisterdGuard]},
  {path: 'highscore', component: HighscoreComponent, canActivate: [IsRegisterdGuard]}
];


@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    SidebarComponent,
    PlaygroundComponent,
    RegistrationFormComponent,
    HighscoreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    environment.production ? HttpModule : MockHttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(routes)

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
