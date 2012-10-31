<?php 
ini_set("memory_limit", "100M");
date_default_timezone_set("America/Los_Angeles");

$thumbnails = array("thumb" => array("size" => 200), "large" => array("size" => 800));
define("PRODUCTION", preg_match('/alexkoppel\.com/', $_SERVER['SERVER_NAME']));
define("IMAGE_URL_STEM", (PRODUCTION ? "http://images.alexkoppel.com/" : "http://10.0.1.7/~ahkoppel2/uploader/images/"));
define("IMAGE_PATH", dirname(__FILE__) . "/images/");

// max size: 4 MB
define("MAX_FILESIZE", 5000);

function getExtension($str) {
    $i = strrpos($str,".");
    if (!$i) { return ""; } 
    $l = strlen($str) - $i;
    $ext = substr($str, $i+1, $l);
    return $ext;
}

function resizeImage($image, $maxDimension, $destinationFilename, $path, $originalWidth, $originalHeight) {
    $isHorizontal = $originalHeight < $originalWidth;

    if ($isHorizontal) {
        $newHeight = ($originalHeight / $originalWidth) * $maxDimension;
        $newWidth = $maxDimension;
    }
    else {
        $newWidth = ($originalWidth / $originalHeight) * $maxDimension;
        $newHeight = $maxDimension;
    }

    $tmp = imagecreatetruecolor($newWidth, $newHeight);

    imagecopyresampled($tmp, $image, 0, 0, 0, 0, $newWidth, $newHeight, $originalWidth, $originalHeight);

    $newImageLocation = $path . $destinationFilename;

    $g = imagejpeg($tmp, $newImageLocation, 100);

    imagedestroy($tmp);
    return array("width" => (int)$newWidth, "height" => (int)$newHeight);
}

$results = array();
$error = null;
$resultsSent = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $image_name = $_FILES["Filedata"]["name"];
    $tmp_file = $_FILES["Filedata"]["tmp_name"];

    // need to handle files too large!
    error_log("Request to handle " . $image_name);
    error_log("Files: " . print_r($_FILES, true));

    if ($image_name) {
        $filename = stripslashes($image_name);
        $extension = strtolower(getExtension($filename));

        if (($extension != "jpg") && ($extension != "jpeg") && ($extension != "png") && ($extension != "gif")) {
            $error = 'Unknown image extension ' . $extension;
        }
        else {
            $size = filesize($tmp_file);
            if ($size > MAX_FILESIZE * 1024) {
                $error = "Size limit of " . MAX_FILESIZE . "KB exceeded.";
            }
            else {
                if ($extension == "jpg" || $extension == "jpeg" ) {
                    $src = imagecreatefromjpeg($tmp_file);
                }
                else if ($extension == "png") {
                    $src = imagecreatefrompng($tmp_file);
                }
                else {
                    $src = imagecreatefromgif($tmp_file);
                }

                // set up a random, unique filename
                list($originalWidth, $originalHeight) = getimagesize($tmp_file);
                $result_filename_stem = date("YmdHi_" . rand());

                foreach ($thumbnails as $image_type => $details) {
                    $newFilename = $result_filename_stem . "_" . $image_type . ".jpg";
                    $imageResult = array("url" => IMAGE_URL_STEM . $newFilename);
                    $imageResult = array_merge($imageResult, resizeImage($src, $details["size"], $newFilename, IMAGE_PATH, $originalWidth, $originalHeight));
                    $results[$image_type] = $imageResult;
                }

                $full_filename = $result_filename_stem . "_full.jpg";
                copy($tmp_file, IMAGE_PATH . $full_filename);
                $results["full"] = array(
                    "url" => IMAGE_URL_STEM . $full_filename, 
                    "size" => $size, 
                    "width" => $originalWidth, 
                    "height" => $originalHeight
                    );

                // get rid of the original temp file
                imagedestroy($src);
            }
        }

        if ($error) {
            echo json_encode(array("error" => $error));
        }
        else {
            $results["error"] = false;
            echo json_encode($results);
        }

    }
}
?>