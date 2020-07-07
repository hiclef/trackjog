function makeDistPlot() {
	document.getElementById("display-section").innerHTML = "<canvas id='dist-plot-id'></canvas>"
	var ctxDist = document.getElementById('dist-plot-id');

	// Timestamp for choice of route
	var stampDistPlot = sessionStorage.getItem("routeTimestamp");

	// Plot from database
	var httpDistPlot = new XMLHttpRequest();
	httpDistPlot.open("GET", "http://localhost/backend/php/get_distplot.php?timestamp=" + stampDistPlot)
	httpDistPlot.responseType = "json";
	httpDistPlot.send();

	httpDistPlot.onreadystatechange = (e) => {

		if(httpDistPlot.readyState == 4 && httpDistPlot.status == 200) {
			// Obtain data points for plot 
			let points = httpDistPlot.response;
			//var points = JSON.parse(httpDistPlot.responseText);

			// Create dataset
			dataSet = {
				label: "Distance (m)",
				data: points,
				borderColor: "red",
				fill: true,
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
	}
}
