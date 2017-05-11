import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Observable';

import * as io from 'socket.io-client';

@Injectable()
export class WebSocketService {
    private socket: SocketIOClient.Socket;
    constructor() {
        if (!this.socket) {
            this.socket = io(`http://localhost:7777`);
        }
    }

    sendChatMessage(message: any) {
        this.socket.emit('chat', message);
    }

    getPlayersMessages(): Observable<any> {
        return this.listenOnChannel('players');
    }

    getChatMessages(): Observable<any> {
        return this.listenOnChannel('chat');
    }

    // Extra Exercise
    sendClickElementMessage(index: number) {
        this.socket.emit('clickElement', index);
    }
    getBoardMessages(): Observable<any> {
        return this.listenOnChannel('board');
    }

    sendChatMessageGame(message: any, gameId: any) {
        this.socket.emit('chat', message);
    }

    getPlayersMessagesGame(): Observable<any> {
        return this.listenOnChannel('players');
    }

    sendGameChatMessage(msgData: any) {
        this.socket.emit('chatGame', msgData);
    }

    sendGamePlayersMessage(msgData: any) {
        this.socket.emit('gameNotification', msgData);
    }

      getGameChatMessages(): Observable<any> {
        return this.listenOnChannel('chatGame');
    }

    getGamePlayersMessages(): Observable<any> {
        return this.listenOnChannel('gameNotification');
    }
    
  joinGameMessages(): Observable<any> {
        return this.listenOnChannel('gameJoin');
    }

   postJoinGame(msgData: any) {
       this.socket.emit('gameJoin', msgData);
    }
    joinGetHandMessage(): Observable<any> {
        return this.listenOnChannel('handDeal');
    }

 
    private listenOnChannel(channel: string): Observable<any> {
        return new Observable((observer:any) => {
            this.socket.on(channel, (data:any) => {
                observer.next(data);
            });
            return () => this.socket.disconnect();
        });
    }
}
