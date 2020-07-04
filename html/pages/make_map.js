var mymap = L.map('mapid').setView([42.507837, -71.119082], 13);

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
}).addTo(mymap);
