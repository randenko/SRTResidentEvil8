var JSON_ADDRESS = "127.0.0.1";
const JSON_PORT = 7190;
const POLLING_RATE = 333;

var JSON_ENDPOINT = `http://${JSON_ADDRESS}:${JSON_PORT}/`;

var HideCurrentEvent = false;
var HidePlayerPosition = false;
var HideStats = false;
var HideEnemies = false;
var HideDebug = false;
var ShowBossOnly = false;

window.onload = function () {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const event = urlParams.get('event');
	if (event != null) {
		HideCurrentEvent = true;
	}
	const position = urlParams.get('position');
	if (position != null) {
		HidePlayerPosition = true;
	}
	const stats = urlParams.get('stats');
	if (stats != null) {
		HideStats = true;
	}
	const enemy = urlParams.get('enemy');
	if (enemy != null) {
		HideEnemies = true;
	}
	const bossonly = urlParams.get('bossonly');
	if (bossonly != null) {
		ShowBossOnly = true;
	}
	const debug = urlParams.get('debug');
	if (debug != null) {
		HideDebug = true;
	}
	const ip = urlParams.get('ip');
	if (ip != null) {
		JSON_ADDRESS = ip;
		JSON_ENDPOINT = `http://${JSON_ADDRESS}:${JSON_PORT}/`;
	}
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

function GetPlayerHP(data) {
	let mainContainer = document.getElementById("srtQueryData");
	var hitPercent = (data.PlayerCurrentHealth / data.PlayerMaxHealth) * 100;
	var playerName = (data.PlayerStatus.IsEthan) ? "Ethan: " : (data.PlayerStatus.IsChris) ? "Chris: " : "";
	if (hitPercent > 66) {
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar fine" style="width:${hitPercent}%">
				<div id="currenthp">${playerName}${data.PlayerCurrentHealth} / ${data.PlayerMaxHealth}</div><div class="green" id="percenthp">${hitPercent.toFixed(1)}%</div></div></div>`;
	}
	else if (hitPercent <= 66 && hitPercent > 33) {
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar caution" style="width:${hitPercent}%">
				<div id="currenthp">${playerName}${data.PlayerCurrentHealth} / ${data.PlayerMaxHealth}</div><div class="yellow" id="percenthp">${hitPercent.toFixed(1)}%</div></div></div>`;
	}
	else if (hitPercent <= 33 && hitPercent > 0){
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar danger" style="width:${hitPercent}%">
				<div id="currenthp">${playerName}${data.PlayerCurrentHealth} / ${data.PlayerMaxHealth}</div><div class="red" id="percenthp">${hitPercent.toFixed(1)}%</div></div></div>`;
	}
	else {
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar dead" style="width:${100}%">
				<div id="currenthp">${playerName}${data.PlayerCurrentHealth} / ${data.PlayerMaxHealth}</div><div class="grey" id="percenthp">${0}%</div></div></div>`;
	}
}

function GetCurrentEvent(data) {
	let mainContainer = document.getElementById("srtQueryData");
	if (data.CurrentEvent == undefined || HideCurrentEvent)
	{
		return;
	}
	if (data.CurrentEvent == "")
	{
		mainContainer.innerHTML += `
		<div id="chapter">
			<div class="title">Current Event: </div><font color="#FF0000">Null</font>
		</div>`;
		return;
	}
	mainContainer.innerHTML += `
	<div id="chapter">
		<div class="title">Current Event: </div><font color="#00FF00">${data.CurrentEvent}</font>
	</div>`;
}

function GetPlayerPosition(data) {
	if (HidePlayerPosition)
	{
		return;
	}
	let mainContainer = document.getElementById("srtQueryData");
	mainContainer.innerHTML += `
	<div id="position">
		X: <font color="#00FF00">${data.PlayerPositionX.toFixed(3)}</font>
		Y: <font color="#00FF00">${data.PlayerPositionY.toFixed(3)}</font>
		Z: <font color="#00FF00">${data.PlayerPositionZ.toFixed(3)}</font>
	</div>`;
}

function GetStats(data) {
	if (HideStats)
	{
		return;
	}
	let mainContainer = document.getElementById("srtQueryData");
	mainContainer.innerHTML += `
	<div id="da">
		<div class="title">DA Score: </div><font color="#00FF00">${data.RankScore}</font> 
		<div class="title">DA Rank: </div><font color="#00FF00">${data.Rank}</font>
		<div class="title">Lei: </div><font color="#00FF00">${data.Lei}</font>
	</div>`;
}

function GetEnemies(data) {
	if (HideEnemies)
	{
		return;
	}
	let mainContainer = document.getElementById("srtQueryData");
	//var table = document.createElement("table");
	var filterdEnemies = data.EnemyHealth.filter(m => { return (m.IsAlive) });
	//console.log("Filtered Enemies", filterdEnemies);
	filterdEnemies.sort(function (a, b) {
		return Asc(a.Percentage, b.Percentage) || Desc(a.CurrentHP, b.CurrentHP);
	}).forEach(function (item, index, arr) {
		if (!ShowBossOnly && item.IsAlive) {
			mainContainer.innerHTML += `<div class="enemyhp"><div class="enemyhpbar danger" style="width:${(item.Percentage * 100).toFixed(1)}%">
			<div id="currentenemyhp">${item.CurrentHP}</div><div class="red" id="percentenemyhp">${(item.Percentage * 100).toFixed(1)}%</div></div></div>`;
		}
		else if (ShowBossOnly && item.IsAlive && item.IsBoss) {
			mainContainer.innerHTML += `<div class="enemyhp"><div class="enemyhpbar danger" style="width:${(item.Percentage * 100).toFixed(1)}%">
			<div id="currentenemyhp">${item.BossName}: ${item.CurrentHP}</div><div class="red" id="percentenemyhp">${(item.Percentage * 100).toFixed(1)}%</div></div></div>`;
		}
	});
	
	//mainContainer.appendChild(table);
}

function GetEventType(data) {
	switch(data.EventType)
	{
		case 1:
			return "Skippable Cutscene";
		case 2:
			return "Unskippable Cutscene";
		case 3:
			return "Interactable Cutscene";
		default:
			return "None";
	}
}

function IsCutscene(data) {
	if (data.IsMotionPlay > 0) {
		return "True";
	}
	return "False";
}

function GetDebug(data) {
	if (HideDebug)
	{
		return;
	}
	let mainContainer = document.getElementById("srtQueryData");
	mainContainer.innerHTML += `
	<div id="debug">
		<div class="title">Event Type: </div><font color="#00FF00">${data.EventType} - ${GetEventType(data)}</font> 
	</div>
	<div id="debug">
		<div class="title">Is Cutscene: </div><font color="#00FF00">${data.IsMotionPlay} - ${IsCutscene(data)}</font> 
	</div>
	<div id="debug">
		<div class="title">Menu State: </div><font color="#00FF00">${GetState(data)}</font> 
	</div>
	<div id="debug">
		<div class="title">Last Key Item: </div><font color="#00FF00">${data.LastKeyItem.ItemName}</font> 
	</div>
	`;
}

function GetState(data) {
	
	if (data.PlayerStatus.IsInShop)
	{
		//console.log(`IsInShop: ${data.IsInShop}`);
		return "Shop";
	}
	else if (data.PlayerStatus.IsInInventoryMenu)
	{
		//console.log(`IsInInventoryMenu: ${data.IsInInventoryMenu}`);
		return "Inventory Menu";
	}
	else if (data.PlayerStatus.IsInSelectMenu)
	{
		//console.log(`IsInSelectMenu: ${data.IsInSelectMenu}`);
		return "Select Menu";
	}
	else if (data.PlayerStatus.IsHideShelf)
	{
		//console.log(`IsInSelectMenu: ${data.IsInSelectMenu}`);
		return "Hidden Shelf";
	}
	else if (data.PlayerStatus.IsGameOver)
	{
		//console.log(`IsInSelectMenu: ${data.IsInSelectMenu}`);
		return "Game Over";
	}
	return "None";
}

function appendData(data) {
	//console.log(data);
	var mainContainer = document.getElementById("srtQueryData");
	mainContainer.innerHTML = "";

	if (data.VersionInfo == undefined || data.VersionInfo != "1.0.1.6") {
		mainContainer.innerHTML = `<font color="#FF0000">Outdated Version Please Update</font>`;
		return;
	}

	GetPlayerPosition(data);
	GetPlayerHP(data);	
	GetStats(data);	
	GetCurrentEvent(data);
	GetDebug(data);
	GetEnemies(data);
}