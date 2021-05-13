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
	console.log(data);
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

	if (data.Urias != null) {
		if (data.Urias.IsAlive)
		{
			let uHitPercent = (data.Urias.CurrentHP / data.Urias.MaximumHP) * 100;
			mainContainer.innerHTML += `<div class="enemyhp"><div class="enemyhpbar danger" style="width:${uHitPercent}%">
				<div id="currentenemyhp">Urias: ${data.Urias.CurrentHP}</div><div class="red" id="percentenemyhp">${uHitPercent.toFixed(1)}%</div></div></div>`;
		}
		//else {
		//mainContainer.innerHTML += `<div class="enemyhp"><div class="enemyhpbar danger" style="width:100%">
		//		<div id="currentenemyhp">Urias: 25000</div><div class="red" id="percentenemyhp">100.0%</div></div></div>`;
		//}
	}

	if (data.Sisters != null) {
		if (data.Sisters.IsAlive)
		{
			let bHitPercent = (data.Sisters.CurrentHP / data.Sisters.MaximumHP) * 100;
			mainContainer.innerHTML += `<div class="enemyhp"><div class="enemyhpbar danger" style="width:${bHitPercent}%">
				<div id="currentenemyhp">D Sister: ${data.Sisters.CurrentHP}</div><div class="red" id="percentenemyhp">${bHitPercent.toFixed(1)}%</div></div></div>`;
		}
		//else {
		//mainContainer.innerHTML += `<div class="enemyhp"><div class="enemyhpbar danger" style="width:100%">
		//		<div id="currentenemyhp">Bella: 2900</div><div class="red" id="percentenemyhp">100.0%</div></div></div>`;
		//}
	}

	if (data.LadyD != null) {
		if (data.LadyD.IsAlive)
		{
			let ldHitPercent = (data.LadyD.CurrentHP / data.LadyD.MaximumHP) * 100;
			mainContainer.innerHTML += `<div class="enemyhp"><div class="enemyhpbar danger" style="width:${ldHitPercent}%">
				<div id="currentenemyhp">Lady Dimitrescu: ${data.LadyD.CurrentHP}</div><div class="red" id="percentenemyhp">${ldHitPercent.toFixed(1)}%</div></div></div>`;
		}
		//else {
		//mainContainer.innerHTML += `<div class="enemyhp"><div class="enemyhpbar danger" style="width:100%">
		//		<div id="currentenemyhp">Lady Dimitrescu: 9000</div><div class="red" id="percentenemyhp">100.0%</div></div></div>`;
		//}
	}
	
}