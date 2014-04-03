angular.module('whereisdaniel-app').factory('Spots', function($http) {
  return {
    getProperty: function() {
      return "I am a property!";
    }
  };
});