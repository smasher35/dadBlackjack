import { Component } from '@angular/core';
import { AuthenticationService } from "./../_services/authentication.service";
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import {Routes, RouterModule } from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'gameHistory',
    templateUrl: 'gameHistory.component.html'
})

export class GameHistoryComponent {
    private allGames: any[] = [];
    private userGames: any[] = [];
    private Path: string;
    private userId = sessionStorage.getItem('_id');
    

    constructor(private authentication: AuthenticationService, public router: Router, public http: Http) {
        this.Path = 'http://localhost:7777/api/v1/';
        this.getAllGames();
    }

    


    getAllGames() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http
            .get(this.Path + 'finishedGames', <RequestOptionsArgs>{ headers: headers, withCredentials: false })
            .subscribe(
            response => {
                this.allGames = response.json();
                console.log(response.json());
            },
            error => {
                //alert(error.text());
                console.log(error.text());
            }
            );

    }




}