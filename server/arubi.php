<?php
include 'db_helper.php';
header("Content-type: application/json");

$device = $_GET["device"];
$feature = $_GET["feature"];
$spec = $_GET["spec"];

$ourFileName = "testFile.txt";
//192.168.2.9 lights
//lightOn
//lightOff
//192.168.1.177 projector
//powerOn
//powerOff
//sourceSearch
//buttonUp
//buttonDown
//buttonEnter 
//sourceVideo
//192.168.1.17 screen
//screenUp
//screenDown
$inPresentationMode = 0;

function getIdFromString($type, $str) {
	switch($type)
	{
		case "device":
			$tempStr = ucfirst($str);
			$dbQuery = sprintf("SELECT id FROM device WHERE name ='$tempStr'");
			$result = getDBResultRecord($dbQuery);
			return $result['id'];
		break;
		case "feature":
			$dbQuery = sprintf("SELECT id FROM feature WHERE type = '$str'");
			$result = getDBResultRecord($dbQuery);
			return $result['id'];
			
		break;
		case "spec":
		//ASSUMPTION spec is input type
			$dbQuery = sprintf("SELECT id FROM input WHERE value = '$str'");
			$result = getDBResultRecord($dbQuery);
			return $result['id'];
			
		break;
	}
}

$deviceId = getIdFromString("device", $device);
$featureId = getIdFromString("feature", $feature);


//ASSUMPTION a spec cannot occur in multiple rules
function getRuleIdFromSpecId($specId)
{
	
	$dbQuery = sprintf("SELECT id FROM rule WHERE input_id = $specId");
	$result = getDBResultRecord($dbQuery);
	echo json_encode($result);
}
function getOutputIpAddress($outputId) {
	$dbQuery= sprintf("SELECT d.ipaddress FROM output as o 
        JOIN `feature`AS f
        JOIN `device` AS d
        WHERE o.id = $outputId AND f.id = o.feature_id AND f.device_id = d.id");
	$result = getDBResultRecord($dbQuery);
	
	return $result['ipaddress'];
}

function executeRule($spec) { //$spec is not id
	$inputId = getIdFromString("spec", $spec);
	//Getting output id from input id
	$dbQuery = sprintf("SELECT id, output_id FROM rule WHERE input_id=$inputId");
	$result = getDBResultRecord($dbQuery);
	
	$ipaddress = getOutputIpAddress($result['output_id']);
	//Activation of output
	file_get_contents("http://$ipaddress/?command=$spec");
	
	logMsg("rule",$result['id'], "execute", "executed the rule");
}


	// $ourFileHandle = fopen($ourFileName, 'w') or die("can't open file");
	// fwrite($ourFileHandle, $arg);
	// fclose($ourFileHandle);
	// if($arg == "Presentation_Mode") {
		// $inPresentationMode = 1;
		// file_get_contents("http://192.168.1.17/?command=screenDown");
		// file_get_contents("http://192.168.1.177/?command=powerOn");
		// sleep (2);
		// file_get_contents("http://192.168.1.177/?command=sourceComp");
	// } else if($arg == "Blackboard_Mode") {
		// $inPresentationMode = 0;
		// file_get_contents("http://192.168.1.17/?command=screenUp");
		// file_get_contents("http://192.168.1.177/?command=powerOff");
		// file_get_contents("http://192.168.1.177/?command=powerOff");
	// } 
	// echo $arg;

//echo "Got it!!";
executeRule($spec);
?>