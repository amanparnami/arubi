<?php
include 'db_helper.php';

header("Content-type: application/json");

switch ($_GET["f"]) {
    case "getInputSpecById":getInputSpecById($_GET["id"]);break;
    case "getOutputSpecById":getOutputSpecById($_GET["id"]);break;
    case "getSpecListByFeatureId":getSpecListByFeatureId($_GET["feature_id"]);break;

        break;

    default:
        break;
}

function getInputSpecById($id) {
    $dbQuery = sprintf("SELECT * 
                        FROM input
                        WHERE input.id = '$id'
                        LIMIT 0 , 30");
    $result = getDBResultRecord($dbQuery);

    echo json_encode($result);
}

function getOutputSpecById($id) {
    $dbQuery = sprintf("SELECT * 
                        FROM output
                        WHERE output.id = '$id'
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


?>
