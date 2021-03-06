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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var authentication_service_1 = require("./../_services/authentication.service");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var GameHistoryComponent = (function () {
    function GameHistoryComponent(authentication, router, http) {
        this.authentication = authentication;
        this.router = router;
        this.http = http;
        this.allGames = [];
        this.userGames = [];
        this.userId = sessionStorage.getItem('_id');
        this.Path = 'http://localhost:7777/api/v1/';
        this.getAllGames();
    }
    GameHistoryComponent.prototype.getAllGames = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.http
            .get(this.Path + 'finishedGames', { headers: headers, withCredentials: false })
            .subscribe(function (response) {
            _this.allGames = response.json();
            console.log(response.json());
        }, function (error) {
            //alert(error.text());
            console.log(error.text());
        });
    };
    return GameHistoryComponent;
}());
GameHistoryComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'gameHistory',
        templateUrl: 'gameHistory.component.html'
    }),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService, router_1.Router, http_1.Http])
], GameHistoryComponent);
exports.GameHistoryComponent = GameHistoryComponent;
//# sourceMappingURL=gameHistory.component.js.map