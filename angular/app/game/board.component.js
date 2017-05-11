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
var router_1 = require("@angular/router");
var BoardComponent = (function () {
    function BoardComponent(websocketService, gameService, route, router) {
        this.websocketService = websocketService;
        this.gameService = gameService;
        this.route = route;
        this.router = router;
        this.elementos = [];
        this.creatorName = '';
        this.player2Name = '';
        this.player3Name = '';
        this.player4Name = '';
        this.loggedUser = '';
    }
    BoardComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get URL parameters
        this.subscriber = this.route
            .params
            .subscribe(function (params) {
            _this.id = params['id'];
        });
        this.websocketService.getBoardMessages().subscribe(function (m) {
            console.log(m);
            _this.elementos = m;
        });
        this.websocketService.joinGameMessages().subscribe(function (m) {
            _this.game = m;
            _this.creatorName = m.players[0].name;
            _this.creatorAvatar = m.players[0].avatar;
            if (m.players[1] != undefined) {
                _this.player2Name = m.players[1].name;
                _this.player2Avatar = m.players[1].avatar;
            }
            if (m.players[2] != undefined) {
                _this.player3Name = m.players[2].name;
                _this.player3Avatar = m.players[2].avatar;
            }
            if (m.players[3] != undefined) {
                _this.player4Name = m.players[3].name;
                _this.player4Avatar = m.players[3].avatar;
            }
        });
        this.websocketService.postJoinGame({ id: this.id, msg: 'Entrei', name: sessionStorage.getItem('name'), idPlayer: sessionStorage.getItem('_id') });
        this.websocketService.joinGetHandMessage().subscribe(function (m) {
            _this.hand = m;
            console.log(_this.hand);
        });
        // this.getCreatorName();
        // this.getCreatorAvatar();
        // this.getPlayer2Name();
        // this.getPlayer2Avatar();
        // this.getPlayer3Name();
        // this.getPlayer3Avatar();
        // this.getPlayer4Name();
        // this.getPlayer4Avatar();
    };
    BoardComponent.prototype.clickElemento = function (index) {
        this.websocketService.sendClickElementMessage(index);
        console.log(this.game);
    };
    BoardComponent.prototype.getColor = function (elemento) {
        switch (elemento) {
            case 0: return 'lightgray';
            case 1: return 'blue';
            case 2: return 'red';
        }
        return 'white';
    };
    BoardComponent.prototype.asDeEspadas = function () {
        this.loggedUser = sessionStorage.getItem('name');
    };
    BoardComponent.prototype.getCreatorName = function () {
        this.creatorName = this.gameService.getCreatorName();
    };
    BoardComponent.prototype.getCreatorAvatar = function () {
        this.creatorAvatar = this.gameService.getCreatorAvatar();
    };
    BoardComponent.prototype.getPlayer2Name = function () {
        this.player2Name = this.gameService.getPlayer2Name();
    };
    BoardComponent.prototype.getPlayer2Avatar = function () {
        this.player2Avatar = this.gameService.getPlayer2Avatar();
    };
    BoardComponent.prototype.getPlayer3Name = function () {
        this.player3Name = this.gameService.getPlayer3Name();
    };
    BoardComponent.prototype.getPlayer3Avatar = function () {
        this.player3Avatar = this.gameService.getPlayer3Avatar();
    };
    BoardComponent.prototype.getPlayer4Name = function () {
        this.player4Name = this.gameService.getPlayer4Name();
    };
    BoardComponent.prototype.getPlayer4Avatar = function () {
        this.player4Avatar = this.gameService.getPlayer4Avatar();
    };
    BoardComponent.prototype.hasPlayer2 = function () {
        console.log(this.gameService.hasPlayer2());
        return this.gameService.hasPlayer2();
    };
    BoardComponent.prototype.hasPlayer3 = function () {
        console.log(this.gameService.hasPlayer3());
        return this.gameService.hasPlayer3();
    };
    BoardComponent.prototype.hasPlayer4 = function () {
        console.log(this.gameService.hasPlayer4());
        return this.gameService.hasPlayer4();
    };
    BoardComponent.prototype.startGame = function () {
    };
    return BoardComponent;
}());
BoardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'board',
        templateUrl: 'board.component.html',
        styleUrls: ['board.component.css']
    }),
    __metadata("design:paramtypes", [websocket_service_1.WebSocketService, game_service_1.GameService, router_1.ActivatedRoute,
        router_1.Router])
], BoardComponent);
exports.BoardComponent = BoardComponent;
//# sourceMappingURL=board.component.js.map