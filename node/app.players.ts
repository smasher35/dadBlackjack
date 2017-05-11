const mongodb = require('mongodb');
import { Authentication } from "./app.authentication";
const util = require('util');
const sha1 = require('sha1');
import {HandlerSettings} from './handler.settings';
import {databaseConnection as database} from './app.database';

export class Player {

    private settings: HandlerSettings = null;

    private handleError = (err: string, response: any, next: any) => {
    	response.send(500, err);
	    next();
    }

    private returnPlayer = (id:string, response: any, next: any) => {
        database.db.collection('players')
            .findOne({
                _id: id
            })
            .then((player) => {
                if (player === null) {
                    response.send(404, 'Player not found');
                } else {
                    response.json(player);
                }
                next();
            })
            .catch(err => this.handleError(err, response, next));
    }

    private returnPlayerByToken = (token:string, response: any, next: any) => {
        database.db.collection('players')
            .findOne({
                id_token: token
            })
            .then((player) => {
                if (player === null) {
                    response.send(404, 'Player not found');
                } else {
                    response.json(player);
                }
                next();
            })
            .catch(err => this.handleError(err, response, next));
    }

    public getPlayers = (request: any, response: any, next: any) => {
        database.db.collection('players')
            .find()
            .toArray()
            .then(players => {
                response.json(players || []);
                next();
            })
            .catch(err => this.handleError(err, response, next));
    }

    public getPlayer =  (request: any, response: any, next: any) => {
        const id = new mongodb.ObjectID(request.params.id);
        this.returnPlayer(id, response, next);
    }

    public getPlayerByToken =  (request: any, response: any, next: any) => {
        const token = request.params.token;
        this.returnPlayerByToken(token, response, next);
    }
    
    
    public updatePlayer = (request: any, response: any, next: any) => {
        const id = new mongodb.ObjectID(request.params.id);
        const player = request.body;

        if (player === undefined) {
            response.send(400, 'No player data');
            return next();
        }
        delete player._id;
        database.db.collection('players')
            .updateOne({
                _id: id
            }, {
                $set: player
            })
            .then(result => this.returnPlayer(id, response, next))
            .catch(err => this.handleError(err, response, next));
    }
    
    public createPlayer = (request: any, response: any, next: any) => {
        const player = request.body;
        if (player === undefined) {
            response.send(400, 'No player data');
            return next();
        }
        
       
        player.passwordHash = sha1(player.passwordHash);
        database.db.collection('players')
            .insertOne(player)
            .then(result => this.returnPlayer(result.insertedId, response, next))
            .catch(err => this.handleError(err, response, next));
    }

    public deletePlayer = (request: any, response: any, next: any) => {
        var id = new mongodb.ObjectID(request.params.id);
        database.db.collection('players')
            .deleteOne({
                _id: id
            })
            .then(result => {
                if (result.deletedCount === 1) {
                    response.json({
                        msg: util.format('Player -%s- Deleted', id)
                    });
                } else {
                    response.send(404, 'No player found');
                }
                next();
            })
            .catch(err => this.handleError(err, response, next));
    }
        
    public getTop10 = (request: any, response: any, next: any) => {
        database.db.collection('players')
            .find()
            .sort({totalVictories:-1})
            .limit(10)
            .toArray()
            .then(players => {
                response.json(players || []);
                this.settings.wsServer.notifyAll('players', Date.now() + ': Somebody accessed top 10');
                next();
            })
            .catch(err => this.handleError(err, response, next));
    }

    // Routes for the games
    public init = (server: any, settings: HandlerSettings) => {
        this.settings = settings;
        server.get(settings.prefix + 'top10', this.getTop10);
        server.get(settings.prefix + 'players', settings.security.authorize, this.getPlayers);
        server.get(settings.prefix + 'players/:id', settings.security.authorize, this.getPlayer);
        server.get(settings.prefix + 'players/:token', settings.security.authorize, this.getPlayerByToken);
        server.put(settings.prefix + 'players/:id', settings.security.authorize, this.updatePlayer);
        server.post(settings.prefix + 'players', this.createPlayer);
        server.del(settings.prefix + 'players/:id', settings.security.authorize, this.deletePlayer);
        console.log("Players routes registered");
    };
}