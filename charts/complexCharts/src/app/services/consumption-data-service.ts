import './jquery.csv.js'
import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {ConsumptionJsonEntry} from "./consumption-json-entry";
import {ConsumptionEntry} from "./consumption-entry";
import * as Rx from 'rxjs/Rx';
import {SeriesEntry} from '../common/SeriesEntry'
import {Series} from "../common/Series";

declare function csvToObjects(csv: string | string[], options ?: any, callback ?: any);

@Injectable()
export class ConsumptionDataService {

  public leon: ConsumptionEntry[] = [];

  public civic: ConsumptionEntry[] = [];

  public errorMessage: string = "";

  public observable: Rx.Subject<string> = new Rx.Subject<string>();

  constructor(http: Http) {
    http.get("assets/fuel/león_fuelings.csv").subscribe(
      csv => { this.leon = this.parse(csv, 23.3); this.observable.next("León is there");},
      error =>  this.errorMessage = <any>error);


    http.get("assets/fuel/civic_fuelings.csv").subscribe(
      csv => { this.civic = this.parse(csv, 26.4); this.observable.next("Civic is there");},
      error =>  this.errorMessage = <any>error);

  }

  private parse(csv: Response, co2PerKM): ConsumptionEntry[] {
    let germanHeader='Datum;Km-Stand;Teil-Km;Spritmenge;Kosten;Währung;Tankart;Reifen;Strecken;Fahrweise;Kraftstoff;Bemerkung;Verbrauch;BC-Verbrauch;BC-Spritmenge;BC-Geschwindigkeit;Tankstelle;Land;Großraum;Ort'
    let englishHeader='date;totalKM;distance;fuel;costs;currency;full;tires;road;drivingStyle;kindOfFuel;comment;consumption;consumptionAccordingToBC;fuelAmountAccordingToBC;averageSpeed;fuelStation;country;region;city'

    let content = csv.text();
    content = content.replace(germanHeader, englishHeader);
    content = content.replace(/"/g, "'");
    content = content.replace(/,/g, ".");
    let x = csvToObjects(content, {separator: ';'}) as ConsumptionJsonEntry[];
    let y: ConsumptionEntry[] = [];
    for (let row of x) {
      y.push(new ConsumptionEntry(row, co2PerKM));
    }
    return y;
  }

  public getConsumptionByDate(co2: boolean): Series[] {
    let result: Series[] = [];
    if (this.leon.length>0) {
      let values: SeriesEntry[] = [];
      for (let c of this.leon) {
        if (c.consumption>0) {
          values.push(new SeriesEntry(c.date, co2 ? c.co2 : c.consumption))
        }
      }
      let seriesLeon = new Series("León", values);
      result.push(seriesLeon);
    }


    if (this.civic.length>0) {
      let values: SeriesEntry[] = [];
      for (let c of this.civic) {
        if (c.consumption>0) {
          values.push(new SeriesEntry(c.date, co2 ? c.co2 : c.consumption))
        }
      }
      let seriesCivic = new Series("Civic", values);
      result.push(seriesCivic);
    }

    return result;
  }

  public getConsumptionBySpeed(co2: boolean): Series[] {
    let result: Series[] = [];
    if (this.leon.length>0) {
      let values: SeriesEntry[] = [];
      for (let c of this.leon.sort((a,b) => a.averageSpeed-b.averageSpeed)) {
        if (c.consumption>0  && c.averageSpeed>0) {
          values.push(new SeriesEntry(c.averageSpeed, co2 ? c.co2 : c.consumption))
        }
      }
      let seriesLeon = new Series("León", values);
      result.push(seriesLeon);
    }


    if (this.civic.length>0) {
      let values: SeriesEntry[] = [];
      for (let c of this.civic.sort((a,b) => a.averageSpeed-b.averageSpeed)) {
        if (c.consumption>0 && c.averageSpeed>0) {
          values.push(new SeriesEntry(c.averageSpeed, co2 ? c.co2 : c.consumption))
        }
      }
      let seriesCivic = new Series("Civic", values);
      result.push(seriesCivic);
    }

    return result;
  }

  public getAverageConsumptionBySpeed(chunkSize: number, car: string, minMax: boolean, co2: boolean): Series[] {
    let result: Series[] = [];
    if (car=="both" || car=="civic") {
      this.getAverageConsumptionBySpeedOfACar(this.civic, chunkSize, "Civic", result, minMax, co2);
    }

    if (car=="both" || car=="leon") {
      this.getAverageConsumptionBySpeedOfACar(this.leon, chunkSize, "León", result, minMax, co2);
    }
    return result;
  }

  private getAverageConsumptionBySpeedOfACar(currentCar: ConsumptionEntry[], chunkSize: number, currentCarName: string, result: Series[], minMax: boolean, co2: boolean): void {
    if (currentCar.length > 0) {
      let values: SeriesEntry[] = new Array<SeriesEntry>();
      let maxValues: SeriesEntry[] = new Array<SeriesEntry>();
      let minValues: SeriesEntry[] = new Array<SeriesEntry>();
      let hits: number[] = new Array<number>();
      for (let i = 0, start = 45; start < 120; i++, start += chunkSize) {
        values.push(new SeriesEntry(`${start} - ${start - 1 + chunkSize}`, 0));
        minValues.push(new SeriesEntry(`${start} - ${start - 1 + chunkSize}`, 0));
        maxValues.push(new SeriesEntry(`${start} - ${start - 1 + chunkSize}`, 0));
        hits.push(0);
      }

      for (let c of currentCar) {
        let consumption = co2? c.co2: c.consumption;
        if (consumption > 0 && c.averageSpeed > 0) {
          let index = Math.floor((c.averageSpeed - 45) / chunkSize)
          let chunk = values[index];
          if (hits[index] == 0) {
            chunk.value = consumption;
            minValues[index].value = consumption;
            maxValues[index].value = consumption;
          } else {
            chunk.value = ((hits[index] * chunk.value) + consumption) / (1 + hits[index]);
            minValues[index].value = Math.min(consumption, minValues[index].value);
            maxValues[index].value = Math.max(consumption, maxValues[index].value);
          }
          hits[index]++;
        }
      }

      result.push(new Series(currentCarName, values.filter(chunk => chunk.value > 0)));
      if (minMax) {
        result.push(new Series(currentCarName + " (max)", maxValues.filter(chunk => chunk.value > 0)));
        result.push(new Series(currentCarName + " (min)", minValues.filter(chunk => chunk.value > 0)));
      }
    }
  }
}
