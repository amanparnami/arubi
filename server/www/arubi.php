<?php
$sender = $_GET["sender"];
$arg = $_GET["arg"];

$ourFileName = "testFile.txt";

if($sender == "kinect")
{
	$ourFileHandle = fopen($ourFileName, 'w') or die("can't open file");
	fwrite($ourFileHandle, $arg);
	fclose($ourFileHandle);
	echo file_get_contents("http://192.168.1.4");
	echo $arg;
}
else if($sender == "arduino")
{
	$ourFileHandle = fopen($ourFileName, 'r') or die("can't open file");
	$contents = fread($ourFileHandle, filesize($ourFileName));
	echo $contents;
}
//echo "Got it!!";
?>