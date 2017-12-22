import * as path from 'path';
import * as http from 'http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GridComponent } from './gameplay/grid/grid.component';
import { EngineService } from './gameplay/engine.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockHttpModule } from './mock-http/mock-http.module';
import 'hammerjs';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { RegistrationFormComponent } from './registration/registration-form.component';
import { RouterModule, Routes } from '@angular/router';
import { IsRegisterdGuard } from './registration/is-registerd-guard';
import { UserService } from './registration/user.service';
import { HighscoreComponent } from './highscore/highscore.component';
import { HistoryService } from './gameplay/history.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgModule } from '@angular/core';
import {
  MatToolbar,
  MatSidenav,
  MatSidenavContainer,
  MatListItem,
  MatList,
  MatIcon,
  MatListDivider,
  MatChip,
  MatCardHeader,
  MatCard,
  MatCardContent,
  MatChipList,
  MatCardActions,
  MatInputModule,
  MatSidenavContent,
  MatRippleModule,
  MatListModule,
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatChipsModule,
  MatSnackBarModule,
  MatButtonModule
} from '@angular/material';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'registration' },
  { path: 'registration', component: RegistrationFormComponent },
  { path: 'play', component: GameBoardComponent, canActivate: [IsRegisterdGuard] },
  { path: 'highscore', loadChildren: 'app/highscore/highscore.module#HighscoreModule', canActivate: [IsRegisterdGuard] }
];

export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, GridComponent, SidebarComponent, GameBoardComponent, RegistrationFormComponent],
  imports: [
    BrowserModule,
    FormsModule,
    environment.production ? HttpClientModule : MockHttpModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatRippleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatChipsModule,
    MatSnackBarModule,
    MatButtonModule,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [EngineService, UserService, IsRegisterdGuard, HistoryService],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
