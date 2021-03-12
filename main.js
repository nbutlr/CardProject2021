// Create the cards array with all the necessary cards
function initCards() {
    let colours = ["Red","Yellow","Black"];
    for (i=0;i<3;i++) {
      for (j=1;j<11;j++) {
        cards[(10*i)+j-1] = new Card(colours[i],j);
      }
    }
}
  
// Shuffles an array
function shuffle(array) {
    let currentIndex = array.length, temp, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
}

// Calculates the winner between 2 cards using the rules from the brief
function calculateWinner(card1,card2) {
    if (card1.colour == "Red" && card2.colour == "Black") {
        document.getElementById("p1").innerHTML += "<br>P1 wins as Red beats Black.";
        p1cards.push(card1,card2);
        cards.splice(0,2);
    } else if (card1.colour == "Black" && card2.colour == "Red") {
        document.getElementById("p1").innerHTML += "<br>P2 wins as Red beats Black.";
        p2cards.push(card1,card2);
        cards.splice(0,2);
    } else if (card1.colour == "Yellow" && card2.colour == "Red") {
        document.getElementById("p1").innerHTML += "<br>P1 wins as Yellow beats Red.";
        p1cards.push(card1,card2);
        cards.splice(0,2);
    } else if (card1.colour == "Red" && card2.colour == "Yellow") {
        document.getElementById("p1").innerHTML += "<br>P2 wins as Yellow beats Red.";
        p2cards.push(card1,card2);
        cards.splice(0,2);
    } else if (card1.colour == "Black" && card2.colour == "Yellow") {
        document.getElementById("p1").innerHTML += "<br>P1 wins as Black beats Yellow.";
        p1cards.push(card1,card2);
        cards.splice(0,2);
    } else if (card1.colour == "Yellow" && card2.colour == "Black") {
        document.getElementById("p1").innerHTML += "<br>P2 wins as Black beats Yellow.";
        p2cards.push(card1,card2);
        cards.splice(0,2);
    } else {
        // This last selection works regardless of colour, so it does not need separating //
        if (card1.value > card2.value) {
            document.getElementById("p1").innerHTML += "<br>P1 wins as "+cards[0].value+" is greater than "+cards[1].value+".";
            p1cards.push(card1,card2);
            cards.splice(0,2);
        } else {
            // No chance of draw as each card is unique //
            document.getElementById("p1").innerHTML += "<br>P2 wins as "+cards[1].value+" is greater than "+cards[0].value+".";
            p2cards.push(card1,card2);
            cards.splice(0,2);
        }
    }
}

// This function plays out 1 round and is run every time the button is clicked
function round() {
    roundCounter++;
    document.getElementById("round").innerHTML = "Round "+roundCounter;
    let card0colour = cards[0].colour;
    if (card0colour == "Yellow") {
        card0colour = "#ffdd00";
    }
    let card1colour = cards[1].colour;
    if (card1colour == "Yellow") {
        card1colour = "#ffdd00";
    }
    document.getElementById("p1").innerHTML = "Player 1's card is "+"<span style='color:"+card0colour+";'>"+cards[0].colour+" "+cards[0].value+"</span>"+"<br>Player 2's card is "+"<span style='color:"+card1colour+"'>"+cards[1].colour+" "+cards[1].value+"</span>";
    calculateWinner(cards[0],cards[1]);
    document.getElementById("p2").innerHTML = "P1 has "+p1cards.length+" cards.<br>P2 has "+p2cards.length+" cards.<br>There are "+cards.length+" cards left in the deck.";
    if (cards.length==0) {
        elem = document.getElementById("button1");
        elem.parentNode.removeChild(elem);
        overallWinner();
    } 
}

// Outputs the overall winner of the game
function overallWinner() {
    if (p1cards.length > p2cards.length) {
        document.getElementById("p3").innerHTML = "Player 1 is the winner!";
    } else {
        // There cannot be a draw as cards are moved in groups of 2 //
        document.getElementById("p3").innerHTML = "Player 2 is the winner!";
    }
}

// Card class
class Card {
    constructor(colour,value) {
        this.colour = colour;
        this.value = value;
    }
}
  
// Main Program
cards=[];
p1cards=[];
p2cards=[];
roundCounter = 0;
initCards();
shuffle(cards);
document.getElementById("p2").innerHTML = "There are "+cards.length+" cards in the deck.";