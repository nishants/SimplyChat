(function() {
  "use strict";
  schat.app.config([
    '$stateProvider',
    function($stateProvider) {
      return $stateProvider.state('login', {
        url: "/login",
        views: {
          default: {
            templateUrl: "views/_login.html",
            controller: "HomePageController"
          }
        }
      })
    }
  ]);
}).call(this);