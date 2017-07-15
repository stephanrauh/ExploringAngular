import {Component, OnInit} from '@angular/core';
import {UserService} from "../user/user.service";
import {LanguageService} from "../language/language.service";
import {TranslationsService} from "../translations/translations.service";

@Component({
  selector: 'user-language-and-translation',
  templateUrl: './user-language-and-translation.component.html',
  styleUrls: ['./user-language-and-translation.component.css']
})
export class UserLanguageAndTranslationComponent {

  constructor(public userService: UserService,
              public languageService: LanguageService,
              public translationService: TranslationsService) {
  }

}
