(function() {
  'use strict';
  //Create angular module
  window.schat = {};
  schat.app = angular.module("simply-chat", ['ui.router']);
  
  //Open a socket
  var socket = io.connect('http://localhost:3000');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
}).call(this);