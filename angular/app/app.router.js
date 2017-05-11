"use strict";
var gameHistory_component_1 = require("./game/gameHistory.component");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var about_component_1 = require("./about/about.component");
var login_component_1 = require("./login/login.component");
var signup_component_1 = require("./signup/signup.component");
var gamelobby_component_1 = require("./gamelobby/gamelobby.component");
var topten_component_1 = require("./topten/topten.component");
var board_component_1 = require("./game/board.component");
exports.router = [
    { path: '', component: app_component_1.AppComponent },
    { path: 'home', component: app_component_1.AppComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'signup', component: signup_component_1.SignUpComponent },
    { path: 'gamelobby', component: gamelobby_component_1.GameLobbyComponent },
    { path: 'topten', component: topten_component_1.TopTenComponent },
    { path: 'history', component: gameHistory_component_1.GameHistoryComponent },
    { path: 'board/:id', component: board_component_1.BoardComponent }
];
exports.routes = router_1.RouterModule.forRoot(exports.router);
//# sourceMappingURL=app.router.js.map