<?php
header('Access-Control-Allow-Origin: *');
// replace the path below with the path to your public folder. Note this links to captions.js so you must include /captions.js?raw=1 at the end of the url. The raw=1 part tells dropbox to deliver the actual file contents.
$homepage = file_get_contents('https://www.dropbox.com/path-to-public-folder/captions.js?raw=1');

// if you want to point to multiple folders you can pass a folder variable to the url
$folderName = $_GET['folder'];
if ($folderName==="folder-variable-name-here") {
	$homepage = file_get_contents('https://www.dropbox.com/a-different-public-folder/captions.js?raw=1');
}

echo urlencode($homepage);
 ?>