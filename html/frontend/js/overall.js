import { backendAddr } from './host_settings.js';
import { getEndpointPath, makeFeature, updateFeature } from './feature_update.js';

// Dummy initialization
const routeTimestamp = "2020-06-22T11:08:54Z";

// Make initial display
updateFeature("recent-dist", routeTimestamp);




// Create click listeners
