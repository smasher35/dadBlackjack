import { Component } from '@angular/core';
import { router } from "./../app.router";
import { FormsModule } from '@angular/forms';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import {Routes, RouterModule } from '@angular/router';
import { Router } from '@angular/router';



@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: `logout.component.html`
})
export class LogOutComponent {
    public player = '';
    public islogged = false;
    public pathLogout = 'http://localhost:7777/api/v1/';
    public isLogged = true;

     constructor (public router: Router,public http: Http){
       
    }



logout() {

    let authToken = sessionStorage.getItem('id_token');
    console.log(authToken);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'bearer ' + authToken);
    let body = JSON.stringify({});
    console.log(headers);

    this.http
      .post(this.pathLogout + 'logout', body,
      <RequestOptionsArgs>{ headers: headers, withCredentials: false })
      .subscribe(response => {


        if (response.ok) {
          alert("Logout success");


          this.isLogged = false;
          sessionStorage.clear();
          this.router.navigate(['login']);
        }

      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
      );
  }
}