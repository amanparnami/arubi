<?php
include 'db_helper.php';
header("Content-type: application/json");

//http://localhost/server/updateDeviceInfo.php?f=updateIP&device=&ip=192.168.1.2

$deviceId = $_GET["id"];
switch($_GET["f"])
{
	case "updateIP":
	$ipAddress = $_GET["ip"];
	updateIpAddress($deviceId, $ipAddress);
	break;
	case "updateAvailability":
	$availability = $_GET["available"];
	updateAvailability($deviceId, $availability);
	break;
}

function updateIpAddress($deviceId, $ipAddress)
{
       $dbQuery = sprintf("UPDATE device SET ipaddress = '$ipAddress' WHERE id = $deviceId");
       $result = getDBResultAffected($dbQuery, 'id', 'ipaddress');
       logMsg('device', $deviceId, 'update', 'ip address updated');
       //echo "h";
}

function updateAvailability($deviceId, $availability)
{
       $dbQuery = sprintf("UPDATE device SET available = $availability WHERE id = $deviceId");
       $result = getDBResultAffected($dbQuery, 'id', 'available');
       logMsg('device', $deviceId, 'update', 'availability info changed');
       echo "hi";
}

?>


