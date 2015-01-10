var http = require('http');
var io = require('socket.io');

var ServerSocket = function(app, port) {
  var server = http.createServer(app);
  var sio = io.listen(server);
  server.listen(port, function(){
    console.log("ServerSocket server running at port : "+ port)
  });
  
  return sio.sockets;
}

module.exports = function(app, port){
  return new ServerSocket(app, port);
};