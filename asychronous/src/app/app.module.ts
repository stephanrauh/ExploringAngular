import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MockHttpModule} from "./mock-http/mock-http.module";
import {UserComponent} from './user/user.component';
import {UserService} from "./user/user.service";
import {UserAndLanguageComponent} from './user-and-language/user-and-language.component';
import {UserLanguageAndTranslationComponent} from './user-language-and-translation/user-language-and-translation.component';
import {LanguageService} from "./language/language.service";
import {TranslationsService} from "./translations/translations.service";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserAndLanguageComponent,
    UserLanguageAndTranslationComponent
  ],
  imports: [
    BrowserModule,
    MockHttpModule
  ],
  providers: [
    UserService,
    LanguageService,
    TranslationsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
