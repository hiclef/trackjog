<?php
$servername = "10.0.0.129";
$username = "matthew";
$password = "G40inp237";
$dbname = "trackjog_test";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$stamp = "2020-06-23 12:27:46";

// Get start,stop point ids
$sql_range = "SELECT start_point, stop_point FROM routes "
	. "WHERE timestamp = '{$stamp}'";
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


echo json_encode($data);
?>
