<?php


/*            
    {
        "name": "HiRes.jpg",
        "size": 1525252,
        "url": "https://vocalem.s3.amazonaws.com/uploads/asset/asset/3/HiRes.jpg",
        "delete_url": "/assets/3",
        "delete_type": "DELETE"
    }
    */

    
define("IMAGE_PATH", dirname(__FILE__) . "/images/");
$versions = array('full' => '_full.jpg', 'large' => '_large.jpg', 'thumb' => '_thumb.jpg');
$delete = 'delete';
define("IMAGE_URL_STEM", 'http://' . $_SERVER['HTTP_HOST'] . str_replace(basename($_SERVER['PHP_SELF']), '', $_SERVER['PHP_SELF']));
$thumbnails = array("thumb" => array("size" => 200), "large" => array("size" => 800));

$files = array();

$dir = opendir(IMAGE_PATH);
while ($file = readdir($dir)) {
    if ($file == '.' || $file == '..') {
        continue;
    }
    $delete_url = IMAGE_URL_STEM . 'delete.php?image=';
    $url = IMAGE_URL_STEM;

    if ($file !== $versions['full'] && (strpos($file, $versions['large']) === false) && (strpos($file, $versions['thumb']) === false)) {
        $file = str_replace($versions['full'], '', $file);
        $name = $file;
        $size = filesize(IMAGE_PATH . $file . $versions['full']);
        $url.= $file . $versions['full'];
        $delete_url.= $file;
        $files[] = compact('name', 'size', 'url', 'delete', 'delete_url');
    }
}

header('Content-type: application/json');
echo json_encode($files);