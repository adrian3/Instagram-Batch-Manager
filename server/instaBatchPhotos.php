<?php
header('Access-Control-Allow-Origin: *');
// replace the path below with the path to your public folder
$folder = 'https://www.dropbox.com/path-to-public-folder';

// if you want to point to multiple folders you can pass a folder variable to the url
$folderName = $_GET['folder'];
if ($folderName==="folder-variable-name-here") {
  $folder = 'https://www.dropbox.com/a-different-public-folder';
}

$ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $folder);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.9.2.3) Gecko/20100401 Firefox/3.6.3 (FM Scene 4.6.1)');
    curl_setopt($ch, CURLOPT_REFERER, 'https://www.dropbox.com/');
    curl_setopt($ch, CURLOPT_ENCODING, 'gzip,deflate');
    curl_setopt($ch, CURLOPT_AUTOREFERER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
    $html =curl_exec ($ch);

// extract links with DOMDocument
$dom = new DOMDocument();
@$dom->loadHTML($html);
$links = $dom->getElementsByTagName('a');
$processed_links = array();
foreach ($links as $link)
{
    if ($link->hasAttribute('class')&& $link->hasAttribute('href'))
    {
      foreach ($link->attributes as $a)
    {
        if ($a->value=='filename-link')   
     {
        $processed_links[$link->getAttribute('href')] = $link->getAttribute('href');
     }
    }
    }
}

$exts = $processed_links;
$workoutNumber=count($exts);
$listData = array(); // This is the array that will get populated in the loop below

foreach ($exts as $ext)
{
    $url = $ext;
    $path = parse_url($url, PHP_URL_PATH);
    $ext = pathinfo($path, PATHINFO_EXTENSION);
   
    if ($ext == 'jpg'||$ext == 'png')
    {
      $FileName=(explode("/",$path)); 
      $FileName=$FileName[4];
      // $arr = array('link' => $path, 'file' => $FileName);
      $arr = array('file' => $FileName,'path' => $path);
      $listData[] = $arr;
    }
    $workoutNumber--;
}
echo json_encode($listData);

 ?>