import { Component } from '@angular/core';
import {WebSocketService } from './notifications/websocket.service';
import { AuthenticationService } from './_services/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'chat-control',
    templateUrl: 'chat.component.html'
})
export class ChatComponent {
    date: '12/01/2017 : 20:50';
    message:  string;

    constructor(private websocketService: WebSocketService) {}
    send(): void {
        this.websocketService.sendChatMessage(sessionStorage.getItem('name') +' -> '+ this.message);
        this.message = '';
    }
}
