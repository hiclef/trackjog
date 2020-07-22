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
$sql_points = "SELECT latitude, longitude FROM points "
		. "WHERE id BETWEEN $start AND $stop";
$result_points = $conn->query($sql_points);
$conn->close();

// Format points
$data = array();
while ($row = $result_points->fetch_assoc()) {
	$latlon = array(floatval($row["latitude"]), floatval($row["longitude"]));
	array_push($data, $latlon);
}

echo json_encode($data /*,JSON_PRETTY_PRINT*/);
?>
