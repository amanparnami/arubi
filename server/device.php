<?php

include 'db_helper.php';

header("Content-type: application/json");

switch ($_GET["f"]) {
    case "getDeviceById":getDeviceById($_GET["id"]);break;
    case "getDeviceList":getDeviceList();break;
    case "getDevices":getDevices();break;

        break;

    default:
        break;
}

//Get the ids for all devices
function getDeviceById($id) {
    $dbQuery = sprintf("SELECT * 
                        FROM device
                        WHERE device.id = '$id'
                        LIMIT 0 , 30");
    $result = getDBResultRecord($dbQuery);


    echo json_encode($result);
}

//Get detail information for a device
function getDeviceList() {
    $dbQuery = sprintf("SELECT id 
                        FROM device WHERE 1
                        ");
    
    $result = getDBResultsArray($dbQuery);
    
    //$result = getDBResultRecord($dbQuery);


    echo json_encode($result);
}

//Get all information for all devices
function getDevices(){
    $dbQuery = sprintf("SELECT * 
                        FROM device WHERE 1
                        ");
    
    $result = getDBResultsArray($dbQuery);
    
    //$result = getDBResultRecord($dbQuery);


    echo json_encode($result);
    
}



?>
