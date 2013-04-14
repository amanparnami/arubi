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
	$dbQuery = sprintf("SELECT rule FROM rule WHERE id=$rId");
    $result = getDBResultRecord($dbQuery);

    echo json_encode($result);
}
?>
