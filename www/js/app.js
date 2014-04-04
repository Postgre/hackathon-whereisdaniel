window.onerror = function(error, url, line, column, typeError) {
    alert(error);
};
var app = angular.module('whereisdaniel-app', ['ngRoute', 'ui.bootstrap']);

app.config(function($routeProvider) {

  $routeProvider.when('/', {
    controller: 'AppCtrl',
    templateUrl: 'views/base.html'
  }).when('/ask', {
    controller: 'AskCtrl',
    templateUrl: 'views/ask.html'
  }).when('/send', {
    controller: 'SendCtrl',
    templateUrl: 'views/send.html'
  }).when('/wifiInfo', {
    controller: 'WifiInfoCtrl',
    templateUrl: 'views/wifiInfo.html'
  });
});
