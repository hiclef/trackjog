import { backendAddr } from './host_settings.js';
import { generateTable, generateTHead } from './routeslist.js';
import { selectRoute, selectDisplay } from './select.js';
import { getEndpointPath, makeFeature, updateFeature } from './feature_update.js';

// Initializations
const routeTimestamp = "2020-06-22T11:08:54Z";
const display = document.getElementById("route-map");
display.setAttribute("class", "selected-display");

// Get data for routes table
var httpRoutelist = new XMLHttpRequest();
httpRoutelist.open("GET", backendAddr + "backend/php/get_routeslist.php")
httpRoutelist.responseType = "json";
httpRoutelist.send();

// Make routes table
httpRoutelist.onreadystatechange = (e) => {

	if(httpRoutelist.readyState == 4 && httpRoutelist.status == 200) {
		let data = httpRoutelist.response;
		let table = document.getElementById("routes-table");
	
		generateTable(table, data, routeTimestamp);
		generateTHead(table, data);
	}
}

// Make initial display
updateFeature("route-summary", routeTimestamp);
updateFeature("route-map", routeTimestamp);

// Create click listeners
document.getElementById("routes-table").addEventListener('click', (event) => {
	if (event.target.closest(".unselected-route")) {
		const route = event.target.closest(".unselected-route");
		selectRoute(route.id);
	}
});

document.getElementById("display-options").addEventListener('click', (event) => {
	if (event.target.className == "unselected-display") {
		const display = event.target;
		selectDisplay(display.id);
	}
});
