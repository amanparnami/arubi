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
	case "updateRule": 
		updateRule($_GET["ruleId"], $_GET["inputId"], $_GET["outputId"]);
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
	
	logMsg('rule', $result['ruleId'], 'insert', 'new rule created');
	
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
	$dbInputQuery = sprintf("SELECT r.*, i.icon_url AS input_spec_icon_url, i.description AS input_spec_description, inf.title AS input_feature_title, inf.description AS input_feature_description, inf.icon_url AS input_feature_icon_url, ind.name AS input_device_name, ind.icon_url AS input_device_icon_url FROM `rule` AS r 
	JOIN `input` AS i 
        JOIN `feature`AS inf
        JOIN `device` AS ind
        WHERE r.input_id = i.id AND i.feature_id = inf.id AND inf.device_id = ind.id");
	$dbOutputQuery = sprintf("SELECT r.*, o.icon_url AS output_spec_icon_url, o.description AS output_spec_description, inf.title AS output_feature_title, inf.description AS output_feature_description, inf.icon_url AS output_feature_icon_url, ind.name AS output_device_name, ind.icon_url AS output_device_icon_url FROM `rule` AS r 
	JOIN `output` AS o 
        JOIN `feature`AS inf
        JOIN `device` AS ind
        WHERE r.output_id = o.id AND o.feature_id = inf.id AND inf.device_id = ind.id");
    $resultI = getDBResultRecord($dbInputQuery);
	$resultO = getDBResultRecord($dbOutputQuery);

	$returnval = json_encode(array_merge($resultI,$resultO));
	logMsg("rule", $rId, "fetch", "fetching rule info");
	//$returnval = json_encode($resultO);
    echo $returnval;
}

function updateRule($rId, $in, $out) {
	$dbQuery = sprintf("UPDATE rule SET input_id = $in, output_id = $out WHERE id = $rId");
	$result = getDBResultAffected($dbQuery);
	echo json_encode($result);
}
?>
