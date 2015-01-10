var ServerSocket = function(sockets) {
  this.sockets = sockets;
};

ServerSocket.prototype.onConnection = function(callback){
  this.sockets.on('connection', callback);
};

module.exports = ServerSocket;