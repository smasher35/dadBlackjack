import { CardComponent } from './game/card.component';
import { GameChatComponent } from "./game/gamechat.component";
import { DeckComponent } from './game/deck.component';
//import { Authentication } from '../../node/app.authentication';
import { NewGameComponent } from "./game/newGame.component";
import { ValidationService } from "./_services/validation.service";
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';
import { routes } from './app.router';
import { Routes, RouterModule } from '@angular/router';

import { NotificationModule } from './notifications/notifications.module';
import { ChatComponent} from './chat.component';
import { BoardComponent} from './game/board.component';
import { WebSocketService } from './notifications/websocket.service';
import { AboutComponent }  from './about/about.component';
import { LoginComponent } from './login/login.component';
import { LogOutComponent } from './logout/logout.component';
import { SignUpComponent } from './signup/signup.component';
import { GameLobbyComponent } from './gamelobby/gamelobby.component';
import { TopTenComponent } from './topten/topten.component';
import { GameHistoryComponent } from './game/gameHistory.component';
import { GameService } from './_services/game.service';

//services
import { AuthenticationService } from './_services/authentication.service';

@NgModule({
  imports:      [ BrowserModule, NotificationModule, FormsModule, HttpModule,routes ],
  declarations: [
                   AppComponent,
                   ChatComponent,
                   BoardComponent,
                   AboutComponent,
                   LoginComponent,
                   LogOutComponent,
                   SignUpComponent,
                   GameLobbyComponent,
                   TopTenComponent,
                   NewGameComponent,
                   GameHistoryComponent,
                   DeckComponent,
                   CardComponent,
                   GameChatComponent,
                    ],
  providers:    [ WebSocketService, AuthenticationService, ValidationService, GameService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
