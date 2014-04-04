angular.module('whereisdaniel-app').factory('Spots', function($http) {
  return {

    url: function(url) {
      return 'localhost:3001/' + url;
    },

    addSpot: function(spot, callback) {
      $http.post(this.url('spots'), spot).success(callback);
    },

    getAllSpots: function() {
      return [];
    }

  };
});