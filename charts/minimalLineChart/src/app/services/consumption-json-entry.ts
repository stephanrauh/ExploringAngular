export class ConsumptionJsonEntry {
  date: string;
  totalKM: string;
  distance: string;
  fuel: string;
  costs: string;
  currency: string;
  full: string;
  tires: string;
  road: string;
  drivingStyle: string;
  kindOfFuel: string;
  comment: string;
  consumption: string;
  consumptionAccordingToBC: string;
  fuelAmountAccordingToBC: string;
  averageSpeed: string;
  fuelStation: string;
  country: string;
  region: string;
  city: string;

  get date(): Date {
     let us_date = this.date.reverse().join('-');
     let d = new Date(us_date);
     return d;
  }
}
