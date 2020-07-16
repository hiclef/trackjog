import { backendAddr } from './host_settings.js';
import { makeSummary, makeMap, makeDistPlot, makeSpeedPlot } from './feature_makes.js';

export function getEndpointPath(feature) {

	var endpoint;
	switch(feature) {
		case "route-summary":
			endpoint = backendAddr + "backend/php/get_summary.php";
			break;
		case "route-map":
			endpoint = backendAddr + "backend/php/get_map.php";
			break;
		case "dist-plot":
			endpoint = backendAddr + "backend/php/get_distplot.php";
			break;
		case "speed-plot":
			endpoint = backendAddr + "backend/php/get_speedplot.php";
			break;
	}
	return endpoint;
}

export function makeFeature(feature, data) {

	switch(feature) {
		case "route-summary":
			makeSummary(data);
			break;
		case "route-map":
			makeMap(data);
			break;
		case "dist-plot":
			makeDistPlot(data);
			break;
		case "speed-plot":
			makeSpeedPlot(data);
			break;
	}
}

export function updateFeature(feature, timestamp) {

	const endpoint = getEndpointPath(feature);
	const url = endpoint + "?timestamp=" + timestamp;

	const jsonRequest = new XMLHttpRequest();
	jsonRequest.responseType = "json";
	jsonRequest.onreadystatechange = (e) => {

		if(jsonRequest.readyState == 4 && jsonRequest.status == 200) {
			const data = jsonRequest.response; 
			makeFeature(feature, data);
		}
	};

	jsonRequest.open("GET", url);
	jsonRequest.send();
}
