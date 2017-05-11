"use strict";
//import { ReflectGetMetadataInvalidTarget } from 'reflect-metadata/temp/test/spec';
var app_games_1 = require("./app.games");
var io = require('socket.io');
var mongodb = require('mongodb');
var app_database_1 = require("./app.database");
var WebSocketServer = (function () {
    function WebSocketServer() {
        var _this = this;
        this.board = [];
        this.game = new app_games_1.Game();
        this.init = function (server) {
            //this.initBoard();
            _this.io = io.listen(server); //servidor escuta???    
            _this.io.sockets.on('connection', function (client) {
                client.emit('players', Date.now() + ': Welcome to DAD - Blackjack');
                client.broadcast.emit('players', Date.now() + ': A new player has arrived');
                client.on('chat', function (data) { return _this.io.emit('chat', data); });
                client.on('chatGame', function (msgData) {
                    client.join(msgData.id);
                    client.emit('chatGame', msgData.name + ': ' + msgData.msg);
                    client.to(msgData.id).emit('chatGame', msgData.name + ': ' + msgData.msg);
                });
                client.on('gameNotification', function (msgData) {
                    var sessionid = client.id;
                    client.join(msgData.id);
                    client.emit('gameNotification', msgData.name + ': Welcome to game Room ' + msgData.id);
                    client.broadcast.to(msgData.id).emit('gameNotification', Date.now() + ': ' + msgData.name + ' has arrived');
                });
                client.on('gameJoin', function (msgData) {
                    //client.join(msgData.id);
                    var id = new mongodb.ObjectID(msgData.id);
                    app_database_1.databaseConnection.db.collection('games')
                        .findOne({
                        _id: id
                    })
                        .then(function (game) {
                        client.emit('gameJoin', game);
                        client.broadcast.to(msgData.id).emit('gameJoin', game);
                    });
                });
                //Extra Exercise
                client.emit('board', _this.board);
                client.on('clickElement', function (indexElement) {
                    _this.board[indexElement]++;
                    if (_this.board[indexElement] > 2) {
                        _this.board[indexElement] = 0;
                    }
                    // this.notifyAll('board', this.board);
                });
            });
        };
        this.notifyAll = function (channel, message) {
            _this.io.sockets.emit(channel, message);
        };
        this.notifyGameId = function (channel, message, gameId) {
            _this.io.sockets.emit(channel, message, gameId);
        };
        this.startGame = function (server) {
            _this.io = io.listen(server);
            _this.io.sockets.on('connection', function (client) {
                client.on('gameChannel', function (msgData) {
                    var id = new mongodb.ObjectID(msgData.id);
                    //const game = request.body;
                    client.emit('gameChannel', Date.now() + ': Jogo iniciou!!!'); //envio para quem clicou no start
                    client.broadcast.emit('gameChannel', Date.now() + ': Jogo iniciou!!!'); //envio para os outros jogadores
                    app_database_1.databaseConnection.db.collection('games')
                        .updateOne({
                        _id: id
                    }, {})
                        .then(function (game) {
                        client.emit('gameChannel', game);
                        client.broadcast.to(msgData.id).emit('gameJoin', game);
                    });
                });
            });
        };
    }
    WebSocketServer.prototype.initBoard = function () {
        for (var i = 0; i < 100; i++) {
            this.board[i] = 0;
        }
    };
    return WebSocketServer;
}());
exports.WebSocketServer = WebSocketServer;
//# sourceMappingURL=app.websockets.js.map