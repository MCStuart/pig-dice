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
  this.total = 0
};

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

// Finds player is array and adds turn total to player total
Game.prototype.findPlayer = function(name) {
  for (var i=0; i< this.players.length; i++) {
      if (this.players[i].name == name) {
        return this.players[i];
      }
    };
  return false;
}

// function to sum total and turn total
PlayerInGame.prototype.turnToFinalTotal = function(turnTotals) {
  this.total += turnTotals;
  console.log(this.total);
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
    var player2 = $("input#playerName2").val();
    playerInGame = new PlayerInGame(player1);
    game.addPlayer(playerInGame);
    console.log(game);
    $("button#newGame").hide();
    $("form.playerField").hide();
    $("div.dieDisplay").show();
    console.log(playerInGame);
    console.log(player1, player2);
  });
  $("button#roll").click(function() {
    var roll = diceRoll();
    turnTotal = rollSumTotalIfNotOne(roll);
    console.log(roll, turnTotal);
  });
  $("button#hold").click(function() {
    console.log(playerInGame)
    playerInGame.turnToFinalTotal(turnTotal);
  });
});
