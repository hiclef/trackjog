var httpRoutelist = new XMLHttpRequest();

//httpRoutelist.open("GET", "http://localhost/pages/get_routeslist.php")
httpRoutelist.open("GET", "get_routeslist.php")
httpRoutelist.send();

httpRoutelist.onreadystatechange = (e) => {

	let data = JSON.parse(httpRoutelist.responseText);

	let tableSection = document.getElementById("js-table-section");
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
		row.setAttribute("onclick", "open_map('" + datetime + "')")
		row.setAttribute("class", "route-choice")
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

function open_map(timestamp) {
	sessionStorage.setItem("route_timestamp", timestamp);
	console.log(timestamp);
	window.location.href = "route_data.html"
}
