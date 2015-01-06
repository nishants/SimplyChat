(function() {
  'use strict';
  //Create angular module
  window.schat = {};
  schat.app = angular.module("simply-chat", ['ui.router']);
  
  //Open a socket
  var socket = io.connect('http://localhost:3000', {query: "username=whoami"});
  socket.on('news', function (data) {
    console.log(data.hello + "joined the chatroom");
    socket.emit('my other event', { my: 'I welcome the user' });
  });
}).call(this);