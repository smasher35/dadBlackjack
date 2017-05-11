const mongodb = require('mongodb');
const util = require('util');
import {HandlerSettings} from './handler.settings';
import {databaseConnection as database} from './app.database';
import { Deck } from "./app.deck";

export class Card {

    private suit: string;
    private strength: number;
    private img: string;
    private points: number;
    private played: boolean;
    private turned: boolean;

/**
 *    
 *    
 */
    constructor(suit: string, index: number) {
        //console.log("On app.cards.ts" + suit);
        //console.log(this.suit);
        this.suit = suit;
        switch (index){
            case 1: 
                this.strength = 11;
                this.points = 11;
                this.img = "" + suit + index + ".png";
                
                break;
            case 7:
                this.strength = 10;
                this.points = 10;
                this.img = "" + suit + index + ".png";
                break;
            case 11:
                this.strength = 7;
                this.points = 2;
                this.img = "" + suit + index + ".png";
                break;
            case 12:
                this.strength = 8;
                this.points = 3;
                this.img = "" + suit + index + ".png";
            break;
            case 13:
                this.strength = 9;
                this.points = 4;
                this.img = "" + suit + index + ".png";
                break;
            default:
                this.strength = index - 1;
                this.points = 0;
                this.img = "" + suit + index + ".png";
                break;                
        }
        this.played = false;
        this.turned = false;
        
    }
    toString(){
        return this.img + "\n"  + "strength: " + 
        this.strength + "\n" + "POINTS: " +  this.points;

    }
}