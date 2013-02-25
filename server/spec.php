<?php
include 'db_helper.php';

header("Content-type: application/json");

switch ($_GET["f"]) {
    case "getInputSpecById":getInputSpecById($_GET["id"]);break;
    case "getOutputSpecById":getOutputSpecById($_GET["id"]);break;
    case "getInputSpecsByFeatureId":getInputSpecsByFeatureId($_GET["featureId"]);break;
    case "getOutputSpecsByFeatureId":getOutputSpecsByFeatureId($_GET["featureId"]);break;
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


function getInputSpecsByFeatureId($featureId) {
    $dbQuery = sprintf("SELECT * 
                        FROM input
                        WHERE feature_id = '$featureId'
                        LIMIT 0 , 100
                        ");
    //echo $dbQuery;
    
    $result = getDBResultsArray($dbQuery);
    
    //$result = getDBResultRecord($dbQuery);


    echo json_encode($result);
}

function getOutputSpecsByFeatureId($featureId) {
    $dbQuery = sprintf("SELECT * 
                        FROM output
                        WHERE feature_id = '$featureId'
                        LIMIT 0 , 100   
                        ");
    //echo $dbQuery;
    
    $result = getDBResultsArray($dbQuery);
    
    //$result = getDBResultRecord($dbQuery);


    echo json_encode($result);
}


?>
