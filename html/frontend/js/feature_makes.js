export function makeSummary(data) {

	const summarySection = document.getElementById("route-summary");
	const uList = document.createElement("ul");
	summarySection.innerHTML = "";
	summarySection.appendChild(uList);
	
	for (let key in data) {
		let item = document.createElement("li"); 
		item.innerHTML = key + ": " + data[key];
		uList.appendChild(item);
	}
}

export function makeMap(data) {

	const displaySection = document.getElementById("display-section");
	displaySection.innerHTML = "<div id='mapid'></div>";

	var map = L.map('mapid').setView([42.507837, -71.119082], 14);

	// Mapbox token
	const token = "pk.eyJ1IjoiaGktY2xlZiIsImEiOiJja2M3MzZ2bHowc3pjMnh0NmtzZzhpNGtxIn0.R2Kv_cYDCm-JVBR5sOVcKg"

	// Street map tiles
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + token, {
    		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> '
		 + 'contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
		 + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    		maxZoom: 18,
    		id: 'mapbox/streets-v11',
    		tileSize: 512,
    		zoomOffset: -1,
    		accessToken: token
	}).addTo(map);
	
	// Route path
	const polyline = L.polyline(data, {color: 'red'}).addTo(map);
	map.fitBounds(polyline.getBounds());
}

export function makeDistPlot(points) {

	const displaySection = document.getElementById("display-section");
	displaySection.innerHTML = "<canvas id='dist-plot-id'></canvas>";

	var ctxDist = document.getElementById('dist-plot-id');

	// Create dataset
	let dataSet = {
		label: "Distance (m)",
		data: points,
		borderColor: "red",
		fill: true,
		lineTension: 0.1,
	};

	// Set options
	let scaleTime = {
		scales: {
			xAxes: [{ type: "time" }]
		}
	};

	// Create plot
	var plot = new Chart(ctxDist, {
		type: 'line',
		data: { datasets: [dataSet] },
		options: scaleTime,
	});

}

export function makeSpeedPlot(points) {

	const displaySection = document.getElementById("display-section");
	displaySection.innerHTML = "<canvas id='speed-plot-id'></canvas>";

	var ctxSpeed = document.getElementById('speed-plot-id');

	// Create dataset
	let dataSet = {
		label: "Speed (m/s)",
		data: points,
		borderColor: "red",
		fill: false,
		lineTension: 0.1,
	};

	// Set options
	let scaleTime = {
		scales: {
			xAxes: [{ type: "time" }]
		}
	};

	// Create plot
	var plot = new Chart(ctxSpeed, {
		type: 'line',
		data: { datasets: [dataSet] },
		options: scaleTime,
	});
}
