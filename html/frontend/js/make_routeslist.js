if (!sessionStorage.getItem("routeTimestamp")) {
	sessionStorage.setItem("routeTimestamp", "2020-06-22T11:08:54Z");
}
console.log(sessionStorage.getItem("routeTimestamp"));

var httpRoutelist = new XMLHttpRequest();

httpRoutelist.open("GET", "http://localhost/backend/php/get_routeslist.php")
httpRoutelist.send();

httpRoutelist.onreadystatechange = (e) => {

	let data = JSON.parse(httpRoutelist.responseText);

	let tableSection = document.getElementById("routes-list");
	tableSection.innerHTML = "";
	let table = document.createElement("table");
	tableSection.appendChild(table);

	generateTable(table, data);
	generateTHead(table, data);
}

function generateTable(table, data) {
	for (element of data) {
		let row = table.insertRow();
		for (key in element) {
			let cell = row.insertCell();
			cell.innerHTML = element[key]
		}
		let datetime = element["date"] + "T" + element["time"] + "Z";
		row.setAttribute("onclick", "choose_route('" + datetime + "')");
		row.setAttribute("class", "route-choice");
		//console.log(sessionStorage.getItem("routeTimeStamp"), datetime);
		if (sessionStorage.getItem("routeTimestamp") == datetime) {
			row.setAttribute("id", "route-selection");
		}
	}
}

function generateTHead(table, data) {
	let thead = table.createTHead();
	let row = thead.insertRow();
	for (key in data[0]) {
		let th = document.createElement("th");
		th.innerHTML = key.toUpperCase()
		row.appendChild(th);
	}
}

function choose_route(timestamp) {
	sessionStorage.setItem("routeTimestamp", timestamp);
	document.location.reload();
}
