
import { Component, Input, OnInit } from '@angular/core';
import {WebSocketService } from '../notifications/websocket.service';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';


import { FormsModule } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: `topten.component.html`
})
export class TopTenComponent {
    public highScores: any []= [];

    constructor (public http: Http){
        this.getHighScores();
    }

    getHighScores () {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.get('http://localhost:7777/api/v1/top10', <RequestOptionsArgs>{ headers: headers, withCredentials: false})
        .subscribe(
            response => {
                this.highScores = response.json();
            }, 
            error => {
                alert(error.text());
                console.log(error.text());
            }
        );
    }




}
 

 