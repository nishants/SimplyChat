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
      });
    }
  ]);
}).call(this);