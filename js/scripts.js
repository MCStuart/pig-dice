//Business Logic
function diceRoll() {
  return Math.floor( Math.random() * 6 ) +1; // return a random value between [1, 6]
}

// makes a new Game
function Game() {
  this.players = [],
  this.currentId = 0
}

// Adds a player to the game
function PlayerInGame(name, total, turnTotal) {
  this.name = name,
  this.total = 0,
  this.turnTotal = turnTotal
}

// Add roll value to current turn rollTotal

var turn = 0;

// something goes here
function ifOneIsRolled(roll) {
  if (roll === 1) {
    return turn = 0;
  } else {
    turn += roll;
    return turn;
  }
};


// User Interface Logic
$(document).ready(function() {
  $("button#roll").click(function() {
    var roll = diceRoll();
    var turnTotal = ifOneIsRolled(roll);
    console.log(roll, turnTotal);
  });
});
