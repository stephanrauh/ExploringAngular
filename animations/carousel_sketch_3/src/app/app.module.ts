import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { TileComponent } from './tile/tile.component';
import { MultiCarouselComponent } from './multi-carousel/multi-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    TileComponent,
    MultiCarouselComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
