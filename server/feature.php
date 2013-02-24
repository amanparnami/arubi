<?php


include 'db_helper.php';

header("Content-type: application/json");

switch ($_GET["f"]) {
    case "getFeatureById":getFeatureById($_GET["id"]);break;
    case "getFeatureListByDeviceId":getFeatureListByDeviceId($_GET["deviceId"]);break;
    case "getInputFeaturesByDeviceId":getInputFeaturesByDeviceId($_GET["deviceId"]);break;
    case "getOutputFeaturesByDeviceId":getOutputFeaturesByDeviceId($_GET["deviceId"]);break;
        

    default:
        break;
}

function getFeatureById($id) {
    $dbQuery = sprintf("SELECT * 
                        FROM feature
                        WHERE feature.id = '$id'
                        LIMIT 0 , 30");
    $result = getDBResultRecord($dbQuery);

    echo json_encode($result);
}


function getFeatureListByDeviceId($deviceId) {
    $dbQuery = sprintf("SELECT feature.id 
                        FROM feature, device WHERE device.id = '$deviceId'
                        ");
    //echo $dbQuery;
    
    $result = getDBResultsArray($dbQuery);
    
    //$result = getDBResultRecord($dbQuery);


    echo json_encode($result);
}

function getInputFeaturesByDeviceId($deviceId) {
    $dbQuery = sprintf("SELECT feature 
                        FROM feature WHERE device_id = '$deviceId' AND io_type = 1
                        ");
    //echo $dbQuery;
    
    $result = getDBResultsArray($dbQuery);
    
    //$result = getDBResultRecord($dbQuery);


    echo json_encode($result);
}

function getOutputFeaturesByDeviceId($deviceId) {
    $dbQuery = sprintf("SELECT feature 
                        FROM feature WHERE device_id = '$deviceId' AND io_type = 1
                        ");
    //echo $dbQuery;
    
    $result = getDBResultsArray($dbQuery);
    
    //$result = getDBResultRecord($dbQuery);


    echo json_encode($result);
}

?>
