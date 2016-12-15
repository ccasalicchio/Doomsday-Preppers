<?php
class WebService{

	public function getWebsite(){
		$root = $_SERVER['DOCUMENT_ROOT'];
		$website_json = json_decode(file_get_contents($root.'/v2/assets/data/website.json'), true);
		return $website_json;
	}
	public function getDB(){
		$root = $_SERVER['DOCUMENT_ROOT'];
		$db_json = json_decode(file_get_contents($root.'/v2/assets/data/db.json'), true);
		return $db_json;
	}
}
?>