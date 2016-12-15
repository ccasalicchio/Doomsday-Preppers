app.angular.service('DataService', function ($http) {
	'use strict';

	this.getWebsite = function(){
		return $http({
			method: "post",
			url: "webservice/restController.php?view=website",
			headers: { 'Content-Type': 'application/json;charset=utf-8' }});
	};

	this.getDB = function(){
		return $http({
			method: "post",
			url: "webservice/restController.php?view=db",
			headers: { 'Content-Type': 'application/json;charset=utf-8' }});
	};

	this.getData = function (type) {
		var request = $http({
			method: "post",
			url: "webservice/restController.php?view="+type,
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
		}).then(function succesCallback(response) {

		},
		function errorCallback(response) {
		});
		return request;
	};
});