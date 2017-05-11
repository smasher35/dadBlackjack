"use strict";
var mongodb = require('mongodb');
var util = require('util');
var app_card_1 = require("./app.card");
var Suit;
(function (Suit) {
    Suit[Suit["copas"] = 0] = "copas";
    Suit[Suit["espadas"] = 1] = "espadas";
    Suit[Suit["ouros"] = 2] = "ouros";
    Suit[Suit["paus"] = 3] = "paus";
})(Suit || (Suit = {}));
var Deck = (function () {
    function Deck() {
        this._cards = [];
        this.createDeck();
        this.shuffle(200);
        /*this._cards.forEach(element => {
            console.log(element.toString());
        });*/
    }
    Deck.prototype.addCard = function (card) {
        // You can bypass runtime type checking here if you're using all TypeScript,
        // because the TypeScript compiler will emit a warning.  Otherwise, see 
        // the JavaScript sample for runtime type checking.
        this._cards.push(card);
    };
    Deck.prototype.dealCard = function () {
        if (this._cards.length === 0)
            throw new RangeError('No cards to deal.');
        return this._cards.pop();
    };
    Deck.prototype.shuffle = function (numTimes) {
        if (numTimes === void 0) { numTimes = 100; }
        var cards = this._cards;
        var cardCount = cards.length;
        // Do the shuffle operation numTimes times.
        for (var time = 0; time < numTimes; time++) {
            // Visit every card position once per "time"
            for (var index = 0; index < cardCount; index++) {
                // Create a random number in the range of [0, length)
                var numToSwap = Math.floor(Math.random() * cardCount);
                // Swap the cards at index and numToSwap
                var temp = cards[numToSwap];
                cards[numToSwap] = cards[index];
                cards[index] = temp;
            }
        }
    };
    Deck.prototype.createDeck = function () {
        var card;
        for (var suit = Suit.copas; suit <= Suit.paus; suit++) {
            for (var i = 1; i <= 10; i++) {
                if (suit == Suit.copas) {
                    card = new app_card_1.Card("c", i);
                }
                if (suit == Suit.espadas) {
                    card = new app_card_1.Card("e", i);
                }
                if (suit == Suit.ouros) {
                    card = new app_card_1.Card("o", i);
                }
                if (suit == Suit.paus) {
                    card = new app_card_1.Card("p", i);
                }
                this.addCard(card);
            }
        }
        //console.log("Deck created");
    };
    return Deck;
}());
Deck.Suit = Suit;
exports.Deck = Deck;
//# sourceMappingURL=app.deck.js.map