var linkedinModule = angular.module('corpApp.linkedin', ['ngRoute']);

//routing
linkedinModule.config(function($routeProvider) {
		$routeProvider.
		when('/module/linkedin', {
			templateUrl: 'module/linkedin/partials/index.html',
			controller: 'IndexLinkedinController'
		});
	}
);


linkedinModule.controller('IndexLinkedinController', function($scope, $log, $http, $location, config) {

	$log.debug("IndexController.......................................................");

	$http.get(config.API_URL + '/rest/linkedin/me').
	success(function(data, status, headers, config) {
		$scope.item = data;
	}).
	error(function(data, status, headers, config) {
		$location.path("/");
	});

	var clientId = "7714w3q3mqlrro";
	var redirectUrl = config.API_URL + "/rest/linkedin/connect";
	var state = "123456789";

	// Open popup to connect to linkedin
	$scope.connect = function() {


		$log.debug("Call linkedin");

		var url = "https://www.linkedin.com/uas/oauth2/authorization?response_type=code";
		url += "&client_id=" + clientId;
		url += "&state=" + state;
		url += "&redirect_uri=" + redirectUrl;

		iabRef = window.open(url, '_blank', 'location=no');
		iabRef.addEventListener('loadstop', iabLoadStop);
		//iabRef.addEventListener('loadstart', iabLoadStart);
		//iabRef.addEventListener('loaderror', iabLoadError);
		//iabRef.addEventListener('exit', iabClose);
	}

	function iabLoadStop(event) {
		//alert(event.type + ' - ' + event.url);
		if (event.url.indexOf(redirectUrl) == 0) {
			iabRef.close();

			$http.get(config.API_URL + '/rest/linkedin/me').
			success(function(data, status, headers, config) {
				$scope.item = data;
			}).
			error(function(data, status, headers, config) {
				$location.path("/");
			});
		}
	}

	function iabLoadStart(event) {
		//alert(event.type + ' - ' + event.url);
	}

	function iabLoadError(event) {
		//alert(event.type + ' - ' + event.url);
	}

	function iabClose(event) {
		//alert(event.type + ' - ' + event.url);
	}


});