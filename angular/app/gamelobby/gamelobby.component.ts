import { elementAt } from 'rxjs/operator/elementAt';
import { Player } from '../../../node/app.players';
import { Component } from '@angular/core';
import { TopTenComponent } from "./../topten/topten.component";
import { AuthenticationService } from "./../_services/authentication.service";
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import {Routes, RouterModule } from '@angular/router';
import { GameService } from "./../_services/game.service";



@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: `gamelobby.component.html`
})
export class GameLobbyComponent { 
        public player = sessionStorage.getItem('name');
        public avatar = sessionStorage.getItem('avatar');
        private uid = sessionStorage.getItem('_id');
        public authToken:string = sessionStorage.getItem('id_token');
        public pathLogout = 'http://localhost:7777/api/v1/';
        public isLogged = true;
        private allGamesPending: any[] = [];
        private allGamesRunning: any[] = [];
        private userGames: any[] = [];
        private Path: string;
        private gameId:any;
        public body:any;
        public idPlayers :any;
        public idPlayerInArray: boolean;



    constructor (private authentication: AuthenticationService, public router: Router,public http: Http, private game : GameService){
       this.Path = 'http://localhost:7777/api/v1/';
       this.getGamesPending();
       this.getGamesRunnig();

    }

    getGamesPending() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http
            .get(this.Path + 'pendingGames', <RequestOptionsArgs>{ headers: headers, withCredentials: false })
            .subscribe(
            response => {
                this.allGamesPending = response.json();
                console.log(response.json());
            },
            error => {
                //alert(error.text());
                console.log(error.text());
            }
            );


    }
    getGamesRunnig() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http
            .get(this.Path + 'runningGames', <RequestOptionsArgs>{ headers: headers, withCredentials: false })
            .subscribe(
            response => {
                this.allGamesRunning = response.json();
                console.log(response.json());
            },
            error => {
                //alert(error.text());
                console.log(error.text());
            }
            );

    }
    joinGame(gameId : any ){
        var joinButton = document.getElementById('joinGame');
        var totPlayers: any;
        let player: any;  
        this.gameId = gameId;
        let headers = new Headers();
        var games: any[] = [];
        var i=1;
        var playerID = sessionStorage.getItem('_id');
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + this.authToken);
        this.http.get(this.Path + 'games/' + gameId, <RequestOptionsArgs>{ headers: headers, withCredentials: false })
            .subscribe(
            response => {
                //get the total players number
                totPlayers = response.json().players.length;
                games = response.json().players;

                for (let gamer of games) {
                    if(gamer.uid == playerID) {
                        alert ("THIS PLAYER ALREADY JOINED THIS GAME!!");
                        return;
                    }
                }
                
               //verificar se o jogo está cheio
               if (totPlayers < 4) {
                    this.getGame(this.gameId);
                    this.userGames = [{player: player}];
                    this.body = JSON.stringify({ players: this.userGames, state: 'pending' });
                    this.updateGame(this.body, this.gameId);
                    for (let item of games) {
                            if (i==0) {
                                console.log(item.name);
                                this.game.setCreatorNameAndAvatar(item.name, item.avatar);
                            }

                            if (i==1) {
                                console.log(item.name);
                                this.game.setPlayer2NameAndAvatar(item.name, item.avatar);
                            }

                            if (i==2) {
                                console.log(item.name);
                                this.game.setPlayer3NameAndAvatar(item.name, item.avatar);
                            }

                            if (i==3) {
                                console.log(item.name);
                                this.game.setPlayer4NameAndAvatar(item.name, item.avatar);
                                this.body = JSON.stringify({ players: this.userGames, state: 'playing' });
                                this.updateGame(this.body, this.gameId);
                            }
                            i++;
                        }
                
                }else {
                    alert ('TOTAL PLAYERS MAXED OUT');
                }
        },
            error => {
                
                console.log(error.text());
            }
            );       
        console.log(gameId);
    }




    getGame(gameId : any) {
        var joinButton = document.getElementById('joinGame');
        let headers = new Headers();
        var totPlayers: any;
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + this.authToken);
        this.http.get(this.Path + 'games/' + gameId, <RequestOptionsArgs>{ headers: headers, withCredentials: false })
            .subscribe(
            response => {

                totPlayers = response.json().players.length;

                if (response.json().players.length < 4) {
                    this.userGames = response.json().players;
                    console.log(this.userGames);
                    this.userGames.push({
                        uid: this.uid, name: this.player,
                        statusDate: Date.now(), money: 100, avatar: this.avatar
                    });       
                    this.body = JSON.stringify({ players: this.userGames, state: 'pending' });
                    this.updateGame(this.body, gameId);
                
                }else {
                    var joinButton = document.getElementById('joinGame').hidden;
                }

            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
            );  
    }

    updateGame(body: any, gameId: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + this.authToken);
        this.http.put(this.Path + 'games/' + gameId, body, <RequestOptionsArgs>{ headers: headers, withCredentials: false })
            .subscribe(
            response => {
                this.router.navigate(['board', gameId]);

            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
            );

    }

    getIdPlayersGame(userGames: any){

        

        this.idPlayers=userGames.keys('uid');

        return this.idPlayers;

    }
    compareArrayPlayers(idPlayers : any, uid:any){

        for (var i = 0; i >= idPlayers.length; i++) {
            if(uid == idPlayers[i]) {
                this.idPlayerInArray= true;
            }
            this.idPlayerInArray= false;
        }


    }

    logout(event: any, username: any, password: any) {
      this.authentication.logout();
  }
}
