var _ = require('underscore');
var Websocket = require('websocket').server;
var Strings = require('../utils/Strings');

var WebSocketConnection = function WebSocketConnection(server, request) {
  this.server = server;
  this.connection = request.accept(null, request.origin);

  this.connection.on('message', this.onMessage.bind(this));
  this.connection.on('close', this.onClose.bind(this));
};

WebSocketConnection.prototype = {

  connection: null,

  onMessage: function(message) {
    if (message.type === 'utf8') {
      this.server.log('data', message.utf8Data);
      var request = JSON.parse(message.utf8Data);
      this.server.log('json-data', request);
      this.callRoute(request.path, request.method, request.data || {}, request.parameters || {}, function(response) {
        this.server.log('response', response);
        this.connection.send(JSON.stringify({
          id: request.id,
          response: response
        }));
      }.bind(this));
    } else {
      this.server.log('error', 'unsupported data type ' + message.type);
    }
  },

  onClose: function(connection) {
    this.server.log('closing', 'connection');
  },

  findRoute: function(path, method) {
    return _.findWhere(this.server.routes[method.toLowerCase()], {
      path: path
    });
  },

  callRoute: function(path, method, data, parameters, callback) {
    var route = this.findRoute(path, method);
    var routeCallback = _.first(route.callbacks);
    var req = {
      body: data,
      params: parameters
    };
    var res = {
      send: function(response) {
        callback(response);
      }
    };
    routeCallback(req, res);
  },

  zipParmeters: function(path, values) {
    var parameters = Strings.matches(path, /:(\S+?)\/|:(\S+?)$/g);
    return values.reduce(function(result, value, index) {
      result[parameters[index]] = value;
      return result;
    }, {});
  }

};

var WebSocketServer = function WebSocketServerConstruct(app) {
  this.routes = app.routes;
};

WebSocketServer.prototype = {

  routes: null,

  start: function(httpServer) {
    var server = new Websocket({
      httpServer: httpServer
    });
    server.on('request', this.onRequest.bind(this));
  },

  onRequest: function(request) {
    this.log('opening', 'connection');
    new WebSocketConnection(this, request);
  },

  log: function(header, msg) {
    console.log(header.toUpperCase(), ' : ', _.isString(msg) ? msg : JSON.stringify(msg));
  }

};

module.exports = WebSocketServer;