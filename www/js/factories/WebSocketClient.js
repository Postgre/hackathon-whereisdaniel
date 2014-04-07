app.factory('WebSocketClient', function($http) {

  var WebSocket = WebSocket || window.WebSocket || window.MozWebSocket;

  var connection = new WebSocket('ws://antivps.pl:3001');

  connection.onopen = function() {
    console.log('connection opened');
  };

  connection.onerror = function(error) {
    console.log(error);
  };

  connection.onmessage = function(message) {
    try {
      console.log('response', message.data);
      var data = JSON.parse(message.data);
      callbacks[data.id](data.response);
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

    get: function(path, parameters, callback) {
      this._send(path, 'get', {}, parameters, callback);
    },

    post: function(path, data, parameters, callback) {
      this._send(path, 'post', data, parameters, callback);
    },

    _send: function(path, method, data, parameters, callback) {
      if (typeof(parameters) == "function") {
        callback = parameters;
        parameters = {};
      }
      connection.send(JSON.stringify({
        id: this._registerCallback(callback),
        path: path,
        method: method,
        data: data,
        parameters: parameters
      }));
    }
  };
});