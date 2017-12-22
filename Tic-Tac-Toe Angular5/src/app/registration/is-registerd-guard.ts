import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class IsRegisterdGuard implements CanActivate {
  constructor(private userService: UserService, private snackBar: MatSnackBar) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userService.isRegistered()) {
      return true;
    }
    const config = new MatSnackBarConfig();
    config.duration = 1000;
    const snackBarRef = this.snackBar.open('You must fill both name fields before playing.', '', config);
    return false;
  }
}
