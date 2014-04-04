app.factory('Spots', function($http) {

  var WebSocket = window.WebSocket || window.MozWebSocket;

  var connection = new WebSocket('ws://localhost:3001');

  connection.onopen = function() {
    // connection is opened and ready to use
  };

  connection.onerror = function(error) {
    // an error occurred when sending/receiving data
  };

  connection.onmessage = function(message) {
    try {
      console.log(message);
      var json = JSON.parse(message.data);
    } catch (e) {
      console.log('This doesn\'t look like a valid JSON: ', message.data);
    }
  };

  return {

    addSpot: function(spot) {
      connection.send(JSON.stringify({
        path: '/spots',
        method: 'post',
        data: spot
      }));
    },

    getSpots: function(username) {
      return connection.send(JSON.stringify({
        path: '/spots',
        method: 'get'
      }));
    }

  };
});