/*
DESCRIPTION
*/



//
function calcFinalStanding() {

	//Get data from web storage
	var gameMode = localStorage.getItem("game-mode");

	//Str2Num
	gameMode = Number(gameMode);

	switch(gameMode) {
	case 0: case 1: case 2: case 3:
		sortByPlayerPoints();
		//Already implemented function, where round number is not needed
		//Open TODO: find good name for function
		//IDEA: createTable(numberOfColumns) + sortByPlayerPoints() + fillTable()
		break;

	case 4: case 5: case 6: case 7:
		sortByPlayerPoints();
		//New, also needed function
		//Open TODO: save round number, when each player reaches final points
		//IDEA: createTable(numberOfColumns) + sortByGameRound() + fillTable()
		break;
	}
}



//
function sortByPlayerPoints() {

	//Get data from web storage
	var gameMode = localStorage.getItem("game-mode");
	var numPlayers = localStorage.getItem("num-players");
	var strPlayerNames = localStorage.getItem("player-names");
	var strPlayerPoints = localStorage.getItem("player-points");

	//Str2Num
	gameMode = Number(gameMode);
	numPlayers = Number(numPlayers);

	//Convert player names and points
	const arrPlayerPoints = strPlayerPoints.split(",").map(Number);         //str2arr of numbers
	const arrPlayerNames = strPlayerNames.split(",");												//str2arr
	var playerName;
	var playerPoints;

	//Get sorted indeces form player points
	indexedArr = arrPlayerPoints.map(function(e,i){return {ind: i, val: e}});									//make list with indices and values
	indexedArr.sort(function(x, y){return x.val > y.val ? 1 : x.val == y.val ? 0 : -1});			//sort index/value couples, based on values
	
	switch(gameMode) {																				//make list keeping only indices and reverse order depending on game mode
	case 0: case 1: case 4: case 5:
		indices = indexedArr.map(function(e){return e.ind}).reverse();
		break;

	case 2: case 3: case 6: case 7:
		indices = indexedArr.map(function(e){return e.ind});
		break;
	}
	
	//Create variables for final standing
	var temp_points;																//Create temporary variable for players with same end points
	var temp_placement = 1;													//Create temporary variable for placement table sizes
	var temp_position = 1;													//Create temporary variable for positions

	//Create table for game results
	var tdiv = document.getElementById("final-standing");
	const tbl = document.createElement("table");
	const tbdy = document.createElement("tbody");
	tbl.setAttribute("class", "leaderboard-endscreen");

	var cellPosText;
	var cellPlayerText;
	var rowID = 0;

	//Iterate through sorted indices and create table
	for(i=0;i<numPlayers;i++) {

		playerName = arrPlayerNames[indices[i]];
		playerPoints = arrPlayerPoints[indices[i]];

		if (playerPoints!=temp_points) {
			//console.log(playerPoints);
			const row = document.createElement("tr");
			const cellPos = document.createElement("td");
			const cellPlayer = document.createElement("td");
			const cellPoints = document.createElement("td");
			cellPos.style.width = "40px";
			cellPlayer.style.width = "auto";
			cellPoints.style.width = "auto";

			cellPlayer.setAttribute("id", "row-" + rowID);
			rowID++;

			switch(temp_placement) {
			case 1:
				size = "25px";

				cellPosText = document.createTextNode(temp_position + ".");
				cellPos.style.fontSize = size;
				cellPlayer.style.fontSize = size;
				cellPoints.style.fontSize = size;
				cellPos.appendChild(cellPosText);
				row.appendChild(cellPos);

				temp_placement++;
				temp_position++;
				break;

			case 2:
				size = "20px";

				cellPosText = document.createTextNode(temp_position + ".");
				cellPos.style.fontSize = size;
				cellPlayer.style.fontSize = size;
				cellPoints.style.fontSize = size;
				cellPos.appendChild(cellPosText);
				row.appendChild(cellPos);

				temp_placement++;
				temp_position++;
				break;

			case 3:
				size = "15px";

				cellPosText = document.createTextNode(temp_position + ".");
				cellPos.style.fontSize = size;
				cellPlayer.style.fontSize = size;
				cellPoints.style.fontSize = size;
				cellPos.appendChild(cellPosText);
				row.appendChild(cellPos);

				temp_placement++;
				temp_position++;
				break;

			default:
				size = "12px";

				cellPosText = document.createTextNode(temp_position + ".");
				cellPos.style.fontSize = size;
				cellPlayer.style.fontSize = size;
				cellPoints.style.fontSize = size;
				cellPos.appendChild(cellPosText);
				row.appendChild(cellPos);

				temp_position++;
			}

			tbdy.appendChild(row);

			row.appendChild(cellPlayer);
		    tbdy.appendChild(row);

			const cellText = document.createTextNode(playerPoints);
			cellPoints.appendChild(cellText);
			row.appendChild(cellPoints);
			tbdy.appendChild(row);

		}		

		//console.log(playerName);

		temp_points = playerPoints;

	}

	tbl.appendChild(tbdy);
	tdiv.appendChild(tbl);

	//console.log("-------------");

	//Insert player names in table rows
	var temp_points;
	var temp_switch = 0;
	var rowID = -1;
	var allPlayerNames;

	for(i=0;i<numPlayers;i++) {

		playerName = arrPlayerNames[indices[i]];
		playerPoints = arrPlayerPoints[indices[i]];

		if (playerPoints!=temp_points) {
			allPlayerNames = playerName;
			temp_switch = 1;

		} else {
			allPlayerNames += "<br>" + playerName;

		}

		if (temp_switch) {
			rowID++;
			temp_switch = 0;
		}

		//console.log(allPlayerNames);
		//console.log(temp_switch);
		//console.log(j);

		document.getElementById("row-" + rowID).innerHTML = allPlayerNames;

		temp_points = playerPoints;

	}

}



//
function sortByGameRound() {

}