function makeSummary() {
	// Timestamp for choice of route
	var stampSummary = sessionStorage.getItem("routeTimestamp");

	// Route from database
	var httpSummary = new XMLHttpRequest();
	httpSummary.open("GET", "http://localhost/backend/php/get_summary.php?timestamp=" + stampSummary)
	httpSummary.responseType = "json";
	httpSummary.send();

	httpSummary.onreadystatechange = (e) => {

		if(httpSummary.readyState == 4 && httpSummary.status == 200) {
			let data = httpSummary.response;

			let summarySection = document.getElementById("route-summary");
			let uList = document.createElement("ul");
			summarySection.innerHTML = "";
			summarySection.appendChild(uList);
	
			for (key in data) {
				let item = document.createElement("li"); 
				item.innerHTML = key + ": " + data[key];
				uList.appendChild(item);
			}
		}
	}
}
