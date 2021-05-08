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

	var hitPercent = (data.CurrentHP / data.MaxHP) * 100;
	//if (hitPercent > 66) {
	//	mainContainer.innerHTML += `<font size="4" color="#7cfc00"><div id="currenthp">HP: ${data.CurrentHP}</div></font>`;
	//}
	//else if (hitPercent <= 66 && hitPercent > 33) {
	//	mainContainer.innerHTML += `<font size="4" color="#daa520"><div id="currenthp">HP: ${data.CurrentHP}</div></font>`;
	//}
	//else {
	//	mainContainer.innerHTML += `<font size="4" color="#ff0000"><div id="currenthp">HP: ${data.CurrentHP}</div></font>`;
	//}

	if (hitPercent > 66) {
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar fine" style="width:${hitPercent}%">
				<div id="currenthp">Ethan ${data.CurrentHP}</div><div class="green" id="percenthp">${hitPercent.toFixed(1)}%</div></div></div>`;
	}
	else if (hitPercent <= 66 && hitPercent > 33) {
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar caution" style="width:${hitPercent}%">
				<div id="currenthp">Ethan ${data.CurrentHP}</div><div class="yellow" id="percenthp">${hitPercent.toFixed(1)}%</div></div></div>`;
	}
	else if (hitPercent <= 33 && hitPercent > 0){
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar danger" style="width:${hitPercent}%">
				<div id="currenthp">Ethan ${data.CurrentHP}</div><div class="red" id="percenthp">${hitPercent.toFixed(1)}%</div></div></div>`;
	}
	else {
		mainContainer.innerHTML += `<div class="hp"><div class="hpbar dead" style="width:${100}%">
				<div id="currenthp">Ethan ${data.CurrentHP}</div><div class="grey" id="percenthp">${0}%</div></div></div>`;
	}
	
	mainContainer.innerHTML += `<font size="4" color="#fff"><div id="lei">Lei: ${data.CurrentLei}</div></font>`;
	
	mainContainer.innerHTML += `<div id="darank">DA Rank: ${data.CurrentDARank}</div>`;

	mainContainer.innerHTML += `<div id="score">DA Score: ${data.CurrentDAScore}</div>`;
}