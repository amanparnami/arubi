<?php
$arg = $_GET["arg"];
$ourFileName = "testFile.txt";
$ourFileHandle = fopen($ourFileName, 'w') or die("can't open file");
// fread($ourFileHandle, $arg);
// echo "done";
$contents = fwrite($ourFileHandle, $arg);
fclose($ourFileHandle);
// echo $contents;
?>
