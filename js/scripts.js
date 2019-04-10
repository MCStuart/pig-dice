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

// Assigns each new player a unique Id
Game.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

// Adds new players to the Game
Game.prototype.addPlayer = function(playerInGame) {
  playerInGame.id = this.assignId();
  this.players.push(playerInGame);
}

// funtion to sum rolls per turn resetting if one is rolled

var turn = 0;
function rollSumTotalIfNotOne(roll) {
  if (roll === 1) {
    return turn = 0;
  } else {
    turn += roll;
    return turn;
  }
};

// function to sum total and turn total

PlayerInGame.prototype.turnToFinalTotal = function(turnTotal) {
  this.total += turnTotal;
  console.log(this.total);
}

// User Interface Logic
$(document).ready(function() {
  $("button#roll").click(function() {
    var roll = diceRoll();
    var turnTotal = rollSumTotalIfNotOne(roll);
    console.log(roll, turnTotal);
  });
  $("button#hold").click(function() {

  });
  $("button#newGame").click(function(event) {
    event.preventDefault();
    $("button#newGame").hide();
    var game = new Game();
    $("form.playerField").show();
  });
  $("form.playerField").submit(function(event) {
    event.preventDefault();
    var player1 = $("input#playerName1").val();
    var player2 = $("input#playerName2").val();
    var playerInGame = new PlayerInGame(player1);
    $("button#newGame").hide();
    $("form.playerField").hide();
    $("div.dieDisplay").show();
    console.log(playerInGame);
    console.log(player1, player2);
  });
});
