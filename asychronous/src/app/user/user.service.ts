import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Http} from "@angular/http";
import {Address} from "./address";

@Injectable()
export class UserService {

  public address$: Observable<Address>;

  constructor(private http: Http) {
    this.address$ = http.get("https://example.com/rest/user/address")
      .map(response => response.json() as Address);
  }

}
