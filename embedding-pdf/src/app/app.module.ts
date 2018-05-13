import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TextWindowComponent } from './text-window/text-window.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  declarations: [AppComponent, TextWindowComponent],
  imports: [BrowserModule, NgxExtendedPdfViewerModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
