import { Component } from '@angular/core';
import { ValidationService } from "./../_services/validation.service";
import { router } from "./../app.router";
import { FormsModule } from '@angular/forms';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import {Routes, RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: `signup.component.html`
})
export class SignUpComponent { 
    public serverPath: string;
    
    
    constructor(public router: Router, public http: Http, private validation: ValidationService) {
          this.serverPath = 'http://localhost:7777/api/v1/players'

    }

   
    
    createPlayer(name: any, username: any, passwordHash: any, confirmpassword: any, email: any) {
        console.log("Entrou - SIGNUP");
        let avatar = "avatar_def.png";
        let totalVictories = 0;
        let totalPoints =  0;

        let body = JSON.stringify({ name, username, passwordHash, email, avatar, totalVictories, totalPoints });
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http
            .post(this.serverPath, body, <RequestOptionsArgs>{ headers: headers, withCredentials: false })
            .subscribe(
            response => {
                this.router.navigate(['login']);
            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
            );


        }
    }
