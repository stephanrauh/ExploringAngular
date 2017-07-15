import {Component, OnInit} from '@angular/core';
import {LanguageService} from "../language/language.service";
import {UserService} from "../user/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'user-and-language',
  templateUrl: './user-and-language.component.html',
  styleUrls: ['./user-and-language.component.css']
})
export class UserAndLanguageComponent {

  constructor(public userService: UserService,
              public languageService: LanguageService) {
    Observable.combineLatest(userService.address$, languageService.language$)
      .map((address, language) => {
        console.log("address: " + address + " language: " + language)
      })
      .subscribe();
  };
}
