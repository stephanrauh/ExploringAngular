import {Component, OnInit, Input} from "@angular/core";
import {Http} from "@angular/http";
import * as d3 from 'd3';
import {generateData} from '../common/data';
import {colorSets as ngxChartsColorsets} from '@swimlane/ngx-charts/release/utils/color-sets';
import {ConsumptionDataService} from "../services/consumption-data-service";
import {Series} from "../common/Series";


@Component({
  selector: 'consumption ',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.css']
})
export class ConsumptionComponent implements OnInit {
  dateData: Series[];

  view = [1000, 500];

  public visible = false;

  // line interpolation
  curveType: string = 'Linear';
  curve = d3.curveLinear;

  colorScheme: any;
  schemeType: string = 'ordinal';
  selectedColorScheme: string;

  xAxisLabel: string;
  yAxisLabel: string;
  co2: boolean = false;

  redraw = () => { this.onClickConsumptionOverTime()};

  constructor(private consumptionDataService: ConsumptionDataService) {
    consumptionDataService.observable.subscribe(event => {
      this.onClickConsumptionOverTime();
      this.visible = true;
    });
    this.setColorScheme('cool');
  }

  ngOnInit(): void {
  }

  select(data): void {
    console.log('Item clicked', data);
  }

  setInterpolationType(curveType) {
    this.curveType = curveType;
    if (curveType === 'Basis') {
      this.curve = d3.curveBasis;
    }
    if (curveType === 'Cardinal') {
      this.curve = d3.curveCardinal;
    }
    if (curveType === 'Catmull Rom') {
      this.curve = d3.curveCatmullRom;
    }
    if (curveType === 'Linear') {
      this.curve = d3.curveLinear;
    }
    if (curveType === 'Monotone X') {
      this.curve = d3.curveMonotoneX;
    }
    if (curveType === 'Monotone Y') {
      this.curve = d3.curveMonotoneY;
    }
    if (curveType === 'Natural') {
      this.curve = d3.curveNatural;
    }
    if (curveType === 'Step') {
      this.curve = d3.curveStep;
    }
    if (curveType === 'Step After') {
      this.curve = d3.curveStepAfter;
    }
    if (curveType === 'Step Before') {
      this.curve = d3.curveStepBefore;
    }
  }

  setColorScheme(name) {
    this.selectedColorScheme = name;
    this.colorScheme = ngxChartsColorsets.find(s => s.name === name);
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }

  onClickConsumptionOverTime() {
    this.dateData = this.consumptionDataService.getConsumptionByDate(this.co2);
    this.yAxisLabel = this.co2 ? "CO2 (g / km)" : "l / 100km";
    this.xAxisLabel = "time";
    this.redraw = () => { this.onClickConsumptionOverTime()};
  }


  onClickConsumptionBySpeed() {
    this.dateData = this.consumptionDataService.getConsumptionBySpeed(this.co2);
    this.yAxisLabel = this.co2 ? "CO2 (g / km)" : "l / 100km";
    this.xAxisLabel = "speed (kph)";
    this.redraw = () => { this.onClickConsumptionBySpeed()};
  }

  onClickAverageConsumptionBySpeed(chunkSize: number, car: string, minMax: boolean) {
    this.dateData = this.consumptionDataService.getAverageConsumptionBySpeed(chunkSize, car, minMax, this.co2);
    this.yAxisLabel = this.co2 ? "CO2 (g / km)" : "l / 100km";
    this.xAxisLabel = "speed (kph)";
    this.redraw = () => { this.onClickAverageConsumptionBySpeed(chunkSize, car, minMax)};
  }

  onClickCO2(co2: boolean): void {
    this.co2 = co2;
    this.redraw();
  }
}
