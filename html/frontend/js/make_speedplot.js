var ctxSpeed = document.getElementById('speed-plotid');

// Timestamp for choice of route
var stampSpeedPlot = sessionStorage.getItem("routeTimestamp");

// Plot from database
var httpSpeedPlot = new XMLHttpRequest();
httpSpeedPlot.open("GET", "http://localhost/backend/php/get_speedplot.php?timestamp=" + stampSpeedPlot)
httpSpeedPlot.send();

httpSpeedPlot.onreadystatechange = (e) => {
	// Obtain data points for plot 
	var points = JSON.parse(httpSpeedPlot.responseText);

	// Create dataset
	dataSet = {
		label: "Speed (m/s)",
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
	var plot = new Chart(ctxSpeed,{
		type: 'line',
		data: { datasets: [dataSet] },
		options: scaleTime,
	});
}
