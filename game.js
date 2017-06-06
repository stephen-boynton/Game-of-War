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
  //two decks, one to distribute and one to compare against
  deck = clubs.suitAssign.concat(diamonds.suitAssign, spades.suitAssign, hearts.suitAssign);
  deckCopy = clubs.suitAssign.concat(diamonds.suitAssign, spades.suitAssign, hearts.suitAssign);;
  //Deck order is important [0-12 = clubs, 13-25 = diamonds, 26-39 = spades, 40-52 = hearts]
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
  console.log(player1.hand);
}

function deal2 () {
    //player2 hand
  for (var i = 0, len = 26; i < len; i++) {
    getCard = Math.floor(Math.random() * 51)
    if (deck[getCard]===undefined && i != 27) {
      i = i - 1;
    } else {
    gotCard = deck[getCard];
    deck.splice(getCard, 1);
    player2.hand.push(gotCard);
    }
  }
  console.log(player2.hand);
}

function findPlayer1Value () {
  player1Card = player1.hand.pop();
  console.log(player1Card);
  player1CardInDeck = deckCopy.indexOf(player1Card);
  if (player1CardInDeck < 13) {
    player1Value = clubs.suitAssign.indexOf(player1Card) + 2;
    console.log(player1Value);
  } else if (player1CardInDeck > 12 && player1CardInDeck < 26) {
    player1Value = diamonds.suitAssign.indexOf(player1Card ) + 2;
    console.log(player1Value);
  } else if (player1CardInDeck > 25 && player1CardInDeck < 40) {
    player1Value = spades.suitAssign.indexOf(player1Card ) + 2;
    console.log(player1Value);
  } else {
    player1Value = hearts.suitAssign.indexOf(player1Card ) + 2;
    console.log(player1Value);
  }
}

function findPlayer2Value () {
  player2Card = player2.hand.pop();
  console.log(player2Card);
  player2CardInDeck = deckCopy.indexOf(player2Card);
  if (player2CardInDeck < 13) {
    player2Value = clubs.suitAssign.indexOf(player2Card) + 2;
    console.log(player2Value)
  } else if (player2CardInDeck > 12 && player2CardInDeck < 26) {
    player2Value = diamonds.suitAssign.indexOf(player2Card) + 2;
    console.log(player2Value)
  } else if (player2CardInDeck > 25 && player2CardInDeck < 40) {
    player2Value = spades.suitAssign.indexOf(player2Card) + 2;
    console.log(player2Value)
  } else {
    player2Value = hearts.suitAssign.indexOf(player2Card) + 2;
    console.log(player2Value);
  }
}

function round () {
  console.log("Round!")
  //player1 value
  findPlayer1Value();
  //player2 value
  findPlayer2Value();
  if (player1Value > player2Value) {
    console.log("Player1 Wins this round!")
    player1.hand.unshift(player2Card);
    player1.hand.unshift(player1Card);
    console.log(player1.hand);
  } else if (player2Value > player1Value) {
    console.log("Player 2 wins this round!")
    player2.hand.unshift(player1Card);
    player2.hand.unshift(player2Card);
    console.log(player2.hand);
  } else if (player1Value === player2Value) {
    war();
  }
}

function war () {
  player1WarCards = player1.hand.length - 3;
  player1WarArray = player1.hand.splice(player1WarCards, 3);
  console.log (player1WarArray);
  player2WarCards = player2.hand.length - 3;
  player2WarArray = player2.hand.splice(player2WarCards, 3);
  console.log (player2WarArray);
  findPlayer1Value();
  findPlayer2Value();
  if (player1Value > player2Value) {
    console.log("Player 1 has won the WAR!")
    for (var i = 0, len = player1WarArray.length; i < len; i++) {
      player1.hand.unshift(player2WarArray[i]);
      player1.hand.unshift(player1WarArray[i]);
    }
    player1.hand.unshift(player2Card, player1Card);
    console.log(player1.hand);
  } else if (player2Value > player1Value) {
    console.log("Player 2 has won the WAR!")
    for (var i = 0, len = player1WarArray.length; i < len; i++) {
      player2.hand.unshift(player2WarArray[i]);
      player2.hand.unshift(player1WarArray[i]);
    }
    player2.hand.unshift(player2Card, player1Card);
    console.log(player2.hand);
  }

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
document.querySelector('#attack').addEventListener('click', round)
