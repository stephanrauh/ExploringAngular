import {ConsumptionJsonEntry} from "./consumption-json-entry";

export class ConsumptionEntry {
  public date: Date;
  public totalKM: number;
  public distance: number;
  public fuel: number;
  public costs: number;
  public currency: string;
  public full: boolean;
  public tires: string;
  public road: string;
  public drivingStyle: string;
//  comment: string;
  public consumption: number;
  public consumptionAccordingToBC: number;
  public fuelAmountAccordingToBC: number;
  public averageSpeed: number;
  public co2: number;

  constructor(c: ConsumptionJsonEntry, co2PerKM: number) {
    let us_date = c.date.split('.').reverse().join('-');
    this.date = new Date(us_date);
    this.totalKM = +c.totalKM;
    this.distance = +c.totalKM;
    this.costs = +c.costs;
    this.currency = c.currency;
    this.fuel = +c.fuel;
    this.full = c.fuel == '1';
    this.tires = c.tires == '1' ? 'summer' : 'winter'
    this.drivingStyle = c.drivingStyle == '1' ? 'economical' : (c.drivingStyle == '2' ? 'normal' : 'fast');
    this.consumption = +c.consumption;
    this.consumptionAccordingToBC = +c.consumptionAccordingToBC;
    this.fuelAmountAccordingToBC = +c.fuelAmountAccordingToBC;
    this.averageSpeed = +c.averageSpeed;
    this.co2 = this.consumption * co2PerKM;
  }
}
