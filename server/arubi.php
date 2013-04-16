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
$inputId = getIdFromString("spec", $spec);

//ASSUMPTION a spec cannot occur in multiple rules
function getRuleIdFromSpecId($specId)
{
	
	$dbQuery = sprintf("SELECT id FROM rule WHERE input_id = $specId");
	$result = getDBResultRecord($dbQuery);
	echo json_encode($result);
}

if($device == "kinect")
{
	switch($feature)
	{
		case "speech":
			switch($spec)
			{
				case "lights_on":
				break;
				case "lights_off":
				break;
				case "screen_up":
				break;
				case "screen_down":
				break;
				case "lights_dim":
				break;
				case "lights_bright":
				break;
			}
		break;
		case "gesture":
			switch($spec)
			{
				case "swipe_left":
				break;
				case "swipe_right":
				break;
				case "wave_left":
				break;
				case "wave_right":
				break;
				case "zoom_in":
				break;
				case "zoom_out":
				break;
			}
		break;
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
}
else if($sender == "arduino")
{
	if($inPresentationMode) {
		echo "lightOff";
	} else {
		echo "lightsOn";
	}
	
	// $ourFileHandle = fopen($ourFileName, 'r') or die("can't open file");
	// $contents = fread($ourFileHandle, filesize($ourFileName));
	// echo $contents;
}
//echo "Got it!!";
getRuleIdFromSpecId($inputId);
?>