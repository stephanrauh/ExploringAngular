import { Injectable } from '@angular/core';
import {CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {UserService} from './user.service';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';

@Injectable()
export class IsRegisterdGuard implements CanActivate {

  constructor(private userService: UserService, private snackBar: MdSnackBar) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userService.isRegistered()) {
      return true;
    }
    let config = new MdSnackBarConfig();
    config.duration=1000;
    let snackBarRef = this.snackBar.open('You must fill both name fields before playing.', "",
      config);
    return false;
  }
}
