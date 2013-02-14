<?php

include 'db_helper.php';

header("Content-type: application/json");

switch ($_GET["f"]) {
    case "getDeviceById":getDeviceById($_GET["id"]);break;
    case "getDeviceList":getDeviceList();break;

        break;

    default:
        break;
}

function getDeviceById($id) {
    $dbQuery = sprintf("SELECT * 
                        FROM device
                        WHERE device.id = '$id'
                        LIMIT 0 , 30");
    $result = getDBResultRecord($dbQuery);


    echo json_encode($result);
}


function getDeviceList() {
    $dbQuery = sprintf("SELECT id 
                        FROM device WHERE 1
                        ");
    
    $result = getDBResultsArray($dbQuery);
    
    //$result = getDBResultRecord($dbQuery);


    echo json_encode($result);
}



?>
