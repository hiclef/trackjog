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

$stamp = "2020-06-22 11:08:54";
//$dt = date_create_from_format('Y-m-d H:i:s', $row["timestamp"]);

$sql = "SELECT start_point, stop_point FROM routes "
	. "WHERE timestamp = '{$stamp}'";

$result = $conn->query($sql);
$conn->close();

/*
while ($row = $result->fetch_assoc()) {
	echo $row["start_point"] . "\n";
	echo $row["stop_point"] . "\n";
}
 */

$data = array(
	"point range" => array(989, 3919),
	"total points" => 2931,
	"duration" => "0:48:50",
	"distance" => 6.188,
	"average speed" => 7.517,
	"max speed" => 5.463,
);

echo json_encode($data, JSON_PRETTY_PRINT);
?>
