var map = L.map('mapid').setView([42.507837, -71.119082], 14);

// Mapbox token
const token = "pk.eyJ1IjoiaGktY2xlZiIsImEiOiJja2M3MzZ2bHowc3pjMnh0NmtzZzhpNGtxIn0.R2Kv_cYDCm-JVBR5sOVcKg"

// Street map tiles
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + token, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: token
}).addTo(map);

// Timestamp for choice of route
var stampMap = sessionStorage.getItem("routeTimestamp");

// Route from database
var httpRoute = new XMLHttpRequest();
//httpRoute.open("GET", "http://localhost/pages/get_map.php")
httpRoute.open("GET", "http://localhost/backend/php/get_map.php?timestamp=" + stampMap)
httpRoute.send();

httpRoute.onreadystatechange = (e) => {
	// Route coordinates
	var latlons = JSON.parse(httpRoute.responseText);
	
	// Add route and zoom to fit
	var polyline = L.polyline(latlons, {color: 'red'}).addTo(map);
	map.fitBounds(polyline.getBounds());
}
