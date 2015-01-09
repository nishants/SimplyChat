var WelcomeUserMessage = function(user, otherUsers) {
  return {
    welcome: user,
    onlineUsers: otherUsers
  };
}

module.exports = WelcomeUserMessage