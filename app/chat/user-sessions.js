var UserSession = require('./user-session');

var UserSessions = function () {
  this.userSessions = [];
};

UserSessions.prototype.sessionByUsername = function (username) {
  var userSessions = this.userSessions;
  for(var i = 0; i < userSessions.length; i++){
    if(userSessions[i].user().username == username){
      return userSessions[i];
    }
  }
  return null;
};

UserSessions.prototype.createNew = function (socket, user) {
  var userSession = new UserSession(socket, user, this);
  this.userSessions.push(userSession);
  return userSession;
};


UserSessions.prototype.peersOf = function (userSession) {
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

  return toUsers(this.userSessions, userSession);
};


module.exports = function(){
  return new UserSessions();
};