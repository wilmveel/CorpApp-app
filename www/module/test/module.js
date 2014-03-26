var contactModule = angular.module('corpApp.test', ['ngRoute']);

//routing
contactModule.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/module/test', {
			templateUrl: 'module/test/list.html',
			controller: 'TestController'
		}).when('/module/test/piet', {
			templateUrl: 'module/test/piet.html',
			controller: 'PietController'
		});
	}
]);

contactModule.controller('TestController', function($scope, $http) {

	$scope.output = "Wereld";
	
	$scope.update = function(){
		$scope.output = $scope.value
	}
	
	$http.get("http://turfje.nl/corpapp/serviceLinkedin").success(function(piet){
		$scope.output = piet[0].corpkey;
	});
 
});

contactModule.controller('PietController', function($scope, $http, $timeout, $q) {

	$scope.jan = "Hallo jan";
	
	$scope.klik = function(){
		$scope.jan = "Hallo Klaas"
	}


	$http.get("http://turfje.nl/corpapp/serviceLinkedin").then(function(data){
		$scope.joop = data;
	});

	$timeout(function(){
		$scope.joop1 = "Tets1";
	}, 3000);

	$timeout(function(){
		$scope.joop2 = "Test2";
	}, 2000);
 	

 	var deferred = $q.defer();

 	$timeout(function(){
		
		deferred.resolve('Hello');
	}, 5000);

	deferred.promise.then(function(data){
		$scope.joop3 = data;
	});

});