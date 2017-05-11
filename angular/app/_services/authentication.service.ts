import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import {Routes, RouterModule } from '@angular/router';

@Injectable()
export class AuthenticationService {
  private isLogged = false;
  private pathLogin: string;
  private pathLogout: string;
  constructor(public router: Router, private http: Http) {
    this.isLogged = !!localStorage.getItem('id_token'); 
    this.pathLogin = 'http://localhost:7777/api/v1/login';
    this.pathLogout = 'http://localhost:7777/api/v1/';
  }


    login(event: any, username: any, password: any) {
        console.log("Entrou - LOGIN");
        let body = JSON.stringify({username, password});
        let name = JSON.stringify({password});
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post('http://localhost:7777/api/v1/login', body, {headers: headers})
        .subscribe(
            response => {
                if (response.ok) {
                    sessionStorage.setItem('_id', response.json()._id);
                    sessionStorage.setItem('id_token', response.json().token);
                    sessionStorage.setItem('name', response.json().name);
                    sessionStorage.setItem('totalvictories', response.json().totalvictories);
                    sessionStorage.setItem('username', response.json().username);
                    sessionStorage.setItem('avatar', response.json().avatar);
                }

                console.log('response-->' + response);
                this.isLogged = true;
                this.router.navigate(['gamelobby']);
            }, 
            error => {
                alert(error.text());
                console.log(error.text());
            }
        );
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


    isLoggedIn() {
        return this.isLogged;
  }
}