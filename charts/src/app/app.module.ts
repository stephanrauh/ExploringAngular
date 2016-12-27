import {NgModule} from '@angular/core';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {ConsumptionComponent} from "./consumption/consumption.component";

@NgModule({
  declarations: [
    AppComponent,
    ConsumptionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxChartsModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
 })
export class AppModule {
}
