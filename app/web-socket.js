var http = require('http');
var io = require('socket.io');

var websocket = function(app, port) {
  var server = http.createServer(app);
  var sio = io.listen(server);
  server.listen(port, function(){
    console.log("websocket server running at port : "+ port)
  });
  
  return sio.sockets;
}

module.exports = websocket