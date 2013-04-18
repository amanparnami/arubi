<?php
include 'db_helper.php';
header("Content-type: application/json");

//http://localhost/server/updateDeviceInfo.php?f=updateIP&device=&ip=192.168.1.2

$deviceId = $_GET["id"];
$ipAddress = $_GET["ip"]
$availability = $_GET["available"]
switch($_GET["f"])
{
	case "updateIP":
	updateIpAddress($deviceId, $ipAddress);
	break;
	case "updateAvailability":
	updateAvailability($deviceId, $availability);
	break;
}



function updateIpAddress($deviceId, $ipAddress)
{
       $dbQuery = sprintf("UPDATE device SET
                                               (ipaddress)
                                               VALUES ($ipAddress)
                                               WHERE 
                                               (id = $deviceId)
                                       ");
       $result = getDBResultAffected($dbQuery, 'id', 'ipaddress');
       //logMsg('rule', $result['ruleId'], 'insert', 'new rule created');
       //echo json_encode($result);
}

function updateAvailability($deviceId, $availability)
{
       $dbQuery = sprintf("UPDATE device SET
                                               (available)
                                               VALUES ($availability)
                                               WHERE 
                                               (id = $deviceId)
                                       ");
       $result = getDBResultAffected($dbQuery, 'id', 'available');
       //logMsg('rule', $result['ruleId'], 'insert', 'new rule created');
       echo json_encode($result);
}

?>


