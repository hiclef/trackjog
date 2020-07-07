function selectRoute(timestamp) {

	if (timestamp != sessionStorage.getItem("routeTimestamp")) {
		let oldRoute = document.getElementsByClassName("selected-route")[0];
		oldRoute.setAttribute("class", "unselected-route");
		let newRoute = document.getElementById(timestamp);
		newRoute.setAttribute("class", "selected-route");
	
		sessionStorage.setItem("routeTimestamp", timestamp);
		//console.log("Timestamp: " + timestamp);
		updateRouteSummary();
		updateDisplay();
	}
}

function selectDisplay(display) {

	if (display != sessionStorage.getItem("routeDisplay")) {
		let oldDisplay = document.getElementsByClassName("selected-display")[0];
		oldDisplay.setAttribute("class", "unselected-display");
		let newDisplay = document.getElementById(display);
		newDisplay.setAttribute("class", "selected-display");
	
		sessionStorage.setItem("routeDisplay", display);
		//console.log("Display: " + display);
		updateDisplay();
	}
}

function updateRouteSummary() {
	let timestamp = sessionStorage.getItem("routeTimestamp");
	//console.log("Updating route summary.");
	makeSummary();
}

function updateDisplay() {
	let timestamp = sessionStorage.getItem("routeTimestamp");
	let display = sessionStorage.getItem("routeDisplay");
	//console.log("Updating display.");

	if (display == 'route-map') makeMap();
	else if (display == 'dist-plot') makeDistPlot();
	else if (display == 'speed-plot') makeSpeedPlot();
}
