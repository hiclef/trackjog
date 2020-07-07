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
	. "WHERE timestamp = '$stamp'";
$result_range = $conn->query($sql_range);
$range = $result_range->fetch_assoc();
$start = $range["start_point"];
$stop = $range["stop_point"];

// Get points
$sql_points = "SELECT latitude, longitude, time FROM points "
		. "WHERE id BETWEEN $start AND $stop";
$result_points = $conn->query($sql_points);
$conn->close();

// Speeds at each second 
$data = array();

$row = $result_points->fetch_assoc();
$lat0 = $row["latitude"];
$lon0 = $row["longitude"];

while ($row = $result_points->fetch_assoc()) {
	$lat1 = $row["latitude"];
	$lon1 = $row["longitude"];

	$speed = vincentyGreatCircleDistance($lat0, $lon0, $lat1, $lon1);
	$point = array("x" => $row["time"], "y" => $speed);
	array_push($data, $point);

	$lat0 = $lat1;
	$lon0 = $lon1;
}

echo json_encode($data);
?>
