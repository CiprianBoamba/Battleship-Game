
// view.displayMiss("00");
// view.displayHit("34");
// view.displayMiss("55");
// view.displayHit("12");
// view.displayMiss("25");
// view.displayHit("26");



// let ship1 = {
  //   location: ["10", "20", "30"],
  //   hits: ["", "", ""]
  // };
  // let ship2 = {
    //   location: ["32", "33", "34"],
    //   hits: ["", "", ""]
    // };
    // let ship3 = {
      //   location: ["63", "64", "65"],
      //   hits: ["", "", "hit"]
      // };
      //  let ships = [
        //   {location: ["10", "20", "30"],hits: ["", "", ""]},
//   {location: ["32", "33", "34"],hits: ["", "", ""]},
//   {location: ["62", "64", "65"],hits: ["", "", ""]},
// ];

let view = {
  displayMessage : function(msg) {
    let messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  displayHit : function(location){
    let cell = document.getElementById(location);
          cell.setAttribute("class", "hit");
        },
   displayMiss : function(location) {
          let cell = document.getElementById(location);
          cell.setAttribute("class", "miss");
        }
};
      

const model = {
  boardSize : 7,
  numShips: 3,
  shipsSunk: 0,
  shipLength: 3,
  ships : [
  {locations: ["06", "16", "26"],hits: ["", "", ""]},
  {locations: ["24", "34", "44"],hits: ["", "", ""]},
  {locations: ["10", "11", "12"],hits: ["", "", ""]},
],

  fire: function(guess) {
    for(let i = 0; i < this.numShips; i++){
      let ship = this.ships[i];
      let locations = ship.locations;
      let index = locations.indexOf(guess);
      // console.log(ship);
      // console.log(locations);
      // console.log(index);
      if(index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("HIT");
        if(this.isSunk(ship)) {
          view.displayMessage("You sank my battleship!")
          this.shipsSunk++;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("You missed");
    return false;
  },

  isSunk: function (ship) {
    for(let i = 0; i < this.shipLength; i++) {
        if(ship.hits[i] !== "hit") {
          return false;
        }
    }
    return true;
  },
  generateShipLocations: function () {
    let locations ;
    for(let i=0; i < this.numShips; i++){
      do {
        locations = this.generateShip();
      } while (this.collision(locations));
      this.ships[i].locations = locations;
    }
  },
  generateShip: function() {
      let direction = Math.floor(Math.random()* 2);
      // console.log(direction);
      let row;
      let column;
      if(direction === 1) {
        
      }
  }
};

// model.generateShip();


const controller = {
  guesses: 0,
  processGuess: function(guess) {
    let location = parseGuess(guess) ;
    // console.log(location);
      if(location) {
        this.guesses++;
        let hit = model.fire(location);
        if(hit && model.shipsSunk === model.numShips) {
          view.displayMessage("You sank all my battleships, in " + this.guesses + "guesses");
        }
      }
  }
};

function parseGuess(guess) {
  let alphabet = ["A", "B", "C", "D", "E", "F", "G"];
  if(guess === null || guess.length !== 2) {
    alert("please enter a letter and a number on the board")
  }
  else {
    let firstChar = guess.charAt(0);
    let row = alphabet.indexOf(firstChar);
    let column = guess.charAt(1);
    // console.log(isNaN(row))

    if(isNaN(row) || isNaN(column) ){
        alert("oops this isn't a number on the board!")
    } else if( row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize ) {
        alert(" oops, that's off the board!")
    } else {
      return row + column;
    }
  }
  return null;
}

function init() {
  let fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  let guessInput = document.getElementById("guessInput");
  guessInput.onkeypress  = handleKeyPress;


}

function handleFireButton() {
 let guessInput = document.getElementById("guessInput");
 let guess = guessInput.value;
 controller.processGuess(guess);
guessInput.value = "";
//  console.log(guess);
};

function handleKeyPress(e) {
  let fireButton = document.getElementById("fireButton");
  if(e.keycode === 13) {
    fireButton.click();
    return false;
  }
}


window.onload = init;
// console.log(parseGuess("00"));
// console.log(parseGuess("B6"));
// console.log(parseGuess("G3"));
// console.log(parseGuess("H0"));
// console.log(parseGuess("A7"));

// controller.processGuess("A0");

// controller.processGuess("A6");
// controller.processGuess("B6");
// controller.processGuess("C6");

// controller.processGuess("C4");
// controller.processGuess("D4");
// controller.processGuess("E4");

// controller.processGuess("B0");
// controller.processGuess("B1");
// controller.processGuess("B2");





// model.fire("53");

// model.fire("06");
// model.fire("16");
// model.fire("26");


// model.fire("34");
// model.fire("24");
// model.fire("44");

// model.fire("12");
// model.fire("11");
// model.fire("10");
