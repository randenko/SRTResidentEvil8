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

function appendData(data) {
	//console.log(data);
	var mainContainer = document.getElementById("srtQueryData");
	mainContainer.innerHTML = "";

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

	mainContainer.innerHTML += `<div id="gi">Game Init: ${data.GameInit}</div>`;

	mainContainer.innerHTML += `<div id="gs">Game State: ${data.GameState}</div>`;

	var cid = (data.CutsceneState != 4294967295 || data.CutsceneID != 4294967295) ? true : false;

	mainContainer.innerHTML += `<div id="cs">Cutscene State: ${data.CutsceneState} | ${data.CutsceneID}</div>`;

	mainContainer.innerHTML += `<div id="cs2">Cutscene Playing: ${cid}</div>`;

	mainContainer.innerHTML += `<div id="ps">Paused: ${data.PauseState}</div>`;

	GetBoss(data.Urias[0], "Urias", 25000);
	GetBoss(data.Sisters, "Bella", 2900);
	GetBoss(data.Sisters, "Cassandra", 3400);
	GetBoss(data.Sisters, "Daniella", 3700);
	GetBoss(data.LadyD, "Lady Dimitrescu", 9000);
	GetBoss(data.Moreau, "Moreau", 26000);
	GetBoss(data.Urias[1], "Urias", 25000);
	//GetBoss(data.Urias[2], "Urias Strǎjer", 75000);
	//GetBoss(data.Sturm, "Sturm", 15000);
	//GetBoss(data.Heisenberg, "Heisenberg", 100000);
	//GetBoss(data.Miranda, "Miranda", 30000);
	//GetBoss(data.Miranda, "Miranda2", 100000);
}

function GetBoss(boss, name, max) {
	let mainContainer = document.getElementById("srtQueryData");
	if (boss.IsAlive)
	{
		if (boss.MaximumHP != max) { return; }
		let _HitPercent = (boss.CurrentHP / boss.MaximumHP) * 100;
		mainContainer.innerHTML += `<div class="enemyhp"><div class="enemyhpbar danger" style="width:${_HitPercent}%">
			<div id="currentenemyhp">${name}: ${boss.CurrentHP}</div><div class="red" id="percentenemyhp">${_HitPercent.toFixed(1)}%</div></div></div>`;
	}
}