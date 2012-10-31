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

$result = array('error' => true);
$message = '';

// this is only for demostration purposes
if ($_GET['image']) {
    $image = $_GET['image'];
    $message = '<h2>' . $image . '</h2>' ;
    foreach ($versions as $version) {
        if (file_exists(IMAGE_PATH . $image . $version)) {
            $res = unlink(IMAGE_PATH . $image . $version);
            if ($res && $verion !== '_full.jpg') {
                $message.= '<p>'.$version.' image deleted</p>';
            } elseif ($res)  {
                $result['error'] = false;
                $message.= '<p>full image deleted</p>';
            }
        } else {
                $message.= '<p>image not deleted</p>';
        }
    }
}
$result['message'] = $message;
header('Content-type: application/json');
echo json_encode($result);