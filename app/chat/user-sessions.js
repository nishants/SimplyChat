var UserSession = require('./user-session');

var UserSessions = function () {
  this.userSessions = [];
};

UserSessions.prototype.sessionByUsername = function (username) {
};

UserSessions.prototype.findBySocket = function (socket) {

};

UserSessions.prototype.createNew = function (socket, user) {
  var userSession = new UserSession(socket, user);
  this.userSessions.push(userSession);
  return userSession;
};

var toUsers = function(userSessions, exclude){
  var users = [];
  for(var i = 0; i < userSessions.length; i++){
    var userSession = userSessions[i];
    if(!userSession.sameAs(exclude)){
      users.push(userSession.user());
    }
  }
  return users;
};

UserSessions.prototype.peersOf = function (userSession) {
  return toUsers(this.userSessions, userSession);
};


module.exports = function(){
  return new UserSessions();
};