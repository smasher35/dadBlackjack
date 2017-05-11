import { Component,Input, OnInit } from '@angular/core';
import { WebSocketService } from '../notifications/websocket.service';

import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'gameChat',
    templateUrl: 'gameChat.component.html'
})

export class GameChatComponent {
    @Input() idGame: any;
    public message: string;
    public playersCChannel: string[] = [];
    public chatCChannel: string[] = [];
    private Path: string;
    public authToken: string = sessionStorage.getItem('id_token');


    constructor(public router: Router, public http: Http, private websocketService: WebSocketService) { 
        this.Path = 'http://localhost:7777/api/v1/';
    }

    send(): void {
        this.websocketService.sendGameChatMessage({id: this.idGame,msg: this.message, name: sessionStorage.getItem('name')});
        this.message = '';
    }

    ngOnInit() {
        
        this.websocketService.getGameChatMessages().subscribe((m: any) => this.chatCChannel.push(<string>m));
        this.websocketService.getGamePlayersMessages().subscribe((m: any) => this.playersCChannel.push(<string>m));
        this.websocketService.sendGamePlayersMessage({id: this.idGame,msg: '', name: sessionStorage.getItem('name')});
    }
}