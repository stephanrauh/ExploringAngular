import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  public firstname: String;

  public lastname: String;

  public score: number = 0;

  constructor() { }

  public isRegistered(): boolean {
    if (!!this.firstname) return true;
    if (!!this.lastname) return true;
    return false;
  }
}
