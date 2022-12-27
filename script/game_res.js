/*
DESCRIPTION
*/



//
function calcFinalStanding() {

	//Get data from web storage
	var gameMode = localStorage.getItem("game-mode");
	var strPlayerPoints = localStorage.getItem("player-points");

	//Str2Num
	gameMode = Number(gameMode);

	switch(gameMode) {
	case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:

		//Get number of rows for result table
		const arrPlayerPoints = strPlayerPoints.split(",").map(Number);
		var numRows = new Set(arrPlayerPoints).size;

		createTable(numRows,3);
		sortedArray = sortByPlayerPoints(numRows);

		break;
/*
	case 4: case 5: case 6: case 7:

		//Get number of rows for result table???
		const arrPlayerRounds = strPlayerRounds.split(",").map(Number);
		var numRows = new Set(arrPlayerRounds).size;

		createTable(numRows,4);
		sortedArray = sortByGameRound(gameMode,numRows);

		break;
*/
	}

	fillTable(sortedArray);
}



//
function sortByPlayerPoints() {

	//Get data from web storage
	var gameMode = localStorage.getItem("game-mode");
	var strPlayerPoints = localStorage.getItem("player-points");
	var strPlayerNames = localStorage.getItem("player-names");

	//Str2Num
	gameMode = Number(gameMode);

	//Declare empty arrays for columns
	var arrPosition = [];
	var arrPlayers = [];
	var arrPoints = [];

	//Fill array for positions
	for (var i = 0; i < numRows; i++) {
		arrPosition[i] = i+1 + ".";
	}

	//Remove duplicates in player points by temporary creating a set
	var arrPlayerPoints = strPlayerPoints.split(",").map(Number);         //str2arr of numbers
	var setPlayerPoints = new Set(arrPlayerPoints);				//arr2set
	arrPlayerPointsShort = Array.from(setPlayerPoints);				//set2arr

	//Get sorted indeces from player points
	indexedArr = arrPlayerPointsShort.map(function(e,i){return {ind: i, val: e}});				//Create array with indices and values
	indexedArr.sort(function(x, y){return x.val > y.val ? 1 : x.val == y.val ? 0 : -1});			//Sort index/value couples, based on values
	
	//Make list keeping only indices and reverse order depending on game mode
	switch(gameMode) {
	case 0: case 1: case 4: case 5:
		indices = indexedArr.map(function(e){return e.ind}).reverse();
		break;

	case 2: case 3: case 6: case 7:
		indices = indexedArr.map(function(e){return e.ind});
		break;
	}

	//Fill array for player points
	for (var i = 0; i < numRows; i++) {
		arrPoints[i] = arrPlayerPointsShort[indices[i]];
	}

	var arrPlayerNames = strPlayerNames.split(",");				//str2arr

	//Fill array for player names
	for (var i = 0; i < arrPlayerNames.length; i++) {

		for (var j = 0; j < arrPoints.length; j++) {

			var playerPoints = arrPlayerPoints[i];
			var sortedPoints = arrPoints[j];

			if (playerPoints == sortedPoints) {
				arrPlayers[j] += arrPlayerNames[i] + "<br>";
				
			}
		}
	}

	//Remove string "undefinded" in every array element
	for (var i = 0; i < arrPlayers.length; i++) {
		arrPlayers[i] = arrPlayers[i].substring(9);
	}

	sortedArray = [arrPosition, arrPlayers, arrPoints]

	return sortedArray;
}



//
function sortByGameRound() {

}



//
function createTable(numRows, numCols) {

	var tdiv = document.getElementById("final-standing");
	const tbl = document.createElement("table");

	//Create column group for width of first column
	const cg = document.createElement("colgroup");
	const col = document.createElement("col");
	col.setAttribute("span", "1");
	col.setAttribute("width", "40px");
	cg.appendChild(col);
	tbl.appendChild(cg);

	//Create empty table
	const tbdy = document.createElement("tbody");

	tbl.style.width = "100%";
	tbl.setAttribute("border", "1");

	for (var i = 0; i < numRows; i++) {

		const row = document.createElement("tr");

		for (var j = 0; j < numCols; j++) {

			const cell = document.createElement("td");
			const cellText = document.createTextNode("cell-" + i + j);
			cell.setAttribute("id", "cell-" + i + j);
			cell.style.fontSize = "10px";

			cell.appendChild(cellText);
			row.appendChild(cell);
		}

		tbdy.appendChild(row);
	}

	tbl.appendChild(tbdy);
	tdiv.appendChild(tbl);
}



//
function fillTable(items) {

	//Get size of two dimensional input array
	const [rows,cols] = [ items[0].length, items.length ];

	//Temporary counter for row sizes
	var tblRow = 1;

	//Fill table with item values
	for (var i = 0; i < rows; i++) {

		//Set row sizes
		switch(tblRow) {
		case 1:
			size = "25px";
			tblRow++;
			break;

		case 2:
			size = "20px";
			tblRow++
			break;

		case 3:
			size = "15px";
			tblRow++
			break;

		default:
			size = "12px";
			break;
		}

		//Insert values in cells
		for (var j = 0; j < cols; j++) {
			document.getElementById("cell-" + i + j).innerHTML = items[j][i];
			document.getElementById("cell-" + i + j).style.fontSize = size;
		}
	}
}