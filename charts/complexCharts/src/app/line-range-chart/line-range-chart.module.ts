import { NgModule } from '@angular/core';
import { LineRangeComponent } from './line-range.component';
import { LineRangeChartComponent } from './line-range-chart.component';
import { LineRangeSeriesComponent } from './line-range-series.component';
//import { ChartCommonModule } from '@swimlane/ngx-charts/release/common/chart-common.module';
import {NgxChartsModule} from "@swimlane/ngx-charts";

export { LineRangeComponent, LineRangeChartComponent, LineRangeSeriesComponent };

@NgModule({
  imports: [NgxChartsModule],
  declarations: [
    LineRangeComponent,
    LineRangeChartComponent,
    LineRangeSeriesComponent
  ],
  exports: [
    LineRangeComponent,
    LineRangeChartComponent,
    LineRangeSeriesComponent
  ]
})
export class LineRangeChartModule {}
