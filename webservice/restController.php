<?php
require_once("RestWebservice.php");

$view = "";
if(isset($_GET["view"]))
	$view = $_GET["view"];
/*
controls the RESTful services
URL mapping
*/
switch($view){

	case "website":
		// to handle REST Url webservice/website/
	$webservice = new RestWebservice();
	$webservice->getData(1);
	break;

	case "db":
		// to handle REST Url webservice/db/
	$webservice = new RestWebservice();
	$webservice->getData(2);
	break;

	case "" :
		//404 - not found;
	break;
}
?>