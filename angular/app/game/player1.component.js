"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var websocket_service_1 = require("../notifications/websocket.service");
var game_service_1 = require("./../_services/game.service");
var Player1Component = (function () {
    function Player1Component(websocketService, gameService) {
        this.websocketService = websocketService;
        this.gameService = gameService;
        this.player2Name = '';
    }
    Player1Component.prototype.ngOnInit = function () {
    };
    return Player1Component;
}());
Player1Component = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'player1',
        templateUrl: 'board.component.html'
    }),
    __metadata("design:paramtypes", [websocket_service_1.WebSocketService, game_service_1.GameService])
], Player1Component);
exports.Player1Component = Player1Component;
//# sourceMappingURL=player1.component.js.map