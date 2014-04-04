var express = require('express');
var routes = require('./routes');
var spots = require('./routes/spots');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('less-middleware')(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/partials/:partial', routes.partials);

app.get('/spots/:id', spots.get);
app.get('/spots', spots.all);
app.post('/spots', spots.add);

var httpServer = http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});


// Web sockets server
var WebSocketServer = require('websocket').server;

var websocketServer = new WebSocketServer({
  httpServer: httpServer
});

websocketServer.on('request', function(request) {
  var connection = request.accept(null, request.origin);
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      console.log(message.utf8Data);
    }
  });

  connection.on('close', function(connection) {});
});