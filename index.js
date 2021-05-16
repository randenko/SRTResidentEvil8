const JSON_ADDRESS = "127.0.0.1";
const JSON_PORT = 7190;
const POLLING_RATE = 1000;

const JSON_ENDPOINT = `http://${JSON_ADDRESS}:${JSON_PORT}/`;

window.onload = function () {
	getData();
	setInterval(getData, POLLING_RATE);
};

var Asc = function (a, b) {
	if (a > b) return +1;
	if (a < b) return -1;
	return 0;
};

var Desc = function (a, b) {
	if (a > b) return -1;
	if (a < b) return +1;
	return 0;
};

function getData() {
	fetch(JSON_ENDPOINT)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			appendData(data);
		})
		.catch(function (err) {
			console.log("Error: " + err);
		});
}

function GetGameInit(data) {
	switch (data.GameInit)
	{
		case 1:
			return "None";
		case 2:
			return "Running";
		case 4:
			return "PlayerPaused";
		default:
			return data.GameInit;
	}
}

function GetGameState(data) {
	switch (data.GameState)
	{
		case 0:
			return "None";
		case 1:
			return "Paused";
		case 2:
			return "LoadComplete";
		case 3:
			return "Loading";
		case 64:
			return "FirstCutscene";
		case 65:
			return "FirstCutscenePaused";
		default:
			return data.GameState;
	}
}

function appendData(data) {
	//console.log(data);
	var mainContainer = document.getElementById("srtQueryData");
	mainContainer.innerHTML = "";
	if (data.GameState == 64) {
		ClearBosses();
	}
	//PLAYERS HP
	var hitPercent = (data.PlayerCurrentHealth / data.PlayerMaxHealth) * 100;
	if (hitPercent > 66) {
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar fine" style="width:${hitPercent}%">
				<div id="currenthp">${data.PlayerCurrentHealth}</div><div class="green" id="percenthp">${hitPercent.toFixed(1)}%</div></div></div>`;
	}
	else if (hitPercent <= 66 && hitPercent > 33) {
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar caution" style="width:${hitPercent}%">
				<div id="currenthp">${data.PlayerCurrentHealth}</div><div class="yellow" id="percenthp">${hitPercent.toFixed(1)}%</div></div></div>`;
	}
	else if (hitPercent <= 33 && hitPercent > 0){
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar danger" style="width:${hitPercent}%">
				<div id="currenthp">${data.PlayerCurrentHealth}</div><div class="red" id="percenthp">${hitPercent.toFixed(1)}%</div></div></div>`;
	}
	else {
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar dead" style="width:${100}%">
				<div id="currenthp">${data.PlayerCurrentHealth}</div><div class="grey" id="percenthp">${0}%</div></div></div>`;
	}
	
	mainContainer.innerHTML += `<font size="4" color="#fff"><div id="lei">Lei: ${data.Lei}</div></font>`;
	
	mainContainer.innerHTML += `<div id="darank">DA Rank: ${data.Rank}</div>`;

	mainContainer.innerHTML += `<div id="score">DA Score: ${data.RankScore}</div>`;

	mainContainer.innerHTML += `<div id="gi">Game Init: ${GetGameInit(data)}</div>`;

	mainContainer.innerHTML += `<div id="gs">Game State: ${GetGameState(data)}</div>`;

	var cid = (data.CutsceneState != 4294967295 || data.CutsceneID != 4294967295) ? true : false;

	//mainContainer.innerHTML += `<div id="cs">Cutscene State: ${data.CutsceneState} | ${data.CutsceneID}</div>`;

	mainContainer.innerHTML += `<div id="cs2">Cutscene Playing: ${cid}</div>`;

	var pstate = (data.PauseState == 1) ? true : false;

	mainContainer.innerHTML += `<div id="ps">Is Paused: ${pstate}</div>`;

	//var table = document.createElement("table");
	var filterdEnemies = data.EnemyHealth.filter(m => { return m.IsAlive });
	//console.log("Filtered Enemies", filterdEnemies);
	filterdEnemies.sort(function (a, b) {
		return Asc(a.Percentage, b.Percentage) || Desc(a.CurrentHP, b.CurrentHP);
	}).forEach(function (item, index, arr) {
		if (item.IsAlive) {
			mainContainer.innerHTML += `<div class="enemyhp"><div class="enemyhpbar danger" style="width:${(item.Percentage * 100).toFixed(1)}%">
			<div id="currentenemyhp">${item.CurrentHP}</div><div class="red" id="percentenemyhp">${(item.Percentage * 100).toFixed(1)}%</div></div></div>`;
		}
		
	});
	//mainContainer.appendChild(table);
}