"use strict";
var mongodb = require('mongodb');
var util = require('util');
var app_database_1 = require("./app.database");
var app_deck_1 = require("./app.deck");
var Game = (function () {
    function Game() {
        var _this = this;
        this.hand1 = [];
        this.hand2 = [];
        this.hand3 = [];
        this.hand4 = [];
        this.nextHand = 1;
        this.handleError = function (err, response, next) {
            response.send(500, err);
            next();
        };
        this.returnGame = function (id, response, next) {
            app_database_1.databaseConnection.db.collection('games')
                .findOne({
                _id: id
            })
                .then(function (game) {
                if (game === null) {
                    response.send(404, 'Game not found');
                }
                else {
                    response.json(game);
                }
                next();
            })
                .catch(function (err) { return _this.handleError(err, response, next); });
        };
        this.getGames = function (request, response, next) {
            app_database_1.databaseConnection.db.collection('games')
                .find({
                state: 'playing'
            })
                .toArray()
                .then(function (games) {
                response.json(games || []);
                next();
            })
                .catch(function (err) { return _this.handleError(err, response, next); });
        };
        this.getGamesPending = function (request, response, next) {
            app_database_1.databaseConnection.db.collection('games')
                .find({
                state: 'pending'
            })
                .toArray()
                .then(function (games) {
                response.json(games || []);
                next();
            })
                .catch(function (err) { return _this.handleError(err, response, next); });
        };
        this.getGamesRunnig = function (request, response, next) {
            app_database_1.databaseConnection.db.collection('games')
                .find({
                state: 'playing'
            })
                .toArray()
                .then(function (games) {
                response.json(games || []);
                next();
            })
                .catch(function (err) { return _this.handleError(err, response, next); });
        };
        this.getGamesFinished = function (request, response, next) {
            app_database_1.databaseConnection.db.collection('games')
                .find({
                state: 'finished'
            })
                .toArray()
                .then(function (games) {
                response.json(games || []);
                next();
            })
                .catch(function (err) { return _this.handleError(err, response, next); });
        };
        this.getGame = function (request, response, next) {
            var id = new mongodb.ObjectID(request.params.id);
            _this.returnGame(id, response, next);
        };
        this.updateGame = function (request, response, next) {
            var id = new mongodb.ObjectID(request.params.id);
            var game = request.body;
            if (game === undefined) {
                response.send(400, 'No game data');
                return next();
            }
            delete game._id;
            app_database_1.databaseConnection.db.collection('games')
                .updateOne({
                _id: id
            }, {
                $set: game
            })
                .then(function (result) { return _this.returnGame(id, response, next); })
                .catch(function (err) { return _this.handleError(err, response, next); });
        };
        this.createGame = function (request, response, next) {
            var game = request.body;
            if (game === undefined) {
                response.send(400, 'No game data');
                return next();
            }
            app_database_1.databaseConnection.db.collection('games')
                .insertOne(game)
                .then(function (result) { return _this.returnGame(result.insertedId, response, next); })
                .catch(function (err) { return _this.handleError(err, response, next); });
            var deck;
            deck = new app_deck_1.Deck();
            for (var i = 0; i < 10; i++) {
                _this.hand1.push(deck.dealCard());
            }
            for (var i = 0; i < 10; i++) {
                _this.hand2.push(deck.dealCard());
            }
            for (var i = 0; i < 10; i++) {
                _this.hand3.push(deck.dealCard());
            }
            for (var i = 0; i < 10; i++) {
                _this.hand4.push(deck.dealCard());
            }
            console.log(_this.hand1);
            console.log(_this.hand2);
            console.log(_this.hand3);
            console.log(_this.hand4);
            // deck.createDeck();
        };
        this.deleteGame = function (request, response, next) {
            var state = request.params.state;
            app_database_1.databaseConnection.db.collection('games')
                .deleteMany({
                state: state
            })
                .then(function (result) {
                if (result.deletedCount != 0) {
                    response.json({
                        msg: util.format('Game -%s- Deleted')
                    });
                }
                else {
                    response.send(404, 'No game found');
                }
                next();
            })
                .catch(function (err) { return _this.handleError(err, response, next); });
        };
        // Routes for the games
        this.init = function (server, settings) {
            server.get(settings.prefix + 'games', settings.security.authorize, _this.getGames);
            //server.get(settings.prefix + 'games/:id', settings.security.authorize, this.getGame);
            //server.get(settings.prefix + 'games/:id', this.getGame);
            server.get(settings.prefix + 'finishedGames', _this.getGamesFinished);
            server.put(settings.prefix + 'games/:id', settings.security.authorize, _this.updateGame);
            server.post(settings.prefix + 'games', settings.security.authorize, _this.createGame);
            server.get(settings.prefix + 'pendingGames', _this.getGamesPending);
            server.get(settings.prefix + 'runningGames', _this.getGamesRunnig);
            server.del(settings.prefix + 'games/:state', _this.deleteGame);
            server.get(settings.prefix + 'games/:id', settings.security.authorize, _this.getGame);
            console.log("Games routes registered");
        };
    }
    Game.prototype.getHands = function () {
        switch (this.nextHand) {
            case 1:
                this.nextHand++;
                return this.hand1;
            case 2:
                this.nextHand++;
                return this.hand2;
            case 3:
                this.nextHand++;
                return this.hand3;
            case 4:
                this.nextHand = 1;
                return this.hand4;
        }
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=app.games.js.map