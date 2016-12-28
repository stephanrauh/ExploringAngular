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
      csv => { this.leon = this.parse(csv); this.observable.next("León is there");},
      error =>  this.errorMessage = <any>error);


    http.get("assets/fuel/civic_fuelings.csv").subscribe(
      csv => { this.civic = this.parse(csv); this.observable.next("Civic is there");},
      error =>  this.errorMessage = <any>error);

  }

  private parse(csv: Response): ConsumptionEntry[] {
    let germanHeader='Datum;Km-Stand;Teil-Km;Spritmenge;Kosten;Währung;Tankart;Reifen;Strecken;Fahrweise;Kraftstoff;Bemerkung;Verbrauch;BC-Verbrauch;BC-Spritmenge;BC-Geschwindigkeit;Tankstelle;Land;Großraum;Ort'
    let englishHeader='date;totalKM;distance;fuel;costs;currency;full;tires;road;drivingStyle;kindOfFuel;comment;consumption;consumptionAccordingToBC;fuelAmountAccordingToBC;averageSpeed;fuelStation;country;region;city'

    let content = csv.text();
    content = content.replace(germanHeader, englishHeader);
    content = content.replace(/"/g, "'");
    content = content.replace(/,/g, ".");
    let x = csvToObjects(content, {separator: ';'}) as ConsumptionJsonEntry[];
    let y: ConsumptionEntry[] = [];
    for (let row of x) {
      y.push(new ConsumptionEntry(row));
    }
    return y;
  }

  public getConsumptionByDate(): Series[] {
    let result: Series[] = [];
    if (this.leon.length>0) {
      let values: SeriesEntry[] = [];
      for (let c of this.leon) {
        if (c.consumption>0) {
          values.push(new SeriesEntry(c.date, c.consumption))
        }
      }
      let seriesLeon = new Series("León", values);
      result.push(seriesLeon);
    }


    if (this.civic.length>0) {
      let values: SeriesEntry[] = [];
      for (let c of this.civic) {
        if (c.consumption>0) {
          values.push(new SeriesEntry(c.date, c.consumption))
        }
      }
      let seriesCivic = new Series("Civic", values);
      result.push(seriesCivic);
    }

    return result;
  }

  public getConsumptionBySpeed(): Series[] {
    let result: Series[] = [];
    if (this.leon.length>0) {
      let values: SeriesEntry[] = [];
      for (let c of this.leon.sort((a,b) => a.averageSpeed-b.averageSpeed)) {
        if (c.consumption>0  && c.averageSpeed>0) {
          console.log("León: " + c.averageSpeed)
          values.push(new SeriesEntry(new String(c.averageSpeed).toString(), c.consumption))
        }
      }
      let seriesLeon = new Series("León", values);
      result.push(seriesLeon);
    }


    if (this.civic.length>0) {
      let values: SeriesEntry[] = [];
      for (let c of this.civic.sort((a,b) => a.averageSpeed-b.averageSpeed)) {
        if (c.consumption>0 && c.averageSpeed>0) {
          values.push(new SeriesEntry(new String(c.averageSpeed).toString(), c.consumption))
        }
      }
      let seriesCivic = new Series("Civic", values);
      result.push(seriesCivic);
    }

    return result;
  }


}
