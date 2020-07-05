var ctxSpeed = document.getElementById('speed-plotid');

// Timestamp for choice of route
var stampSpeedPlot = sessionStorage.getItem("route_timestamp");

// Plot from database
var httpSpeedPlot = new XMLHttpRequest();
//httpSpeedPlot.open("GET", "http://localhost/pages/get_speedplot.php")
httpSpeedPlot.open("GET", "get_speedplot.php" + "?timestamp=" + stampSpeedPlot)
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
