//The Deck
var player1, player2, deck, clubs, diamonds, spades, hearts;

//Created a blank suit that has the properties a suit would have
//The suitAssign is to hold the combined values of suit and card.
//The idea being the value of the array index is what will be compared
var SuitDeck = function (cards, suit, suitAssign) {
  this.cards = cards;
  this.suit = suit;
  this.suitAssign = suitAssign;
};

var Player = function (hand, cardNum) {
  this.hand = hand;
  this.cardNum = cardNum;
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

function createDeck() {
  deck = clubs.suitAssign.concat(diamonds.suitAssign, spades.suitAssign, hearts.suitAssign);
  deckCopy = deck;
}

function deal () {
  //player1 hand
  //generate random index number then take from deck and delete card from deck
  for (var i = 0, len = 26; i < len; i++) {
    getCard = Math.floor(Math.random() * 51)
    if (deck[getCard]===undefined && i != 27) {
      i = i - 1;
    } else {
    gotCard = deck[getCard];
    deck.splice(getCard, 1);
    player1.hand.push(gotCard);
    }
  }
}

function deal2 () {
    //player2 hand
    player2.hand.push(deck);
    console.log(player2.hand);
}

clubs = new SuitDeck (['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'], 'club', [,,,,,,,,,,,,]);

hearts = new SuitDeck (['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'], 'heart', [,,,,,,,,,,,,]);

spades = new SuitDeck (['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'], 'spade', [,,,,,,,,,,,,]);

diamonds = new SuitDeck (['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'], 'diamond', [,,,,,,,,,,,,]);

player1 = new Player ([], '');
player2 = new Player ([], '');


init();
createDeck();
deal();
deal2();
