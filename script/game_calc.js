/*
DESCRIPTION
*/



//Check current player against final points
function checkCurrentPlayer() {

	//Get data from web storage
	var gameMode = localStorage.getItem("game-mode");
	var finalPoints = localStorage.getItem("final-points");
	var strPlayerPoints = localStorage.getItem("player-points");
	var currentPlayer = localStorage.getItem("current-player");

	//Str2Num
	gameMode = Number(gameMode);
	finalPoints = Number(finalPoints);
	currentPlayer = Number(currentPlayer);

	//Get current player points
	const arrPlayerPoints = strPlayerPoints.split(",");         //str2arr
	var currentPlayerPoints = Number(arrPlayerPoints[currentPlayer - 1]);

	//Go to next step in game cycle
	switch(gameMode) {
	case 0: case 2: case 4: case 6:
		if (currentPlayerPoints >= finalPoints) {
			getNextPlayer();
		} else {
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

	//Str2Num
	gameMode = Number(gameMode);
	numPlayers = Number(numPlayers);
	currentPlayer = Number(currentPlayer);
	gameRound = Number(gameRound);

	//
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

	//Str2Num
	gameMode = Number(gameMode);
	finalPoints = Number(finalPoints);
	points = Number(points);

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
	var strPlayerRounds = localStorage.getItem("player-rounds");
	var numPlayers = localStorage.getItem("num-players");
	var currentPlayer = localStorage.getItem("current-player");

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

	//Add game round to current player
	currentPlayer = Number(currentPlayer);

	const arrPlayerRounds = strPlayerRounds.split(",");         //str2arr

	var currentPlayerRounds = arrPlayerRounds[currentPlayer - 1];
	currentPlayerRounds = Number(currentPlayerRounds) 				//str2num

	currentPlayerRounds += 1;

	//Save new player round
	arrPlayerRounds[currentPlayer - 1] = currentPlayerRounds.toString();
	strPlayerRounds = arrPlayerRounds.toString();					//arr2str
	localStorage.setItem("player-rounds", strPlayerRounds);
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

	//Str2Num
	gameMode = Number(gameMode);
	currentPlayer = Number(currentPlayer);

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
	localStorage.setItem("player-points", strPlayerPoints);

	//Continue with next player
	getNextPlayer();
}



//
function loadingScreen() {

	document.getElementById("main-stats").style.display = "none";
	document.getElementById("loading-screen").style.display = "flex";

	setTimeout(function(){
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("main-stats").style.display = "flex";
	}, Math.floor(Math.random() * (300)) + 400);							//Get random number for timeout (max-min + min)

	closeEntryField();
}



//
function openEntryField() {
	document.getElementById("popup-form").style.display = "block";
	document.getElementById("main-buttons-1").style.display = "none";
	document.getElementById("main-buttons-2").style.display = "none";
	document.getElementById("main-space").style.display = "none";

	//Get data from web storage
	var gameMode = localStorage.getItem("game-mode");

	//Str2Num
	gameMode = Number(gameMode);

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
function closeEntryField() {
	document.getElementById("popup-form").style.display = "none";
	document.getElementById("main-buttons-1").style.display = "inline-flex";
	document.getElementById("main-buttons-2").style.display = "inline-flex";
	document.getElementById("main-space").style.display = "inline-flex";
	document.getElementById("enter-number").value = "";
}



//
function checkInput() {

	var input = document.getElementById("enter-number").value;

	var entries = true;
	var errHead = "Wrong User Input";
	var errInfo = "Input must be a number:<br>- Check for empty field.<br>- Check for letters.<br>- Use a '.' for decimals.";

	if (input === "") {
		entries = false;
	}

	if (entries) {
		currPlayerNewPoints();
	} else {
		openPopup(errHead,errInfo);
	}

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