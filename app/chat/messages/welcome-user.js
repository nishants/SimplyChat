var WelcomeUserMessage = function(user, otherUsers) {
  return {
    name: 'welcome',
    body: {
      welcome: user,
      onlineUsers: otherUsers
    }
  };
}

module.exports = WelcomeUserMessage