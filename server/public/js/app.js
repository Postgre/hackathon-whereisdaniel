angular.module('myApp', ['myApp.factories', 'ngRoute']).
config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'partials/index',
      controller: IndexCtrl
    }).
    otherwise({
      redirectTo: '/'
    });
  }
]);