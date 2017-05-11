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
var authentication_service_1 = require("./../_services/authentication.service");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var game_service_1 = require("./../_services/game.service");
var GameLobbyComponent = (function () {
    function GameLobbyComponent(authentication, router, http, game) {
        this.authentication = authentication;
        this.router = router;
        this.http = http;
        this.game = game;
        this.player = sessionStorage.getItem('name');
        this.avatar = sessionStorage.getItem('avatar');
        this.uid = sessionStorage.getItem('_id');
        this.authToken = sessionStorage.getItem('id_token');
        this.pathLogout = 'http://localhost:7777/api/v1/';
        this.isLogged = true;
        this.allGamesPending = [];
        this.allGamesRunning = [];
        this.userGames = [];
        this.Path = 'http://localhost:7777/api/v1/';
        this.getGamesPending();
        this.getGamesRunnig();
    }
    GameLobbyComponent.prototype.getGamesPending = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.http
            .get(this.Path + 'pendingGames', { headers: headers, withCredentials: false })
            .subscribe(function (response) {
            _this.allGamesPending = response.json();
            console.log(response.json());
        }, function (error) {
            //alert(error.text());
            console.log(error.text());
        });
    };
    GameLobbyComponent.prototype.getGamesRunnig = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.http
            .get(this.Path + 'runningGames', { headers: headers, withCredentials: false })
            .subscribe(function (response) {
            _this.allGamesRunning = response.json();
            console.log(response.json());
        }, function (error) {
            //alert(error.text());
            console.log(error.text());
        });
    };
    GameLobbyComponent.prototype.joinGame = function (gameId) {
        var _this = this;
        var joinButton = document.getElementById('joinGame');
        var totPlayers;
        var player;
        this.gameId = gameId;
        var headers = new http_1.Headers();
        var games = [];
        var i = 1;
        var playerID = sessionStorage.getItem('_id');
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + this.authToken);
        this.http.get(this.Path + 'games/' + gameId, { headers: headers, withCredentials: false })
            .subscribe(function (response) {
            //get the total players number
            totPlayers = response.json().players.length;
            games = response.json().players;
            for (var _i = 0, games_1 = games; _i < games_1.length; _i++) {
                var gamer = games_1[_i];
                if (gamer.uid == playerID) {
                    alert("THIS PLAYER ALREADY JOINED THIS GAME!!");
                    return;
                }
            }
            //verificar se o jogo está cheio
            if (totPlayers < 4) {
                _this.getGame(_this.gameId);
                _this.userGames = [{ player: player }];
                _this.body = JSON.stringify({ players: _this.userGames, state: 'pending' });
                _this.updateGame(_this.body, _this.gameId);
                for (var _a = 0, games_2 = games; _a < games_2.length; _a++) {
                    var item = games_2[_a];
                    if (i == 0) {
                        console.log(item.name);
                        _this.game.setCreatorNameAndAvatar(item.name, item.avatar);
                    }
                    if (i == 1) {
                        console.log(item.name);
                        _this.game.setPlayer2NameAndAvatar(item.name, item.avatar);
                    }
                    if (i == 2) {
                        console.log(item.name);
                        _this.game.setPlayer3NameAndAvatar(item.name, item.avatar);
                    }
                    if (i == 3) {
                        console.log(item.name);
                        _this.game.setPlayer4NameAndAvatar(item.name, item.avatar);
                        _this.body = JSON.stringify({ players: _this.userGames, state: 'playing' });
                        _this.updateGame(_this.body, _this.gameId);
                    }
                    i++;
                }
            }
            else {
                alert('TOTAL PLAYERS MAXED OUT');
            }
        }, function (error) {
            console.log(error.text());
        });
        console.log(gameId);
    };
    GameLobbyComponent.prototype.getGame = function (gameId) {
        var _this = this;
        var joinButton = document.getElementById('joinGame');
        var headers = new http_1.Headers();
        var totPlayers;
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + this.authToken);
        this.http.get(this.Path + 'games/' + gameId, { headers: headers, withCredentials: false })
            .subscribe(function (response) {
            totPlayers = response.json().players.length;
            if (response.json().players.length < 4) {
                _this.userGames = response.json().players;
                console.log(_this.userGames);
                _this.userGames.push({
                    uid: _this.uid, name: _this.player,
                    statusDate: Date.now(), money: 100, avatar: _this.avatar
                });
                _this.body = JSON.stringify({ players: _this.userGames, state: 'pending' });
                _this.updateGame(_this.body, gameId);
            }
            else {
                var joinButton = document.getElementById('joinGame').hidden;
            }
        }, function (error) {
            alert(error.text());
            console.log(error.text());
        });
    };
    GameLobbyComponent.prototype.updateGame = function (body, gameId) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + this.authToken);
        this.http.put(this.Path + 'games/' + gameId, body, { headers: headers, withCredentials: false })
            .subscribe(function (response) {
            _this.router.navigate(['board', gameId]);
        }, function (error) {
            alert(error.text());
            console.log(error.text());
        });
    };
    GameLobbyComponent.prototype.getIdPlayersGame = function (userGames) {
        this.idPlayers = userGames.keys('uid');
        return this.idPlayers;
    };
    GameLobbyComponent.prototype.compareArrayPlayers = function (idPlayers, uid) {
        for (var i = 0; i >= idPlayers.length; i++) {
            if (uid == idPlayers[i]) {
                this.idPlayerInArray = true;
            }
            this.idPlayerInArray = false;
        }
    };
    GameLobbyComponent.prototype.logout = function (event, username, password) {
        this.authentication.logout();
    };
    return GameLobbyComponent;
}());
GameLobbyComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-app',
        templateUrl: "gamelobby.component.html"
    }),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService, router_1.Router, http_1.Http, game_service_1.GameService])
], GameLobbyComponent);
exports.GameLobbyComponent = GameLobbyComponent;
//# sourceMappingURL=gamelobby.component.js.map