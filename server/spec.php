<?php
include 'db_helper.php';

header("Content-type: application/json");

switch ($_GET["f"]) {
    case "getInputSpecById":getInputSpecById($_GET["id"]);break;
    case "getOutputSpecById":getOutputSpecById($_GET["id"]);break;
    case "getInputSpecListByFeatureId":getInputSpecListByFeatureId($_GET["feature_id"]);break;
    case "getOutputSpecListByFeatureId":getOutputSpecListByFeatureId($_GET["feature_id"]);break;

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


function getInputSpecListByFeatureId($featureId) {
    $dbQuery = sprintf("SELECT * 
                        FROM input
                        INNER JOIN feature ON input.feature_id = feature.id
                        AND feature.id = '$featureId'
                        LIMIT 0 , 100
                        ");
    //echo $dbQuery;
    
    $result = getDBResultsArray($dbQuery);
    
    //$result = getDBResultRecord($dbQuery);


    echo json_encode($result);
}

function getOutputSpecListByFeatureId($featureId) {
    $dbQuery = sprintf("SELECT * 
                        FROM output
                        INNER JOIN feature ON output.feature_id = feature.id
                        AND feature.id = '$featureId'
                        LIMIT 0 , 100   
                        ");
    //echo $dbQuery;
    
    $result = getDBResultsArray($dbQuery);
    
    //$result = getDBResultRecord($dbQuery);


    echo json_encode($result);
}


?>
