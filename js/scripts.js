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

function rollSumTotalIfNotOne(roll) {
  var turn = 0;
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
    turnTotal = rollSumTotalIfNotOne(roll);
    console.log(roll, turnTotal);
    var roll = diceRoll();
  });

  $("button#hold").click(function() {
    playerInGame.turnToFinalTotal(turnTotal);
    turnTotal = 0;
    console.log(playerInGame);
  });

});
