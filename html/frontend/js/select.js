import { getEndpointPath, makeFeature, updateFeature } from './feature_update.js';

export function selectRoute(timestamp) {

	const oldRoute = document.getElementsByClassName("selected-route")[0];
	const newRoute = document.getElementById(timestamp);
	const display = document.getElementsByClassName("selected-display")[0];
	
	oldRoute.setAttribute("class", "unselected-route");
	newRoute.setAttribute("class", "selected-route");

	updateFeature("route-summary", timestamp);
	updateFeature(display.id, timestamp);
}

export function selectDisplay(display) {

	const route = document.getElementsByClassName("selected-route")[0];
	const oldDisplay = document.getElementsByClassName("selected-display")[0];
	const newDisplay = document.getElementById(display);

	oldDisplay.setAttribute("class", "unselected-display");
	newDisplay.setAttribute("class", "selected-display");
	
	updateFeature(newDisplay.id, route.id);
}
