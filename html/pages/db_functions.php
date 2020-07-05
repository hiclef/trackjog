<?php
// Connect to database
function make_connection($creds) {
	$server = $creds["servername"];
	$user = $creds["username"];
	$pwd = $creds["password"];
	$db = $creds["dbname"];

	// Make connection & get object
	$connection = new mysqli($server, $user, $pwd, $db);

	// Check connection
	if ($connection->connect_error) {
  		die("Connection failed: " . $connection->connect_error);
	}

	// Return connection object
	return $connection;
}

// For distance calculations
function vincentyGreatCircleDistance(
  $latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo, $earthRadius = 6371000)
{
  // convert from degrees to radians
  $latFrom = deg2rad($latitudeFrom);
  $lonFrom = deg2rad($longitudeFrom);
  $latTo = deg2rad($latitudeTo);
  $lonTo = deg2rad($longitudeTo);

  $lonDelta = $lonTo - $lonFrom;
  $a = pow(cos($latTo) * sin($lonDelta), 2) +
    pow(cos($latFrom) * sin($latTo) - sin($latFrom) * cos($latTo) * cos($lonDelta), 2);
  $b = sin($latFrom) * sin($latTo) + cos($latFrom) * cos($latTo) * cos($lonDelta);

  $angle = atan2(sqrt($a), $b);
  return $angle * $earthRadius;
}
?>
