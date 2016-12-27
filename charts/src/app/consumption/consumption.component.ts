import {Component, OnInit, Input} from "@angular/core";
import {Http} from "@angular/http";
import d3 from '../common/d3';
import {single, multi, countries, generateData, generateGraph} from '../common/data';
import chartGroups from '../common/chartTypes'
import { colorSets } from '@swimlane/ngx-charts/release/utils/color-sets';


@Component({
  selector: 'consumption ',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.css']
})
export class ConsumptionComponent implements OnInit {
  theme = 'dark';
  chartType = 'bar-vertical';
  chartGroups: any[];
  chart: any;
  realTimeData: boolean = false;
  countries: any[];
  single: any[];
  multi: any[];
  dateData: any[];
  graph: { links: any[], nodes: any[] };
  linearScale: boolean = false;

  view: any[];
  width: number = 700;
  height: number = 300;
  fitContainer: boolean = false;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'GDP Per Capita';
  showGridLines = true;

  // line interpolation
  curveType: string = 'Linear';
  curve = d3.shape.curveLinear;
  interpolationTypes = [
    'Basis', 'Bundle', 'Cardinal', 'Catmull Rom', 'Linear', 'Monotone X',
    'Monotone Y', 'Natural', 'Step', 'Step After', 'Step Before'
  ];

  colorSets: any;
  colorScheme: any;
  schemeType: string = 'ordinal';
  selectedColorScheme: string;

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  // line, area
  autoScale = true;
  timeline = false;

  // gauge
  gaugeMin: number = 0;
  gaugeMax: number = 100;
  gaugeLargeSegments: number = 10;
  gaugeSmallSegments: number = 5;
  gaugeUnits: string = 'alerts';
  gaugeAngleSpan: number = 240;
  gaugeStartAngle: number = -120;
  gaugeShowAxis: boolean = true;
  gaugeValue: number = 50; // linear gauge value
  gaugePreviousValue: number = 70;

  constructor() {
    Object.assign(this, {
      single,
      multi,
      countries,
      chartGroups,
      colorSets,
      graph: generateGraph(50)
    });

    this.dateData = generateData(5);
    this.setColorScheme('cool');
  }

  ngOnInit() {
    this.selectChart(this.chartType);

    setInterval(this.updateData.bind(this), 1000);

    if (!this.fitContainer) {
      this.applyDimensions();
    }
  }

  updateData() {
    if (!this.realTimeData) {
      return;
    }

    this.gaugeValue = this.gaugeMin + Math.floor(Math.random() * (this.gaugeMax - this.gaugeMin));

    let country = this.countries[Math.floor(Math.random() * this.countries.length)];
    let add = Math.random() < 0.7;
    let remove = Math.random() < 0.5;

    if (remove) {
      if (this.single.length > 1) {
        let index = Math.floor(Math.random() * this.single.length);
        this.single.splice(index, 1);
        this.single = [...this.single];
      }

      if (this.multi.length > 1) {
        let index = Math.floor(Math.random() * this.multi.length);
        this.multi.splice(index, 1);
        this.multi = [...this.multi];
      }

      if (this.graph.nodes.length > 1) {
        let index = Math.floor(Math.random() * this.graph.nodes.length);
        let value = this.graph.nodes[index].value;
        this.graph.nodes.splice(index, 1);
        const nodes = [ ...this.graph.nodes ];

        const links = this.graph.links.filter(link => {
          return link.source !== value && link.source.value !== value &&
            link.target !== value && link.target.value !== value;
        });
        this.graph = { links, nodes };
      }
    }

    if (add) {
      // single
      let entry = {
        name: country,
        value: Math.floor(10000 + Math.random() * 50000)
      };
      this.single = [...this.single, entry];

      // multi
      let multiEntry = {
        name: country,
        series: [{
          name: '2010',
          value: Math.floor(1000000 + Math.random() * 20000000)
        }, {
          name: '2011',
          value: Math.floor(1000000 + Math.random() * 20000000)
        }]
      };

      this.multi = [...this.multi, multiEntry];

      // graph
      const node = { value: country };
      const nodes = [ ...this.graph.nodes, node];
      const link = {
        source: country,
        target: nodes[Math.floor(Math.random() * (nodes.length - 1))].value,
      };
      const links = [ ...this.graph.links, link];
      this.graph = { links, nodes };
    }
  }

  applyDimensions() {
    this.view = [this.width, this.height];
  }

  toggleFitContainer(event) {
    this.fitContainer = event;

    if (this.fitContainer) {
      this.view = undefined;
    } else {
      this.applyDimensions();
    }
  }

  selectChart(chartSelector) {
    this.chartType = chartSelector;

    this.linearScale = this.chartType === 'line-chart' ||
      this.chartType === 'area-chart' ||
      this.chartType === 'area-chart-normalized' ||
      this.chartType === 'area-chart-stacked';

    for (let group of this.chartGroups) {
      for (let chart of group.charts) {
        if (chart.selector === chartSelector) {
          this.chart = chart;
          return;
        }
      }
    }
  }

  select(data) {
    console.log('Item clicked', data);
  }

  setInterpolationType(curveType) {
    this.curveType = curveType;
    if (curveType === 'Basis') {
      this.curve = d3.shape.curveBasis;
    }
    if (curveType === 'Bundle') {
      this.curve = d3.shape.curveBundle.beta(1);
    }
    if (curveType === 'Cardinal') {
      this.curve = d3.shape.curveCardinal;
    }
    if (curveType === 'Catmull Rom') {
      this.curve = d3.shape.curveCatmullRom;
    }
    if (curveType === 'Linear') {
      this.curve = d3.shape.curveLinear;
    }
    if (curveType === 'Monotone X') {
      this.curve = d3.shape.curveMonotoneX;
    }
    if (curveType === 'Monotone Y') {
      this.curve = d3.shape.curveMonotoneY;
    }
    if (curveType === 'Natural') {
      this.curve = d3.shape.curveNatural;
    }
    if (curveType === 'Step') {
      this.curve = d3.shape.curveStep;
    }
    if (curveType === 'Step After') {
      this.curve = d3.shape.curveStepAfter;
    }
    if (curveType === 'Step Before') {
      this.curve = d3.shape.curveStepBefore;
    }
  }

  setColorScheme(name) {
    this.selectedColorScheme = name;
    this.colorScheme = this.colorSets.find(s => s.name === name);
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }

}
