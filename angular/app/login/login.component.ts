import { Component } from '@angular/core';
import { router } from "./../app.router";
import { FormsModule } from '@angular/forms';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import {Routes, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from './../_services/authentication.service';



@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: `login.component.html`
})
export class LoginComponent {
    public player = '';
    public islogged = false;

     constructor (public router: Router,public http: Http, private authenticationService: AuthenticationService){
       
    }

    login(event: any, username: any, password: any) {
        this.authenticationService.login(event, username, password);
  }
 }