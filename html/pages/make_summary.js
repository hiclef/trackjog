// Timestamp for choice of route
var stampSummary = sessionStorage.getItem("route_timestamp");

// Route from database
var httpSummary = new XMLHttpRequest();
//httpSummary.open("GET", "http://localhost/pages/get_summary.php")
httpSummary.open("GET", "get_summary.php" + "?timestamp=" + stampSummary)
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
		//console.log(item.innerHTML);
		uList.appendChild(item);
	}
}
