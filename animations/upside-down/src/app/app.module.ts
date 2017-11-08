import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FrontSideComponent } from './front-side/front-side.component';
import { BackSideComponent } from './back-side/back-side.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontSideComponent,
    BackSideComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
