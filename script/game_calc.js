/*
DESCRIPTION
*/



//Check current player against final points
function checkCurrentPlayer() {

	//Get data from web storage
	var gameMode = localStorage.getItem("game-mode");
	var strPlayerPoints = localStorage.getItem("player-points");
	var currentPlayer = localStorage.getItem("current-player");

	console.log(gameMode);
	console.log(strPlayerPoints);
	console.log(currentPlayer);

	//Get current player points
	const arrPlayerPoints = strPlayerPoints.split(",");         //str2arr
	var currentPlayerPoints = arrPlayerPoints[currentPlayer - 1];

	//Go to next step in game cycle
	switch(gameMode) {
	case 0: case 2: case 4: case 6:
		if (currentPlayerPoints >= finalPoints) {
			getNextPlayer();
		} else {
			console.log("----------checkCurrentPlayer before calling loadingScreen");
			loadingScreen();
			playCurrentPlayer();
		}

		break;

	case 1: case 3: case 5: case 7:
		if (currentPlayerPoints <= finalPoints) {
			getNextPlayer();
		} else {
			loadingScreen();
			playCurrentPlayer();
		}

		break;

	}
}



//
function getNextPlayer() {

	//Get data from web storage
	var gameMode = localStorage.getItem("game-mode");
	var strPlayerPoints = localStorage.getItem("player-points");
	var numPlayers = localStorage.getItem("num-players");
	var currentPlayer = localStorage.getItem("current-player");
	var gameRound = localStorage.getItem("game-round");

	if (currentPlayer < numPlayers) {
		//Get next player
		currentPlayer++;
		localStorage.setItem("current-player", currentPlayer);
    
	} else if (currentPlayer == numPlayers) {

  		//Get all player points
		const arrPlayerPoints = strPlayerPoints.split(",").map(Number);         //str2arr of numbers

		//Check end of game
		switch(gameMode) {
		case 0: case 1: case 2: case 3:
			if (arrPlayerPoints.some(checkPoints)) {				//Check player points - one player reaches final points
				window.location = "./endscreen";

				return;
			}

			break;

		case 4: case 5: case 6: case 7:
			if (arrPlayerPoints.every(checkPoints)) {				//Check player points - every player reaches final points
				window.location = "./endscreen";

				return;
			}

			break;

		}

		//Start next game round
		gameRound++;
		localStorage.setItem("game-round", gameRound);

		currentPlayer = 1;
		localStorage.setItem("current-player", currentPlayer);

	}

	checkCurrentPlayer();
}

function checkPoints(points) {

	//Get data from web storage
	var gameMode = localStorage.getItem("game-mode");
	var finalPoints = localStorage.getItem("final-points");

	switch(gameMode) {
	case 0: case 2: case 4: case 6:
		return points >= finalPoints;

		break;

	case 1: case 3: case 5: case 7:
		return points <= finalPoints;

		break;

	}
}



//
function playCurrentPlayer() {

	//Get data from web storage
	var gameRound = localStorage.getItem("game-round");
	var strPlayerNames = localStorage.getItem("player-names");
	var strPlayerPoints = localStorage.getItem("player-points");
	var numPlayers = localStorage.getItem("num-players");
	var currentPlayer = localStorage.getItem("current-player");

	console.log("----------playCurrentPlayer");

	//Display current game round stats
	document.getElementById("current-round").innerHTML = "Round " + gameRound;
	document.getElementById("current-player").innerHTML = "Player " + currentPlayer + "/" + numPlayers;

	//Display current player and points
	const arrPlayerNames = strPlayerNames.split(",");         //str2arr
	const arrPlayerPoints = strPlayerPoints.split(",");         //str2arr

	var currentPlayerName = arrPlayerNames[currentPlayer - 1];
	var currentPlayerPoints = arrPlayerPoints[currentPlayer - 1];

	currentPlayerName = currentPlayerName.toUpperCase();
	currentPlayerName += "'S TURN";

	document.getElementById("current-turn-name").innerHTML = currentPlayerName;
	document.getElementById("game-points").innerHTML = currentPlayerPoints;
  
}



