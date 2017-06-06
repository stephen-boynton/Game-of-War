//The Deck
var player1, player2;

//Created a blank suit that has the properties a suit would have
//The suitAssign is to hold the combined values of suit and card.
//The idea being the value of the array index is what will be compared
var SuitDeck = function (cards, suit, suitAssign) {
  this.cards = cards;
  this.suit = suit;
  this.suitAssign = suitAssign;
};

//assigned this combining function to the prototype, this results in suitAssign value.
SuitDeck.prototype.assignSuit = function () {
  for (var i = 0, len = this.cards.length; i < len; i++) {
    this.suitAssign[i] = this.suit + this.cards[i];
  }
}

function init () {
  clubs.assignSuit();
  hearts.assignSuit();
  spades.assignSuit();
  diamonds.assignSuit();
};

function deal () {
  //player1
  


  //player2
}

var clubs = new SuitDeck (['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'], 'club', [,,,,,,,,,,,,]);

var hearts = new SuitDeck (['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'], 'heart', [,,,,,,,,,,,,]);

var spades = new SuitDeck (['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'], 'spade', [,,,,,,,,,,,,]);

var diamonds = new SuitDeck (['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'], 'diamond', [,,,,,,,,,,,,]);


init();
console.log(clubs.suitAssign);
console.log(hearts.suitAssign);
console.log(spades.suitAssign);
console.log(diamonds.suitAssign);
