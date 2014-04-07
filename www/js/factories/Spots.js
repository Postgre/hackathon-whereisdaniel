app.factory('Spots', function($http, WebSocketClient) {

  return {

    addSpot: function(spot, callback) {
      WebSocketClient.post('/spots', spot, callback);
    },

    getSpots: function(username, callback) {
      WebSocketClient.get('/spots', callback);
    }

  };
});