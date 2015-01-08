
// Dependencies
var express    = require("express");
var bodyParser = require("body-parser");
var io         = require('socket.io');
var http       = require('http');

// Create and configure an express app
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configre port
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Express server listening on port :'+port);

// Create a base route
var routes  = require('./app/routes');
app.use('/', routes);

// view configuration
app.set('views','public/views');
app.set('view engine', 'jade');

//Directory for static files
app.use(express.static('./public'));

//Remote dictionary
var onlineUsers = require('./app/remote-dictionary')();

//Setup websocket server
var server = http.createServer(app);

var sio = io.listen(server);
server.listen(3000, function(){
  console.log('Websocket server listening on port: ' + 3000);
});

sio.sockets.on('connection', function (socket) {
  var newUser = socket.handshake.query.username;
  onlineUsers.add(newUser);
    socket.emit('welcome', { user: newUser });
});