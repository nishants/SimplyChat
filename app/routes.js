var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

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

module.exports = router;
