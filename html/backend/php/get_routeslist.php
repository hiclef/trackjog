<?php
include 'db_credentials.php';
include 'db_functions.php';

// Make & check connection to database
$conn = make_connection($credentials);

// Get all routes
$sql = "SELECT * FROM routes";
$result = $conn->query($sql);
$conn->close();

$data = array();
while ($row = $result->fetch_assoc()) {
	$dt = date_create_from_format('Y-m-d H:i:s', $row["timestamp"]);
	$date = $dt->format('Y-m-d');
	$time = $dt->format('H:i:s');
	$dur_string = duration_string($row["stop_point"] - $row["start_point"]);
	$duration = new DateInterval($dur_string);

	$item = array(
		"date" => $date,
		"time" => $time,
		"duration" => $duration->format("%h:%I:%S"),
	);
	array_push($data, $item);
}

echo json_encode($data/*, JSON_PRETTY_PRINT*/);
?>