//
function currPlayerCurrPoints() {

	//Get data from web storage
	var strPlayerNames = localStorage.getItem("player-names");
	var currentPlayer = localStorage.getItem("current-player");

	//Display current player and points in blurry
	const arrPlayerNames = strPlayerNames.split(",");					//str2arr
	var currentPlayerName = arrPlayerNames[currentPlayer - 1];

	currentPlayerName = currentPlayerName.toUpperCase();
	currentPlayerName += "'S TURN";

	document.getElementById("current-turn-name-loading").innerHTML = currentPlayerName;

	//Continue with next player
	getNextPlayer();
}



//
function currPlayerNewPoints() {

	//Get data from web storage
	var gameMode = localStorage.getItem("game-mode");
	var strPlayerNames = localStorage.getItem("player-names");
	var strPlayerPoints = localStorage.getItem("player-points");
	var currentPlayer = localStorage.getItem("current-player");

	//Display current player and points in blurry
	const arrPlayerNames = strPlayerNames.split(",");					//str2arr
	var currentPlayerName = arrPlayerNames[currentPlayer - 1];

	currentPlayerName = currentPlayerName.toUpperCase();
	currentPlayerName += "'S TURN";

	document.getElementById("current-turn-name-loading").innerHTML = currentPlayerName;

	// Get current player points
	const arrPlayerPoints = strPlayerPoints.split(",");         //str2arr
	var currentPlayerPoints = arrPlayerPoints[currentPlayer - 1];
	currentPlayerPoints = Number(currentPlayerPoints) 				//str2num

	// Calculate points for next game round
	switch(gameMode) {
	case 0: case 2: case 4: case 6:
		currentPlayerPoints += Number(document.getElementById("enter-number").value);
		break;

	case 1: case 3: case 5: case 7:
		currentPlayerPoints -= Number(document.getElementById("enter-number").value);
		break;
	}

	// Save new player points
	arrPlayerPoints[currentPlayer - 1] = currentPlayerPoints.toString();
	strPlayerPoints = arrPlayerPoints.toString();					//arr2str

	//Continue with next player
	getNextPlayer();
}



//
function loadingScreen() {

	console.log("----------loadingScreen");
	document.getElementById("main-stats").style.display = "none";
	document.getElementById("loading-screen").style.display = "flex";

	setTimeout(function(){
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("main-stats").style.display = "flex";
	}, Math.floor(Math.random() * (300)) + 400);							//Get random number for timeout (max-min + min)

	closePopup();
}



//
function openPopup() {
	document.getElementById("popup-form").style.display = "block";
	document.getElementById("main-buttons-1").style.display = "none";
	document.getElementById("main-buttons-2").style.display = "none";
	document.getElementById("main-space").style.display = "none";

	//Get data from web storage
	var gameMode = localStorage.getItem("game-mode");

	switch(gameMode) {
	case 0: case 2: case 4: case 6:
		document.getElementById("enter-number").placeholder = "Points to add";

		break;

	case 1: case 3: case 5: case 7:
		document.getElementById("enter-number").placeholder = "Points to substract";

		break;
	}
}



//
function closePopup() {
	document.getElementById("popup-form").style.display = "none";
	document.getElementById("main-buttons-1").style.display = "inline-flex";
	document.getElementById("main-buttons-2").style.display = "inline-flex";
	document.getElementById("main-space").style.display = "inline-flex";
	document.getElementById("enter-number").value = "";
}



//
function quitGame() {

  var btn = document.getElementById("quit-game");
  var txt = "Are you sure?";

  //Confirm quit game
  if (btn.innerHTML == txt) {

    window.location = "./";

  }

  btn.innerHTML = txt;
}

function notQuitGame() {

  document.getElementById("quit-game").innerHTML = "Quit Game";

}