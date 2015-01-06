
// Dependencies
var express    = require("express");
var bodyParser = require("body-parser");

// Create and configure an express app
var app        = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configre port  
var port = 8080;      
app.listen(port);

// Create a base route
var router = express.Router();
var rootURL = process.env.rootURL || '/api';
app.use(rootURL, router);

console.log("Listening on url : " + rootURL + "/" + port)

// Add a requrest handler
router.get('/', function(req, res) {
  res.json({ message: 'geeksaint.com API!' });   
});

/*  ***************** DB config ***************  */
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gsb_dev'); 

//Test db connection
var User     = require('./app/models/users');

router.route("/users")
  .get(function(req, res) {
    res.json({
      message: 'here is your user'
    });
  })
  .post(function(req, res){
    var user = new User();
    user.name = req.body.name;
  
    user.save(function(err) {
      if(err){
          res.send(err);
      }
      res.json({ message: 'User created! with name: ' + user.name });
    });
});