//var mongoose     = require('mongoose');
//var Schema       = mongoose.Schema;
//
//var UserSchema   = new Schema({
//    username: String
//});
//
//module.exports = mongoose.model('User', UserSchema);

var Users = function(){
    var findByUsername = function(userName){
        return {
            username: userName,
            status: "online",
            profile_img: "images/office.jpg"
        };
    }

    return {
        findByUsername: findByUsername
    };
};

module.exports = Users();