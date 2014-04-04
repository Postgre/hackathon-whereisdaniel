var _ = require('underscore');
var Websocket = require('websocket').server;

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

  findRoute: function(path, method) {
    return _.findWhere(this.routes[method.toLowerCase()], {
      path: path
    });
  },

  callRoute: function(path, method, data, callback) {
    var route = this.findRoute(path, method);
    var routeCallback = _.first(route.callbacks);
    var req = {
      body: data
    };
    var res = {
      send: function(response) {
        callback(response);
      }
    };
    routeCallback(req, res);
  },

  onRequest: function(request) {
    this.log('opening', 'connection');
    var connection = request.accept(null, request.origin);
    connection.on('message', this.onMessage.bind(this));
    connection.on('close', this.onClose.bind(this));
  },

  onMessage: function(message) {
    if (message.type === 'utf8') {
      this.log('data', message.utf8Data);
      var request = JSON.parse(message.utf8Data);
      this.callRoute(request.path, request.method, request.data, function(response) {
        this.log('response', response);
      }.bind(this));
    } else {
      this.log('error', 'unsupported data type ' + message.type);
    }
  },

  onClose: function(connection) {
    this.log('closing', 'connection');
  },

  log: function(header, msg) {
    console.log(header.toUpperCase(), ' : ', _.isString(msg) ? msg : JSON.stringify(msg));
  }

};

module.exports = WebSocketServer;