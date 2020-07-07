// Initializations
if (!sessionStorage.getItem("routeTimestamp")) {
	sessionStorage.setItem("routeTimestamp", "2020-06-22T11:08:54Z");
}

if (!sessionStorage.getItem("routeDisplay")) {
	sessionStorage.setItem("routeDisplay", "route-map");
}
let display = document.getElementById("route-map");
display.setAttribute("class", "selected-display");

// Get data for routes list
var httpRoutelist = new XMLHttpRequest();
httpRoutelist.open("GET", "http://localhost/backend/php/get_routeslist.php")
httpRoutelist.responseType = "json";
httpRoutelist.send();

//import { generateTable, generateTHead } from "http://localhost/frontend/js/test_module.js";
httpRoutelist.onreadystatechange = (e) => {

	if(httpRoutelist.readyState == 4 && httpRoutelist.status == 200) {
		let data = httpRoutelist.response;
	
		let tableSection = document.getElementById("routes-list");
		tableSection.innerHTML = "";
		let table = document.createElement("table");
		tableSection.appendChild(table);
	
		generateTable(table, data);
		generateTHead(table, data);
	}
}

updateRouteSummary();
updateDisplay();
