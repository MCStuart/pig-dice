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

// Set win condition for roll+turn total+final total over 100
PlayerInGame.prototype.winCondition = function () {
  if ((this.roll + this.turnTotal + this.finalTotal) >= 100) {
    alert("Congratulations, " + this.name + "! You won!");
  } else {};
};

//Hold function
PlayerInGame.prototype.endTurn = function () {
  this.finalTotal += this.turnTotal;
  this.turnTotal = 0;
  this.roll = 0;
};



// Adds new players to the Game
Game.prototype.addPlayer = function(playerInGame) {
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
    var player2 = $("input#playerName2").val();
    player2 = new PlayerInGame(player2);
    game.addPlayer(player2);
    player1 = new PlayerInGame(player1);
    game.addPlayer(player1);
    console.log(game);
    console.log(game.currentId);
    console.log(game.players[0]);
    $("button#newGame").hide();
    $("form.playerField").hide();
    $("div.dieDisplay").show();
    $(".nameOfCurrentPlayer").html(game.players[game.currentId].name);
  });
  $("button#roll").click(function() {
    game.players[game.currentId].rollValue();
    game.players[game.currentId].rollSumTotalIfNotOne();
    game.players[game.currentId].winCondition();
    console.log(game.players[game.currentId]);
    $("#riceDoll").html(game.players[game.currentId].roll);
    $("#turnTotal").html(game.players[game.currentId].turnTotal);
    $("#previousScores").html(game.players[game.currentId].finalTotal);
  });
  $("button#hold").click(function() {
    game.players[game.currentId].endTurn();
    console.log(game);
    game.currentId++;
    if (game.currentId >= game.players.length) {
      game.currentId = 0;
    }
    $(".nameOfCurrentPlayer").html(game.players[game.currentId].name);
    $("#riceDoll").html(0);
    $("#turnTotal").html(0);
    $("#previousScores").html(game.players[game.currentId].finalTotal);
  });
});
