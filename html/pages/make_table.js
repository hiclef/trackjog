const http = new XMLHttpRequest();
console.log("Ready to make HTTP request.")

//http.open("GET", "http://localhost/pages/table_data.json")
http.open("GET", "table_data.json")
http.send();

http.onreadystatechange = (e) => {
		var txt = http.responseText;
		console.log(txt);
		var jsn = JSON.parse(txt);
		var routesTable = document.getElementById("routes-table");
		routesTable.innerHTML = txt;

		var col = [];
		for (i = 0; i < jsn.length; ++i) {
			for (key in jsn[i]) {
				if (col.indexOf(key)===-1) col.push(key);
			}
		}
		console.log(col); 
}
