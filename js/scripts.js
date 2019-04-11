//Business Logic
function diceRoll() {
  return Math.floor( Math.random() * 6 ) +1; // return a random value between [1, 6]
};

// makes a new Game
function Game() {
  this.players = [],
  this.currentId = 0
};

// Adds a player to the game
function PlayerInGame(name) {
  this.name = name,
  this.roll = 0,
  this.turnTotal = 0,
  this.finalTotal = 0
};

PlayerInGame.prototype.rollValue = function() {
  this.roll = diceRoll();
}

// funtion to sum rolls per turn resetting if one is rolled
PlayerInGame.prototype.rollSumTotalIfNotOne = function() {
  if (this.roll === 1) {
    this.roll = 0;
    this.turnTotal = 0;
  } else {
    this.turnTotal += this.roll;
  }
};

PlayerInGame.prototype.winCondition = function () {
  if ((this.roll + this.turnTotal + this.finalTotal) >= 100) {
    alert("Congratulations, " + this.name + "! You won!");
  } else {};
};

// Assigns each new player a unique Id
Game.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

// Adds new players to the Game
Game.prototype.addPlayer = function(playerInGame) {
  playerInGame.id = this.assignId();
  this.players.push(playerInGame);
};


// User Interface Logic
$(document).ready(function() {
  var game = new Game();
  var turnTotal;
  var playerInGame;
  $("button#newGame").click(function(event) {
    event.preventDefault();
    $("button#newGame").hide();
    $("form.playerField").show();
  });
  $("form.playerField").submit(function(event) {
    event.preventDefault();
    var player1 = $("input#playerName1").val();
    playerInGame = new PlayerInGame(player1);
    game.addPlayer(playerInGame);
    console.log(game);
    $("button#newGame").hide();
    $("form.playerField").hide();
    $("div.dieDisplay").show();
    console.log(playerInGame);
    console.log(player1);
  });

  $("button#roll").click(function() {
    playerInGame.rollValue();
    playerInGame.rollSumTotalIfNotOne();
    playerInGame.winCondition();
    console.log(playerInGame.roll);
    console.log(playerInGame.turnTotal);
  });

  $("button#hold").click(function() {

  });

});
