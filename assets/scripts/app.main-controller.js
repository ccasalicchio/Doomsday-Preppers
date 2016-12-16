/**
* @author Carlos Casalicchio
* @ngdoc  controller
* @name   DoomsdayController
* @description
* Handles all angular functions for the app
**/
app.angular
.controller('doomsdayController', [
	'$scope',
	'$http',
	'$sce',
	'DataService',
	function ($scope, $http, $sce, DataService) {
		"use strict";

		var model = {
			loadWebsite : null,
			loadDatabase : null,
			website : null,
			db : null,
			encode : null,
			replaceSpace : null,
			order : 'name',
			filter: {"0":true,"1":true,"2":true},
			language:'pt-br'
		};

		var userLang = navigator.language || navigator.userLanguage;

		if(userLang === 'pt-BR' || userLang === 'en-US'){
			model.language = userLang.toLowerCase();
		};

		model.loadWebsite = function (){
			var promise = DataService.getWebsite();
			promise.then(function(got){
				model.website = angular.fromJson(got.data);
				model.website.text[model.language].intro = $sce.trustAsHtml(model.website.text[model.language].intro);
				model.website.text[model.language].captcha = $sce.trustAsHtml(model.website.text[model.language].captcha);
				model.updateMetatags(model.language);
				/**Tooltips**/
				app.updateTooltips();
			}, function (err) {
				var errormsg = "Fatal Error";
				$scope.status = errormsg;
				model.errorMessage = errormsg + ": " + err.data.exceptionMessage;
			});

		};

		model.loadDatabase = function(){
			var promise = DataService.getDB();
			promise.then(function(got){
				model.db = angular.fromJson(got.data);
				app.$(model.db.sections).each(function(index,list){
					app.$(list.list).each(function(otherindex,item){
						item.price = parseFloat(item.price);
					});
				});
				/**Tooltips**/
				app.updateTooltips();
			}, function (err) {
				var errormsg = "Fatal Error";
				$scope.status = errormsg;
				model.errorMessage = errormsg + ": " + err.data.exceptionMessage;
			});
		};

		model.updataLanguage = function(lang){
			model.language = lang;
			model.website.text[model.language].intro = $sce.trustAsHtml(model.website.text[model.language].intro);
			model.updateMetatags(model.language);

			/**Remove search highlights**/
			app.$("body").removeHighlight();
			
			/**Tooltips**/
			app.updateTooltips();
		};

		model.updateMetatags = function(lang){
			var metas = [
			model.website.text[lang]["meta-keywords"],
			model.website.text[lang]["meta-description"],
			model.website.text[lang]["title"],
			model.website.settings.author,
			model.website.settings.type,
			model.website.settings.url,
			model.website.settings.updated
			];
			var url = model.website.settings.url;

			app.$('html').attr('lang',lang);
			app.$('meta[property="og:locale"]').attr('content',lang);
			app.$('meta[name=keywords]').attr('content',metas[0]);
			app.$('meta[name=description],meta[property="og:description"],meta[name="twitter:description"]').attr('content', metas[1]);
			app.$('title').html(metas[2]);
			app.$('meta[property="og:title"],meta[name="twitter:title"],meta[property="og:site_name"]').attr('content',metas[2]);
			app.$('meta[name=author],meta[property="article:author"]').attr('content',metas[3]);
			app.$('meta[property="og:type"]').attr('content',metas[4]);
			app.$('meta[property="og:url"],meta[name="twitter:url"]').attr('content',metas[5]);
			app.$('meta[property="article:published_time"]').attr('content',metas[6]);
			app.$('meta[name="twitter:image"]').attr('content',url+model.website.settings["share-images"][0]);

			app.$(model.website.settings["share-images"]).each(function(index,img){

				app.$('head').append('<meta property="og:image" content="'+url+img+'" />');
			});

			app.$('.year').html(new Date().getFullYear());
		};

		model.encode = app.encode;
		model.replaceSpace = app.replaceSpace;
		
		model.loadDatabase();
		model.loadWebsite();

		$scope.model = model;

	}]);