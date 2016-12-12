import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LinechartComponent } from './linechart/linechart.component';
import {NG2D3Module} from "ng2d3";

@NgModule({
  declarations: [
    AppComponent,
    LinechartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NG2D3Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
