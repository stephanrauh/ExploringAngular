import '../common/jquery.csv.js'
import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {ConsumptionJsonEntry} from "../common/consumption-json-entry";
import {ConsumptionEntry} from "../common/consumption-entry";

declare function csvToObjects(csv: string | string[], options ?: any, callback ?: any);

@Injectable()
export class ConsumptionData {

  public leon: ConsumptionEntry[];

  public errorMessage: string = "";

  constructor(http: Http) {
    http.get("assets/fuel/león_fuelings.csv").subscribe(
      csv => this.parse(csv),
      error =>  this.errorMessage = <any>error);
  }

  private parse(csv: Response) {
    //csv.json();

    let germanHeader='Datum;Km-Stand;Teil-Km;Spritmenge;Kosten;Währung;Tankart;Reifen;Strecken;Fahrweise;Kraftstoff;Bemerkung;Verbrauch;BC-Verbrauch;BC-Spritmenge;BC-Geschwindigkeit;Tankstelle;Land;Großraum;Ort'
    let englishHeader='date;totalKM;distance;fuel;costs;currency;full;tires;road;drivingStyle;kindOfFuel;comment;consumption;consumptionAccordingToBC;fuelAmountAccordingToBC;fuelStation;country;region;city'


    let content = csv.text();
    content = content.replace(germanHeader, englishHeader);
    content = content.replace('"', "'");
    let x = csvToObjects(content, {separator: ';'}) as ConsumptionJsonEntry[];
    let y: ConsumptionEntry[] = [];
    for (let row of x) {
      y.push(new ConsumptionEntry(row));
    }
    this.leon = y;
  }
}
