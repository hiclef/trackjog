const http = new XMLHttpRequest();
//console.log("Ready to make HTTP request.")

//http.open("GET", "http://localhost/pages/table_data.json")
http.open("GET", "table_data.json")
http.send();

http.onreadystatechange = (e) => {

		var txt = http.responseText;
		var jsn = JSON.parse(txt);
		//console.log(txt);

		// Create table
		var tableSection = document.getElementById("js-table-section");
		tableSection.innerHTML = "";
		var table = document.createElement("TABLE");
		table.setAttribute("id", "js-table");
		tableSection.appendChild(table);
	
		// Add table rows
		for (i = 0; i < jsn.length; ++i) {
			row = table.insertRow(i);
			cell1 = row.insertCell(0);
			cell2 = row.insertCell(1);
			cell3 = row.insertCell(2);
			cell1.innerHTML = jsn[i]["date"];
			cell2.innerHTML = jsn[i]["time"];
			cell3.innerHTML = jsn[i]["duration"];
		}

		// Add table header
		var theader = table.createTHead();
		var row = theader.insertRow(0);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		cell1.outerHTML = "<th>DATE</th>";
		cell2.outerHTML = "<th>TIME</th>";
		cell3.outerHTML = "<th>DURATION</th>";


}
