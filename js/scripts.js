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

// User Interface Logic
$(document).ready(function() {
  $("button#roll").click(function() {
    var rollTotal = diceRoll();
    console.log(rollTotal);
  });
});
