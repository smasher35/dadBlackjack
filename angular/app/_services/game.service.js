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
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var GameService = (function () {
    function GameService(router, http) {
        this.router = router;
        this.http = http;
        this.creatorName = '';
        this.player2Name = '';
        this.player3Name = '';
        this.player4Name = '';
        this.authToken = sessionStorage.getItem('id_token');
    }
    GameService.prototype.setPlayer2NameAndAvatar = function (name, avatar) {
        this.player2Name = name;
        this.player2Avatar = avatar;
    };
    GameService.prototype.getPlayer2Name = function () {
        return this.player2Name;
    };
    GameService.prototype.getPlayer2Avatar = function () {
        return this.player2Avatar;
    };
    GameService.prototype.setPlayer3NameAndAvatar = function (name, avatar) {
        this.player3Name = name;
        this.player3Avatar = avatar;
    };
    GameService.prototype.getPlayer3Name = function () {
        return this.player3Name;
    };
    GameService.prototype.getPlayer3Avatar = function () {
        return this.player3Avatar;
    };
    GameService.prototype.setPlayer4NameAndAvatar = function (name, avatar) {
        this.player4Name = name;
        this.player4Avatar = avatar;
    };
    GameService.prototype.getPlayer4Name = function () {
        return this.player4Name;
    };
    GameService.prototype.getPlayer4Avatar = function () {
        return this.player4Avatar;
    };
    GameService.prototype.setCreatorNameAndAvatar = function (creator, avatar) {
        this.creatorName = creator;
        this.creatorAvatar = avatar;
    };
    GameService.prototype.getCreatorName = function () {
        return this.creatorName;
    };
    GameService.prototype.getCreatorAvatar = function () {
        return this.creatorAvatar;
    };
    GameService.prototype.hasPlayer2 = function () {
        if (this.player2Name == '') {
            return false;
        }
        return true;
    };
    GameService.prototype.hasPlayer3 = function () {
        if (this.player3Name == '') {
            return false;
        }
        return true;
    };
    GameService.prototype.hasPlayer4 = function () {
        if (this.player4Name == '') {
            return false;
        }
        return true;
    };
    GameService.prototype.updateGame = function (body, gameId) {
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
    return GameService;
}());
GameService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http])
], GameService);
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map