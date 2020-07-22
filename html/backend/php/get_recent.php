<?php
include 'db_credentials.php';
include 'db_functions.php';

// Make & check connection to database
$conn = make_connection($credentials);

// Get all routes
$sql = "SELECT timestamp, distance FROM routes "
	. "WHERE timestamp > '2020-07-01' "
	. "ORDER BY timestamp ASC";
$result = $conn->query($sql);
$conn->close();

$data = array();
while ($row = $result->fetch_assoc()) {

	$dt = date_create_from_format('Y-m-d H:i:s', $row["timestamp"]);
	$date = $dt->format('Y-m-d');

	$item = array(
		"x" => $date,
		"y" => $row["distance"]/1000,
	);

	if ($item["x"] == end($data)["x"]) {
		$item["y"] += end($data)["y"];
		array_pop($data);
	}

	array_push($data, $item);
}

echo json_encode($data ,JSON_PRETTY_PRINT);

// FIX: Some distance values output with repeating 9s after 3rd
// decimal place. Use truncation instead of rounding?

?>
