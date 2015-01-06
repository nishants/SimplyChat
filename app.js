
// Dependencies
var express    = require("express");
var bodyParser = require("body-parser");

// Create and configure an express app
var app        = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configre port  
app.listen(process.env.PORT || 8080);

// Create a base route
var routes  = require('./app/routes');
app.use('/', routes);

// view engine setup
app.set('views','app/views');
app.set('view engine', 'jade');

app.use(express.static('./public'));

