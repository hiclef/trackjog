// Timestamp for choice of route
var stampSummary = sessionStorage.getItem("routeTimestamp");

// Route from database
var httpSummary = new XMLHttpRequest();
httpSummary.open("GET", "http://localhost/backend/php/get_summary.php?timestamp=" + stampSummary)
httpSummary.send();

httpSummary.onreadystatechange = (e) => {

	let data = JSON.parse(httpSummary.responseText);
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
