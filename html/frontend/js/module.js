function generateTable(table, data) {
	for (let element of data) {
		let row = table.insertRow();
		for (let key in element) {
			let cell = row.insertCell();
			cell.innerHTML = element[key]
		}
		let datetime = element["date"] + "T" + element["time"] + "Z";
		row.setAttribute("id", datetime);
		row.setAttribute("class", "unselected-route");
		row.setAttribute("onclick", "selectRoute('" + datetime + "')");

		if (sessionStorage.getItem("routeTimestamp") == datetime) {
			row.setAttribute("class", "selected-route");
		}
	}
}

function generateTHead(table, data) {
	let thead = table.createTHead();
	let row = thead.insertRow();
	for (let key in data[0]) {
		let th = document.createElement("th");
		th.innerHTML = key.toUpperCase()
		row.appendChild(th);
	}
}

