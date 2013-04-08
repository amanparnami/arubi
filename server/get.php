<?php
$ourFileName = "testFile.txt";
$ourFileHandle = fopen($ourFileName, 'r') or die("can't open file");
// fread($ourFileHandle, $arg);
// echo "done";
$contents = fread($ourFileHandle, filesize($ourFileName));
fclose($ourFileHandle);
echo $contents;
?>
