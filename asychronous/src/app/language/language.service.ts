import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class LanguageService {

  public language$: Observable<string>;

  constructor(private http: Http) {
    this.language$ = http.get("https://example.com/rest/user/language")
      .map(response => response.json().language as string);
    //this.language$.subscribe(json => {console.log(json);});
  }

}
