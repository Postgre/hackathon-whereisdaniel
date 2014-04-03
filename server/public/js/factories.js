/* Factories */

angular.module('myApp.factories', []).
factory('Spots', ['$http',

  function($http) {
    'use strict';

    return {

      get: function(username) {
        return {
          username: 'MakaPaka'
        }
      }

    };
  }
]);