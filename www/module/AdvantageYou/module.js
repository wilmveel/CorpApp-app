var advantageyouModule = angular.module('corpApp.AdvantageYou', ['ngRoute']);

//routing
advantageyouModule.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/module/AdvantageYou', {
            templateUrl: 'module/AdvantageYou/overview.html',
            controller: 'AdvantageYouController'
        });
    }
]);

advantageyouModule.controller('AdvantageYouController', function($scope, $http, $log, $filter, config) {

    $scope.list = [];

    $http.get("/module/AdvantageYou/stub/AdvantageYou.json")
        .success(function(data) {
            $log.debug("AdvantageYou data", data);
            $scope.list = data;
        })

    
    
$scope.locations = [
	{name: 'Utrecht', selected: false}, 
	{name: 'Amsterdam', selected: false},
	{name: 'Heerlen', selected: false}
];

});

advantageyouModule.filter('locationFilter', function () {
	return function (trainingSessions, locations) {
		var selectedLocations = locations.filter(function (item) {
		    return item.selected;
		}).map(function (item) {
		    return item.name;
		});

		// var selectedLocations = [];

		// for (var i = 0; i < locations.length; i++) {
		// 	if (locations[i].selected) {
		// 		selectedLocations.push(locations[i].name);
		// 	}
		// };

		if (selectedLocations.length === 0) {
			// No locations selected, show all trainingSessions
			return trainingSessions;
		}

		return trainingSessions.filter(function (session) {
			return selectedLocations.indexOf(session.location) !== -1;
		});
	};
});
 