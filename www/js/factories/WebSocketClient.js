app.factory('WebSocketClient', function($http) {

  var WebSocket = window.WebSocket || window.MozWebSocket;

  var connection = new WebSocket('ws://localhost:3001');

  connection.onopen = function() {
    console.log('connection opened');
  };

  connection.onerror = function(error) {
    console.log(error);
  };

  connection.onmessage = function(message) {
    try {
      console.log('reponse', message);
      var data = JSON.parse(message.data);
      callbacks[data.id](data.reponse);
      delete callbacks[data.id];
    } catch (e) {
      console.log('This doesn\'t look like a valid JSON: ', message.data);
    }
  };

  var callbackId = 0;

  var callbacks = {};

  return {

    _registerCallback: function(callback) {
      callbackId = callbackId + 1;
      callbacks[callbackId] = callback;
      return callbackId;
    },

    get: function(path, callback) {
      this._send(path, 'get', {}, callback);
    },

    post: function(path, data, callback) {
      this._send(path, 'post', data, callback);
    },

    _send: function(path, method, data, callback) {
      connection.send(JSON.stringify({
        id: this._registerCallback(callback),
        path: path,
        method: method,
        data: data
      }));
    }
  };
});