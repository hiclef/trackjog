function makeSpeedPlot() {
	document.getElementById("display-section").innerHTML = "<canvas id='speed-plot-id'></canvas>"
	var ctxSpeed = document.getElementById('speed-plot-id');

	// Timestamp for choice of route
	var stampSpeedPlot = sessionStorage.getItem("routeTimestamp");

	// Plot from database
	var httpSpeedPlot = new XMLHttpRequest();
	httpSpeedPlot.open("GET", "http://localhost/backend/php/get_speedplot.php?timestamp=" + stampSpeedPlot)
	httpSpeedPlot.responseType = "json";
	httpSpeedPlot.send();

	httpSpeedPlot.onreadystatechange = (e) => {

		if(httpSpeedPlot.readyState == 4 && httpSpeedPlot.status == 200) {
			// Obtain data points for plot 
			let points = httpSpeedPlot.response;
			//var points = JSON.parse(httpSpeedPlot.responseText);

			// Create dataset
			dataSet = {
				label: "Speed (m/s)",
				data: points,
				borderColor: "red",
				fill: false,
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
	}
}
