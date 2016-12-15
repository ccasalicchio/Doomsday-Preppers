<?php
require_once("SimpleRest.php");
require_once("webservice.php");

class RestWebservice extends SimpleRest {

	public function getData($option) {	

		$webservice = new WebService();
		$rawData = null;

		switch($option){
			case 1: 
			$rawData = $webservice->getWebsite();
			break;
			case 2:
			$rawData = $webservice->getDB();
			break;
		}

		if(empty($rawData)) {
			$statusCode = 404;
			$rawData = array('error' => 'Nothing found!');		
		} else {
			$statusCode = 200;
		}

		$requestContentType = $_SERVER['HTTP_ACCEPT'];
		$this ->setHttpHeaders($requestContentType, $statusCode);

		if(strpos($requestContentType,'application/json') !== false){
			$response = $this->encodeJson($rawData);
			echo $response;
		} else if(strpos($requestContentType,'text/html') !== false){
			$response = $this->encodeHtml($rawData);
			echo $response;
		} else if(strpos($requestContentType,'application/xml') !== false){
			$response = $this->encodeXml($rawData);
			echo $response;
		}
		else{
			//Default Json
			$response = $this->encodeJson($rawData);
			echo $response;
		}
	}
	public function getWebsite(){
		$this->getData(1);
	}
	public function getDB() {	
		$this->getData(2);
	}

	public function encodeHtml($responseData) {

		$htmlResponse = "<table border='1'>";
		foreach($responseData as $key=>$value) {
			$htmlResponse .= "<tr><td>". $key. "</td><td>". $value. "</td></tr>";
		}
		$htmlResponse .= "</table>";
		return $htmlResponse;		
	}
	
	public function encodeJson($responseData) {
		$jsonResponse = json_encode($responseData);
		return $jsonResponse;		
	}
	
	public function encodeXml($responseData) {
		// creating object of SimpleXMLElement
		$xml = new SimpleXMLElement('<?xml version="1.0"?><mobile></mobile>');
		foreach($responseData as $key=>$value) {
			$xml->addChild($key, $value);
		}
		return $xml->asXML();
	}
}
?>