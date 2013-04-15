<?php
include 'db_helper.php';

header("Content-type: application/json");
switch($_GET["f"])
{
	case "setRule": 
		setRule($_GET["inputId"], $_GET["outputId"], $_GET["programmer"], $_GET["user"], $_GET["loc_id"]);
		break;
	case "setRuleStatus":
		setRuleStatus($_GET["ruleId"], $_GET["status"]);
		break;
	case "getRules":
		getRules();
		break;
	case "getRule":
		getRule($_GET["ruleId"]);
		break;
	default:
		break;
}

function setRule($in, $out, $programmer, $user, $loc)
{
	$dbQuery = sprintf("INSERT INTO rule
						(input_id, output_id, programmer, user, loc_id, enabled)
						VALUES ($in, $out, $programmer, $user, $loc, 1)");
	$result = getDBResultInserted($dbQuery, 'ruleId');
	
	echo json_encode($result);
}

function setRuleStatus($rId, $status)
{
	$dbQuery = sprintf("UPDATE rule SET enabled = $status WHERE id = $rId");
	$result = getDBResultAffected($dbQuery);
	echo json_encode($result);
}

function getRules()
{
	$dbQuery = sprintf("SELECT * FROM rule");
    $result = getDBResultRecord($dbQuery);

    echo json_encode($result);
}

function getRule($rId) 
{
	$dbInputQuery = sprintf("SELECT r.*, i.icon_url AS spec_icon_url, i.description AS spec_description, inf.title AS feature_title, inf.description AS feature_description, inf.icon_url AS feature_icon_url, ind.name AS device_name, ind.icon_url AS device_icon_url FROM `rule` AS r 
	JOIN `input` AS i 
        JOIN `feature`AS inf
        JOIN `device` AS ind
        WHERE r.input_id = i.id AND i.feature_id = inf.id AND inf.device_id = ind.id");
	$dbOutputQuery = sprintf("SELECT r.*, i.icon_url AS spec_icon_url, i.description AS spec_description, inf.title AS feature_title, inf.description AS feature_description, inf.icon_url AS feature_icon_url, ind.name AS device_name, ind.icon_url AS device_icon_url FROM `rule` AS r 
	JOIN `output` AS i 
        JOIN `feature`AS inf
        JOIN `device` AS ind
        WHERE r.input_id = i.id AND i.feature_id = inf.id AND inf.device_id = ind.id");
    $resultI = getDBResultRecord($dbInputQuery);
		$resultO = getDBResultRecord($dbInputQuery);

    echo json_encode($resultI)+'\n'+json_encode($resultO);
}
?>
