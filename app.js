
// Dependencies
var express    = require("express");
var bodyParser = require("body-parser");

// Create and configure an express app
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure port
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

//Setup websocket servervar chatServer = ChatServer(app);
var webSocket = require('./app/web-socket')(app, 3000);
var chatServer = require('./app/chat/chat-server')(webSocket);