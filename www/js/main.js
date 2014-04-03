var app = angular.module('whereisdaniel-app', ['ngRoute', 'ui.bootstrap']);

app.config(function($routeProvider) {
    
    $routeProvider.when('/', {
      controller: 'AppCtrl',
      templateUrl: 'views/example.html'
    });

  }
);