//the variables
var player1, player2, deck, clubs, diamonds, spades, hearts, warState, roundState, player1Count, player2Count, player1Card, player2Card;

var player1WarArray = [];
var player2WarArray = [];

//Created a blank suit that has the properties a suit would have
//The suitAssign is to hold the combined values of suit and card.
//The idea being the value of the array index is what will be compared
var SuitDeck = function (cards, suit, suitAssign) {
  this.cards = cards;
  this.suit = suit;
  this.suitAssign = suitAssign;
};

//blank players
var Player = function (hand, cardNum) {
  this.hand = hand;
  this.cardNum = cardNum;
};

//assigned this combining function to the prototype, this results in suitAssign value. To build the deck
SuitDeck.prototype.assignSuit = function () {
  for (var i = 0, len = this.cards.length; i < len; i++) {
    this.suitAssign[i] = this.suit + this.cards[i];
  }
}
//The game itself
function init () {
  clubs.assignSuit();
  hearts.assignSuit();
  spades.assignSuit();
  diamonds.assignSuit();
  createDeck();
  deal();
  deal2();
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
  roundStateActive();
}

function playerDeckCount () {
  //Display how many cards are in each persons hand
  //player1
  player1Count = player1.hand.length;
  console.log(player1Count);
  document.querySelector('#player-1-score').textContent=player1Count;
  //player2
  player2Count = player2.hand.length;
  console.log(player2Count);
  document.querySelector('#player-2-score').textContent=player2Count;
  //Check for a winner
  if (player1Count === 0){
    roundState = false;
    warState = false;
    document.querySelector('#player-2-score').textContent='Player 2 Wins!';
  } else if (player2Count === 0) {
    roundState = false;
    warState = false;
    document.querySelector('#player-1-score').textContent='Player 1 Wins!';
  }
}

//prevents player from clicking Attack! unless active
function roundStateActive () {
  roundState = true;
  document.querySelector('.attack').classList.add('active');
  document.querySelector('.attack').addEventListener('click', round)
}


//link the png to the value of the card played
function displayCards (){
  document.querySelector('.player-1-Card').src="cards/"+player1Card+'.png';
  document.querySelector('.player-2-Card').src="cards/"+player2Card+'.png';
}


//see the cards that are up for grabs during War Round
function displayWarChest (){
  document.querySelector('#warchest1').style.display='flex';
  document.querySelector('#warchest2').style.display='flex';
  document.querySelector('#p1WarCard1').src="cards/"+player1WarArray[0]+'.png';
  document.querySelector('#p1WarCard2').src="cards/"+player1WarArray[1]+'.png';
  document.querySelector('#p1WarCard3').src="cards/"+player1WarArray[2]+'.png';
  document.querySelector('#p2WarCard1').src="cards/"+player2WarArray[0]+'.png';
  document.querySelector('#p2WarCard2').src="cards/"+player2WarArray[1]+'.png';
  document.querySelector('#p2WarCard3').src="cards/"+player2WarArray[2]+'.png';
}

//associate the card with the original index value you in the suit
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

//same as player1 above
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
//this is the function for the nomral rounds
function round () {
  if (roundState === true) {
    //hiding the War Chest imgages and returningt o Round mode
    document.querySelector('#warchest1').style.display='none';
    document.querySelector('#warchest2').style.display='none';
    leaveWarMode();
    playerDeckCount();
    document.querySelector('#player-1-score').style.fontSize='20px';
    document.querySelector('#player-2-score').style.fontSize='20px';
    //player1 value
    findPlayer1Value();
    //player2 value
    findPlayer2Value();
    displayCards();
    if (player1Value > player2Value) {
      document.querySelector('#player-1-score').style.fontSize='50px';
      player1.hand.unshift(player2Card);
      player1.hand.unshift(player1Card);
    } else if (player2Value > player1Value) {
      document.querySelector('#player-2-score').style.fontSize='50px';
      player2.hand.unshift(player1Card);
      player2.hand.unshift(player2Card);
    } else if (player1Value === player2Value) {
      player1.hand.push(player1Card);
      player2.hand.push(player2Card);
      enterWarMode();
      }
      playerDeckCount();
    }
  }

//visual representatio of entering WAR
function enterWarMode() {
  warState = true;
  roundState = false;
  document.querySelector('.background').style.backgroundImage='url("img/war.jpg")';
  document.querySelector('.play-area').style.backgroundColor='rgba(0, 0, 0, 0.5)';
  document.querySelector('header').style.color='white';
  document.querySelector('.attack').classList.remove('active');
  document.querySelector('.war').classList.add('active');
  document.querySelector('.war').addEventListener('click', war)
}

//returns visuals back to normal
function leaveWarMode() {
  document.querySelector('.background').style.backgroundImage='url("img/b2.jpeg")';
  document.querySelector('.play-area').style.backgroundColor='rgba(255, 0, 0, 0.5)';
  document.querySelector('header').style.color='red';
}

//This is the function for the War round
function war () {
  if (warState === true) {
    console.log(player1.hand);
    displayCards();
    console.log(player1.hand);
    //activate War button
    document.querySelector('.war').classList.remove('active');
    console.log(player1.hand);
    //player1 adds cards to the pile
    player1WarArray = player1.hand.splice(player1.hand.length-4, 4);
    console.log(player1.hand);
    console.log (player1WarArray);
    //player2 adds cards to the pile
    player2WarArray = player2.hand.splice(player2.hand.length-4, 4);
    console.log(player1.hand);
    console.log (player2WarArray);
    //flip and compare cards
    displayWarChest();
    console.log(player1.hand);
    findPlayer1Value();
    console.log(player1.hand);
    findPlayer2Value();
    console.log(player1.hand);
    displayCards();
    console.log(player1.hand);
    //determine winner and who gets cards
    if (player1Value > player2Value) {
      //player1 wins
      console.log(player1.hand);
      for (var i = 0, len = player1WarArray.length; i < len; i++) {
        player1.hand.unshift(player2WarArray[i]);
        player1.hand.unshift(player1WarArray[i]);
        console.log(player1.hand);
      }
      player1.hand.unshift(player2Card, player1Card);
      console.log(player1.hand);
      document.querySelector('#player-1-score').style.fontSize='30px';
      document.querySelector('#player-1-score').textContent='This War is Yours!';
      warState = false;
      roundStateActive();
      console.log(player1.hand);
    } else if (player2Value > player1Value) {
      //player2 wins
        console.log("Player 2 has won the WAR!")
        for (var i = 0, len = player1WarArray.length; i < len; i++) {
          player2.hand.unshift(player2WarArray[i]);
          player2.hand.unshift(player1WarArray[i]);
        }
        player2.hand.unshift(player1Card, player2Card);
        document.querySelector('#player-2-score').style.fontSize='30px';
        document.querySelector('#player-2-score').textContent='This War is Theirs!';
        warState = false;
        roundStateActive();
      }
    }
  }


//created the suits here
clubs = new SuitDeck (['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'], 'club', [,,,,,,,,,,,,]);

hearts = new SuitDeck (['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'], 'heart', [,,,,,,,,,,,,]);

spades = new SuitDeck (['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'], 'spade', [,,,,,,,,,,,,]);

diamonds = new SuitDeck (['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'], 'diamond', [,,,,,,,,,,,,]);

//created the players here
player1 = new Player ([], '');
player2 = new Player ([], '');


init();
