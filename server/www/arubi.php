<?php
$sender = $_GET["sender"];
$arg = $_GET["arg"];

$ourFileName = "testFile.txt";
//192.168.1.10 lights
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

if($sender == "kinect")
{
	// $ourFileHandle = fopen($ourFileName, 'w') or die("can't open file");
	// fwrite($ourFileHandle, $arg);
	// fclose($ourFileHandle);
	if($arg == "Presentation_Mode") {
		$inPresentationMode = 1;
		file_get_contents("http://192.168.1.17/?command=screenDown");
		file_get_contents("http://192.168.1.177/?command=powerOn");
		sleep (2);
		file_get_contents("http://192.168.1.177/?command=sourceComp");
	} else if($arg == "Blackboard_Mode") {
		$inPresentationMode = 0;
		file_get_contents("http://192.168.1.17/?command=screenUp");
		file_get_contents("http://192.168.1.177/?command=powerOff");
		file_get_contents("http://192.168.1.177/?command=powerOff");
	} 
	echo $arg;
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
?>