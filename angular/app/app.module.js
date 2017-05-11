"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var card_component_1 = require("./game/card.component");
var gamechat_component_1 = require("./game/gamechat.component");
var deck_component_1 = require("./game/deck.component");
//import { Authentication } from '../../node/app.authentication';
var newGame_component_1 = require("./game/newGame.component");
var validation_service_1 = require("./_services/validation.service");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var http_1 = require("@angular/http");
var app_router_1 = require("./app.router");
var notifications_module_1 = require("./notifications/notifications.module");
var chat_component_1 = require("./chat.component");
var board_component_1 = require("./game/board.component");
var websocket_service_1 = require("./notifications/websocket.service");
var about_component_1 = require("./about/about.component");
var login_component_1 = require("./login/login.component");
var logout_component_1 = require("./logout/logout.component");
var signup_component_1 = require("./signup/signup.component");
var gamelobby_component_1 = require("./gamelobby/gamelobby.component");
var topten_component_1 = require("./topten/topten.component");
var gameHistory_component_1 = require("./game/gameHistory.component");
var game_service_1 = require("./_services/game.service");
//services
var authentication_service_1 = require("./_services/authentication.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, notifications_module_1.NotificationModule, forms_1.FormsModule, http_1.HttpModule, app_router_1.routes],
        declarations: [
            app_component_1.AppComponent,
            chat_component_1.ChatComponent,
            board_component_1.BoardComponent,
            about_component_1.AboutComponent,
            login_component_1.LoginComponent,
            logout_component_1.LogOutComponent,
            signup_component_1.SignUpComponent,
            gamelobby_component_1.GameLobbyComponent,
            topten_component_1.TopTenComponent,
            newGame_component_1.NewGameComponent,
            gameHistory_component_1.GameHistoryComponent,
            deck_component_1.DeckComponent,
            card_component_1.CardComponent,
            gamechat_component_1.GameChatComponent,
        ],
        providers: [websocket_service_1.WebSocketService, authentication_service_1.AuthenticationService, validation_service_1.ValidationService, game_service_1.GameService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map