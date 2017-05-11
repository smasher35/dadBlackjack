const mongodb = require('mongodb');
const util = require('util');
import {HandlerSettings} from './handler.settings';
import {databaseConnection as database} from './app.database';
import { Deck } from "./app.deck";

export class Game {
    private hand1: any [] = [];
    private hand2: any [] = [];
    private hand3: any [] = [];
    private hand4: any [] = [];
    private nextHand: any = 1;


    private handleError = (err: string, response: any, next: any) => {
    	response.send(500, err);
	    next();
    }

    private returnGame = (id:string, response: any, next: any) => {
        database.db.collection('games')
            .findOne({
                _id: id
            })
            .then(game => {
                if (game === null) {
                    response.send(404, 'Game not found');
                } else {
                    response.json(game);
                }
                next();
            })
            .catch(err => this.handleError(err, response, next));
    }

    public getGames = (request: any, response: any, next: any) => {
        database.db.collection('games')
            .find({
                state: 'playing'
            })
            .toArray()
            .then(games => {
                response.json(games || []);
                next();
            })
            .catch(err => this.handleError(err, response, next));
    }

     public getGamesPending = (request: any, response: any, next: any) => {
        database.db.collection('games')
            .find({
                state: 'pending'
            })
            .toArray()
            .then(games => {
                response.json(games || []);
                next();
            })
            .catch(err => this.handleError(err, response, next));
    }
    public getGamesRunnig = (request: any, response: any, next: any) => {
        database.db.collection('games')
            .find({
                state: 'playing'
            })
            .toArray()
            .then(games => {
                response.json(games || []);
                next();
            })
            .catch(err => this.handleError(err, response, next));
    }


    public getGamesFinished = (request: any, response: any, next: any) => {
        database.db.collection('games')
            .find({
                state: 'finished'
            })
            .toArray()
            .then(games => {
                response.json(games || []);
                next();
            })
            .catch(err => this.handleError(err, response, next));
    }

    public getGame =  (request: any, response: any, next: any) => {
        const id = new mongodb.ObjectID(request.params.id);
        this.returnGame(id, response, next);
    }

    public updateGame =  (request: any, response: any, next: any) => {
        const id = new mongodb.ObjectID(request.params.id);
        const game = request.body;

        if (game === undefined) {
            response.send(400, 'No game data');
            return next();
        }
        delete game._id;
        database.db.collection('games')
            .updateOne({
                _id: id
            }, {
                $set: game
            })
            .then(result => this.returnGame(id, response, next))
            .catch(err => this.handleError(err, response, next));
    }

    public createGame =  (request: any, response: any, next: any) => {
        var game = request.body;
        if (game === undefined) {
            response.send(400, 'No game data');
            return next();
        }
        database.db.collection('games')
            .insertOne(game)
            .then(result => this.returnGame(result.insertedId, response, next))
            .catch(err => this.handleError(err, response, next));

            var deck: Deck;
            deck = new Deck();
            
            for(var i = 0; i < 10; i++){
                this.hand1.push(deck.dealCard());
            }
            for(var i = 0; i < 10; i++){
                this.hand2.push(deck.dealCard());
            }
            for(var i = 0; i < 10; i++){
                this.hand3.push(deck.dealCard());
            }
            for(var i = 0; i < 10; i++){
                this.hand4.push(deck.dealCard());
            }

            console.log(this.hand1);
            console.log(this.hand2);
            console.log(this.hand3);
            console.log(this.hand4);

           // deck.createDeck();
    }
    public getHands(){
        switch (this.nextHand)
        {
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
                this.nextHand=1;
                return this.hand4;
        }
        
    }


   
    public deleteGame =  (request: any, response: any, next: any) => {
        const state = request.params.state;
        database.db.collection('games')
            .deleteMany({
                state: state
            })
            .then(result => {
                if (result.deletedCount != 0) {
                    response.json({
                        msg: util.format('Game -%s- Deleted')
                    });
                } else {
                    response.send(404, 'No game found');
                }
                next();
            })
            .catch(err => this.handleError(err, response, next));
    }

    // Routes for the games
    public init = (server: any, settings: HandlerSettings) => {
        server.get(settings.prefix + 'games', settings.security.authorize, this.getGames);
        //server.get(settings.prefix + 'games/:id', settings.security.authorize, this.getGame);
        //server.get(settings.prefix + 'games/:id', this.getGame);
        server.get(settings.prefix + 'finishedGames', this.getGamesFinished);
        server.put(settings.prefix + 'games/:id', settings.security.authorize, this.updateGame);
        server.post(settings.prefix + 'games', settings.security.authorize, this.createGame);
        server.get(settings.prefix + 'pendingGames',  this.getGamesPending);
        server.get(settings.prefix + 'runningGames',  this.getGamesRunnig);
        server.del(settings.prefix + 'games/:state', this.deleteGame);
        server.get(settings.prefix + 'games/:id', settings.security.authorize, this.getGame);
        
        console.log("Games routes registered");
    };    
}