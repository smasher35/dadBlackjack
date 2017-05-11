import { Component, Input, OnInit } from '@angular/core';
import {WebSocketService } from '../notifications/websocket.service';
import { NewGameComponent } from './../game/newGame.component';
import { GameService } from "./../_services/game.service";
import { elementAt } from 'rxjs/operator/elementAt';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'board',
    templateUrl: 'board.component.html',
    styleUrls: ['board.component.css']
})
export class BoardComponent implements OnInit{
    public elementos: number[] = [];
    public creatorName ='';
    public creatorAvatar :any;
    public player2Name='';
    public player2Avatar: any;
    public player3Name='';
    public player3Avatar: any;
    public player4Name='';
    public player4Avatar: any;
    private subscriber: any; 
    public id: any;
    public game: any;
    public loggedUser='';
    public hand:any;

      
    constructor(private websocketService: WebSocketService, private gameService: GameService, private route: ActivatedRoute,
        private router: Router ) {
       
    }

    ngOnInit() {
       // get URL parameters
        this.subscriber = this.route
            .params
            .subscribe(params => {

                this.id = params['id'];

            });
        this.websocketService.getBoardMessages().subscribe((m:any) => {
            console.log(m);
            this.elementos = m;
        });


        

        this.websocketService.joinGameMessages().subscribe((m: any) => {
            this.game =  m

            this.creatorName = m.players[0].name;
            this.creatorAvatar = m.players[0].avatar;
            if(m.players[1] != undefined){
                this.player2Name = m.players[1].name;
            this.player2Avatar = m.players[1].avatar;
            }
             if(m.players[2] != undefined){
                this.player3Name = m.players[2].name;
            this.player3Avatar = m.players[2].avatar;
            }
             if(m.players[3] != undefined){
                this.player4Name = m.players[3].name;
            this.player4Avatar = m.players[3].avatar;
            }                
        });

    
        this.websocketService.postJoinGame({ id: this.id, msg: 'Entrei', name: sessionStorage.getItem('name'), idPlayer: sessionStorage.getItem('_id') });

        this.websocketService.joinGetHandMessage().subscribe((m:any)=>{

            this.hand=m;
             console.log(this.hand);

        });

             
        // this.getCreatorName();
        // this.getCreatorAvatar();
        // this.getPlayer2Name();
        // this.getPlayer2Avatar();
        // this.getPlayer3Name();
        // this.getPlayer3Avatar();
        // this.getPlayer4Name();
        // this.getPlayer4Avatar();

    }
    
    clickElemento(index: number){
        this.websocketService.sendClickElementMessage(index);
        console.log(this.game);
    }

    getColor(elemento: number){
        switch (elemento) {
            case 0: return 'lightgray';
            case 1: return 'blue';
            case 2: return 'red';
        }
        return 'white';
    }


    asDeEspadas() {

    this.loggedUser = sessionStorage.getItem('name');
        
    }

    getCreatorName(){
        this.creatorName = this.gameService.getCreatorName();
    }

    getCreatorAvatar() {
        this.creatorAvatar = this.gameService.getCreatorAvatar();
    }

    getPlayer2Name() {
        this.player2Name = this.gameService.getPlayer2Name();
    }

    getPlayer2Avatar() {
        this.player2Avatar = this.gameService.getPlayer2Avatar();
    }

     getPlayer3Name() {
        this.player3Name = this.gameService.getPlayer3Name();
    }

    getPlayer3Avatar() {
        this.player3Avatar = this.gameService.getPlayer3Avatar();
    }

     getPlayer4Name() {
        this.player4Name = this.gameService.getPlayer4Name();
    }

    getPlayer4Avatar() {
        this.player4Avatar = this.gameService.getPlayer4Avatar();
    }
    hasPlayer2(){
        console.log(this.gameService.hasPlayer2());
        return this.gameService.hasPlayer2();
    }
    hasPlayer3(){
        console.log(this.gameService.hasPlayer3());
        return this.gameService.hasPlayer3();
    }
    hasPlayer4(){
        console.log(this.gameService.hasPlayer4());
        return this.gameService.hasPlayer4();
    }
    startGame(){


    }
    /*updateGame(body: any, gameId: any) {
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

    }*/
}



