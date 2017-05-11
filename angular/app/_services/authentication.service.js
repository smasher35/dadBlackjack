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
var AuthenticationService = (function () {
    function AuthenticationService(router, http) {
        this.router = router;
        this.http = http;
        this.isLogged = false;
        this.isLogged = !!localStorage.getItem('id_token');
        this.pathLogin = 'http://localhost:7777/api/v1/login';
        this.pathLogout = 'http://localhost:7777/api/v1/';
    }
    AuthenticationService.prototype.login = function (event, username, password) {
        var _this = this;
        console.log("Entrou - LOGIN");
        var body = JSON.stringify({ username: username, password: password });
        var name = JSON.stringify({ password: password });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post('http://localhost:7777/api/v1/login', body, { headers: headers })
            .subscribe(function (response) {
            if (response.ok) {
                sessionStorage.setItem('_id', response.json()._id);
                sessionStorage.setItem('id_token', response.json().token);
                sessionStorage.setItem('name', response.json().name);
                sessionStorage.setItem('totalvictories', response.json().totalvictories);
                sessionStorage.setItem('username', response.json().username);
                sessionStorage.setItem('avatar', response.json().avatar);
            }
            console.log('response-->' + response);
            _this.isLogged = true;
            _this.router.navigate(['gamelobby']);
        }, function (error) {
            alert(error.text());
            console.log(error.text());
        });
    };
    AuthenticationService.prototype.logout = function () {
        var _this = this;
        var authToken = sessionStorage.getItem('id_token');
        console.log(authToken);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + authToken);
        var body = JSON.stringify({});
        console.log(headers);
        this.http
            .post(this.pathLogout + 'logout', body, { headers: headers, withCredentials: false })
            .subscribe(function (response) {
            if (response.ok) {
                _this.isLogged = false;
                sessionStorage.clear();
                _this.router.navigate(['login']);
            }
        }, function (error) {
            alert(error.text());
            console.log(error.text());
        });
    };
    AuthenticationService.prototype.isLoggedIn = function () {
        return this.isLogged;
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map