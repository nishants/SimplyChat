(function() {
  "use strict";
  schat.app.config([
    '$stateProvider',
    function($stateProvider) {
      return $stateProvider.state('loginForm', {
        url: "/loginForm",
        views: {
          default: {
            templateUrl: "views/_login.html",
            controller: "LoginPageController"
          }
        }
      }).state('login', {
        url: "/login",
        views: {
          default: {
            templateUrl: "views/_user_dashboard.html",
            controller: "UserDashboardController"
          }
        }
      }).state('chatRoom', {
        url: "/chatRoom/:id",
        views: {
          default: {
            templateUrl: "views/_chat_room.html",
            controller: "ChatRoomController"
          }
        }
      });
    }
  ]);
}).call(this);