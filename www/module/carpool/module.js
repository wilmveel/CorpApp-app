var carpoolModule = angular.module('corpApp.carpool', ['ngRoute','ngAutocomplete','ui.bootstrap']);

//routing
carpoolModule.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/module/carpool', {
            templateUrl: 'module/carpool/advanced.html',
            controller: 'IndexCarpoolController'
        }).
        when('/module/carpool/newride', {
            templateUrl: 'module/carpool/newride.html',
            controller: 'IndexCarpoolController'
        })
    }
]);

//filters
carpoolModule.filter('carpoolFilter', function() {
  return function(input, location) {
    var out = [];
      for (var i = 0; i < input.length; i++){
          if(input[i].from.address == location.address){
              out.push(input[i]);
          }

          if(input[i].to.address == location.address){
              out.push(input[i]);
           }
      }      
    return out;
  };
});

carpoolModule.controller('IndexCarpoolController', function($scope, $http, $filter, config, $log) {

	$scope.list = [];


	$scope.searchRide = function(){
        //$http.get('/module/carpool/stubs/carpool.json').
        $http.get(config.API_URL + '/rest/carpool').
		success(function(data, status, headers, config) {
			$scope.list = data;
			$scope.list = $filter('carpoolFilter')($scope.list, {address : $scope.details.formatted_address});
		}).
		error(function(data, status, headers, config) {
			//$location.path("/");
		});
		
	};

	$scope.goToSubmitRide = function(){
        window.location.href = "#/module/carpool/newride";
        //alert("From: "+$scope.fromLocation+"<br />To:"+$scope.toLocation);
	};

	$scope.goSimple = function(){
		window.location.href = "#/module/carpool";
	};
	$scope.goAdvanced = function(){
		window.location.href = "#/module/carpool/advanced";
	};
    $scope.submitRide = function(){

        var data = {
            date : 123,
            from :{
                address: $scope.details.formatted_address,
                position: [
                    $scope.details.geometry.location[0],
                    $scope.details.geometry.location[1]
                ]
            },
            to : {
                address: $scope.details1.formatted_address,
                position: [
                    $scope.details1.geometry.location[0],
                    $scope.details1.geometry.location[1]
                ]
            }
        };

        $http.post(config.API_URL + '/rest/carpool', data).
            success(function(data, status, headers, config) {
            $log.debug("Success:",data);
            $scope.messages = 'Your ride has been submitted successfully!';
            $scope.details = '';
            $scope.details1 = '';
        }).
            error(function(data, status, headers, config) {
                $log.debug("Error:",data);
                $scope.messages = 'Oops, we received your request, but there was an error.';
                $log.error(data);
            });

    };
});