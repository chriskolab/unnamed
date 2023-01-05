/*
DESCRIPTION
*/



//
function checkEntries() {

  var cond1 = document.getElementById("cond-1").value;
  var cond2 = document.getElementById("cond-2").value;
  var cond3 = document.getElementById("cond-3").value;
  var numPlayers = document.getElementById("num-players").value;

  var entries = true;
  var errHead = "Game can not start"
  var errInfo = "Please recheck following fields:<br>"

  if (!cond1) {
    entries = false;
    errInfo += "- <b>Start points</b>: Not set or not a number.<br>";
  }

  if (!cond2) {
    entries = false;
    errInfo += "- <b>Final points</b>: Not set or not a number.<br>";
  }

  if (cond3 == -100) {
    entries = false;
    errInfo += "- <b>Winning condition</b>: Not set.<br>";
  }

  if (numPlayers == 0) {
    entries = false;
    errInfo += "- <b>Number of players</b>: Must be at least 1.<br>";
  }

  if (entries) {
    storeCond();

  } else {
    openPopup(errHead,errInfo);

  }

}



//
function storeCond() {

  //Clear web storage
  clearStorage();

  //Set initial game mode
  var gameMode = 0;

  //Get input values
  var startPoints = document.getElementById("cond-1").value;
  var finalPoints = document.getElementById("cond-2").value;
  var numPlayers = document.getElementById("num-players").value;

  //Store player names and points in a string
  var playerNames = "";
  var playerPoints = "";

  for(i=0;i<numPlayers;i++) {

    num = i+1;

    playerNames += document.getElementById("player" + num).value;
    playerNames += ",";

    playerPoints += startPoints.toString();
    playerPoints += ",";

  }

  playerNames = playerNames.substring(0, playerNames.length - 1);
  playerPoints = playerPoints.substring(0, playerPoints.length - 1);

  //Calculate game mode
  if (Number(startPoints) > Number(finalPoints)) {
    gameMode += 1;
  }

  if (document.getElementById("cond-4").checked == false) {
    gameMode += 4
  }

  gameMode += Number(document.getElementById("cond-3").value);

  //Store game conditions in web storage
  localStorage.setItem("game-mode", gameMode);
  localStorage.setItem("start-points", startPoints);
  localStorage.setItem("final-points", finalPoints);
  localStorage.setItem("num-players", numPlayers);
  localStorage.setItem("player-names", playerNames);
  localStorage.setItem("player-points", playerPoints);
  localStorage.setItem("game-round", "1");        //Initial game states
  localStorage.setItem("current-player", "1");        //Initial game states

  //Start game
  window.location = "./game";

  /*
  //Output for debugging
  document.getElementById("test").innerHTML = localStorage.getItem("game-mode") + "/" +
  localStorage.getItem("start-points") + "/" +
  localStorage.getItem("final-points") + "/" +
  localStorage.getItem("num-players") + "/" +
  localStorage.getItem("player-names") + "/" +
  localStorage.getItem("player-points") + "/" +
  localStorage.getItem("game-round") + "/" +
  localStorage.getItem("current-player");
  */

}



//
function playerNames() {

  var playerFields = "";
  var num;

  var numPlayers = document.getElementById("num-players").value;

  for(i=0;i<numPlayers;i++) {

    num = i+1;

    //TODO: Convert to DOM
    playerFields += '<div class="container-subarea-gamecond">';
    playerFields += '<div style="flex: 0 0 25%"></div>';
    playerFields += '<label style="flex: 0 0 20%" for="player' + num + '">Player ' + num + '</label>';
    playerFields += '<div style="flex: 1 1 auto"></div>';
    playerFields += '<input style="flex: 0 0 20%" type="text" id="player' + num + '" class="number-input">';
    playerFields += '<div style="flex: 0 0 25%"></div></div>';
  }
  
  document.getElementById("player-names").innerHTML = playerFields;

}



//
function numPlayerUp() {

  document.getElementById("number-step-up").parentNode.querySelector('input[type=number]').stepUp();
  playerNames();

}

function numPlayerDn() {

  document.getElementById("number-step-dn").parentNode.querySelector('input[type=number]').stepDown();
  playerNames();

}
