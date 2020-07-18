<?php
include 'db_credentials.php';
include 'db_functions.php';

// Make & check connection to database
$conn = make_connection($credentials);

// Convert timestamp argument
$stamp = $_GET["timestamp"];
$stamp = substr($stamp, 0, -1);
$stamp[10] = ' ';

// Get start,stop point ids
$sql_range = "SELECT start_point, stop_point FROM routes "
	. "WHERE timestamp = '{$stamp}'";
$result_range = $conn->query($sql_range);
$range = $result_range->fetch_assoc();
$start = intval($range["start_point"]);
$stop = intval($range["stop_point"]);

// Get points
$sql_points = "SELECT latitude, longitude FROM points "
		. "WHERE id BETWEEN $start AND $stop";
$result_points = $conn->query($sql_points);

// Distances
$row = $result_points->fetch_assoc();
$lat0 = $row["latitude"];
$lon0 = $row["longitude"];

$totalDist = 0;

while ($row = $result_points->fetch_assoc()) {
	$lat1 = $row["latitude"];
	$lon1 = $row["longitude"];

	$dist = vincentyGreatCircleDistance($lat0, $lon0, $lat1, $lon1);
	$totalDist += $dist;

	$lat0 = $lat1;
	$lon0 = $lon1;
}

// Add distance (meters) to row in 'routes' table
$sql_distance = "UPDATE routes "
		. "SET distance = $totalDist "
		. "WHERE timestamp = '{$stamp}'";
$conn->query($sql_distance);
$conn->close();
?>
