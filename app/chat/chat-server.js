 var welcome = require('./messages/welcome-user');

 var chatServer = function(websocket) {
   var onlineUsers = [];
   var openedChatRooms = [];

   var addUser = function(user) {
     onlineUsers.push(user);
   };

   var openChatroom = function(chatRoom) {
     openedChatRooms.push(chatRoom);
   };

   var userFor = function(socket) {
     return {
       username: socket.handshake.query.username
     };
   };

   var registerUser = function(socket) {
     addUser(userFor(socket));
     socket.emit('welcome', welcome(userFor(socket)));
     // Create chatroom(user, chatroom)
     // Send invitation to a user(chatroom, userOne , userTwo)
     // log off(user)
     //close chatroom(chatroom)
     // set status
   };

   websocket.on('connection', registerUser);
 };

 module.exports = chatServer;