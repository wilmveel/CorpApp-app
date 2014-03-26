var escapeModule = angular.module('corpApp.escape', ['ngRoute']);

//routing
escapeModule.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/module/escape', {
			templateUrl: 'module/escape/views/index.html',
			controller: 'IndexController'
		}).
		when('/module/escape/event', {
			templateUrl: 'module/escape/views/event.html',
			controller: 'EventController'
		})
	}
]);

escapeModule.controller('IndexController', function($scope, $http, $log, $location, EventService) {	
	$http.get('/stubs/escape.json').success( function(data){
		$log.debug("data escape", data);
		$scope.events = data;
	});

	$scope.test = function() {
		$log.debug("Test2");
	}
	
	$scope.goEvent = function(eventnummer){ 
		EventService.eventnummer = eventnummer;
		$location.path('/module/escape/event');
	}
});

escapeModule.controller('EventController', function($scope, $http, $log, EventService) {
	var event = EventService.eventnummer;
	$log.debug("loading event with number: ", event);
	//Code for stubbing, a rest service should be called eventually (with the eventnumber as a parameter).
	var stub;
	if (event == 1)
	{
		stub = '/stubs/event1.json';
	}
	else
	{
		stub = '/stubs/event2.json';
	}
	$http.get(stub).success( function(data){
		$log.debug("data event", data);
		$scope.event = data;
	});
});

escapeModule.service('EventService', function() {
	this.eventnummer;
});