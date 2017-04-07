import { Component, OnInit } from '@angular/core';
import {UserService} from './user.service';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  public firstname: string;

  public lastname: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  public register(): void {
    this.userService.firstname = this.firstname;

     this.userService.lastname = this.lastname;
 //   if (this.userService.isRegistered()) {
      this.router.navigate(["play"]);
  }

}
