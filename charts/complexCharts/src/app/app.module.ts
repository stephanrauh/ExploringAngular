import {NgModule} from '@angular/core';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {ConsumptionComponent} from "./consumption/consumption.component";
import {ConsumptionDataService} from "./services/consumption-data-service";
import {LineRangeChartModule} from "./line-range-chart/line-range-chart.module";

@NgModule({
  declarations: [
    AppComponent,
    ConsumptionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxChartsModule,
    LineRangeChartModule
  ],
  exports: [],
  providers: [ConsumptionDataService],
  bootstrap: [AppComponent]
 })
export class AppModule {
}
