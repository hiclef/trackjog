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

$sql = "SELECT * FROM routes";
$result = $conn->query($sql);

function duration_string($sec) {
	$h = intdiv($sec, 3600);
	$sec %= 3600;
	$m = intdiv($sec, 60);
	$sec %= 60;
	$s = $sec;

	return "PT{$h}H{$m}M{$s}S";
}

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

$conn->close();

echo json_encode($data/*, JSON_PRETTY_PRINT*/);
?>
