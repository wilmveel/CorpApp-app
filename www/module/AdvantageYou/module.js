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

advantageyouModule.controller('AdvantageYouController', function($scope, $http, $filter, config) {

	$scope.list = [];
});