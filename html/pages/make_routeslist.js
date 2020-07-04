const http = new XMLHttpRequest();

//http.open("GET", "http://localhost/pages/get_routeslist.php")
http.open("GET", "get_routeslist.php")
http.send();

http.onreadystatechange = (e) => {

	let data = JSON.parse(http.responseText);

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
