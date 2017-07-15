import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable, Subject} from "rxjs";
import {LanguageService} from "../language/language.service";
import {translation} from "./translation";

@Injectable()
export class TranslationsService {

  public translations = {};

  constructor(private http: Http,
              private languageService: LanguageService) {
    const translationTable$: Observable<any> = languageService.language$.flatMap(language => {
      const foreignTexts$: Observable<any> = http.get("https://example.com/rest/translations/" + language)
        .map(response => {
          console.log(response.json());
          return response.json();
        });
      return foreignTexts$;
    });

    translationTable$.subscribe(json => {
      this.translations = json;
    });
  }
}
