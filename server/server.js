const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

   var rooms = Array.from(new Set(users.getRoomList()));

   socket.emit('roomList', rooms);
 
   console.log(rooms);
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name)) {
    	if(!isRealString(params.room)&&users.getRoomList().length===9){
	      return callback('Name and room name are required.');
	  }
    }

    if(params.room===''&&params.dropdown!==''){
    	params.room=params.dropdown
    }
    params.name = params.name.toLowerCase();
    params.room = params.room.toLowerCase();

    //joining room
    socket.join(params.room);
    //socket.leave('The Office Fans');

    //io.emit -> io.to('The Office Fans').emit
    //socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit
    // socket.emit

    if(users.getUserList(params.room).find(name=>name===params.name)!=undefined){
    	return callback('Duplicate name found in room');
    }

    users.removeUser(socket.id);

    socket.on('roomSelected', (room)=>{
	  	//console.log("This is the room selected: ",room);
	  	params.room = room
	  })

    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

  	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  	socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });


  socket.on('createMessage', (message, callback) => {
  	var user = users.getUser(socket.id);

  	if(user&&isRealString(message.text)){
  		io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
  	}
    
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
  	var user = users.getUser(socket.id);

  	if(user){
    io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
  	}
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if(user){
    	io.to(user.room).emit('updateUserList', users.getUserList(user.room));
    	io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
