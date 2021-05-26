const JSON_ADDRESS = "127.0.0.1";
const JSON_PORT = 7190;
const POLLING_RATE = 333;

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

function GetPlayerHP(data) {
	let mainContainer = document.getElementById("srtQueryData");
	var hitPercent = (data.PlayerCurrentHealth / data.PlayerMaxHealth) * 100;
	var playerName = (data.PlayerStatus.IsEthan) ? "Ethan: " : (data.PlayerStatus.IsEthan) ? "Chris: " : "";
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
	if (data.CurrentEvent == undefined)
	{
		mainContainer.innerHTML += `
		<div id="chapter">
			<div class="title">SRTUpdate: </div><font color="#FF0000">New Update Available</font>
		</div>`;
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
	if (data.CurrentEvent == "None")
	{
		mainContainer.innerHTML += `
		<div id="chapter">
			<div class="title">Current Event: </div><font color="#00FF00">None</font>
		</div>`;
		return;
	}
	mainContainer.innerHTML += `
	<div id="chapter">
		<div class="title">Current Event: </div><font color="#00FF00">${data.CurrentEvent}</font>
	</div>`;
}

function appendData(data) {
	//console.log(data);
	var mainContainer = document.getElementById("srtQueryData");
	mainContainer.innerHTML = "";

	mainContainer.innerHTML += `
	<div id="position">
		X: <font color="#00FF00">${data.PlayerPositionX.toFixed(3)}</font>
		Y: <font color="#00FF00">${data.PlayerPositionY.toFixed(3)}</font>
		Z: <font color="#00FF00">${data.PlayerPositionZ.toFixed(3)}</font>
	</div>`;
	//PLAYERS HP
	GetPlayerHP(data);
	mainContainer.innerHTML += `
	<div id="da">
		<div class="title">DA Score: </div><font color="#00FF00">${data.RankScore}</font> 
		<div class="title">DA Rank: </div><font color="#00FF00">${data.Rank}</font>
		<div class="title">Lei: </div><font color="#00FF00">${data.Lei}</font>
	</div>`;
	GetCurrentEvent(data);
	//var table = document.createElement("table");
	var filterdEnemies = data.EnemyHealth.filter(m => { return (m.IsAlive) });
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