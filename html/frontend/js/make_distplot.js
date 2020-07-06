var ctxDist = document.getElementById('dist-plotid');

// Timestamp for choice of route
var stampDistPlot = sessionStorage.getItem("routeTimestamp");

// Plot from database
var httpDistPlot = new XMLHttpRequest();
httpDistPlot.open("GET", "http://localhost/backend/php/get_distplot.php?timestamp=" + stampDistPlot)
httpDistPlot.send();

httpDistPlot.onreadystatechange = (e) => {
	// Obtain data points for plot 
	var points = JSON.parse(httpDistPlot.responseText);

	// Create dataset
	dataSet = {
		label: "Distance (m)",
		data: points,
		borderColor: "red",
		lineTension: 0.1,
	}

	// Set options
	scaleTime = {
		scales: {
			xAxes: [{ type: "time" }]
		}
	}

	// Create plot
	var plot = new Chart(ctxDist,{
		type: 'line',
		data: { datasets: [dataSet] },
		options: scaleTime,
	});
}
