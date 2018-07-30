const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
	console.log('New user connected');

	// socket.emit from Admin text Welcome to the chat app
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));
	// socket.broadcast.emit from Admin text New user joined
	socket.broadcast.emit('newMessage',generateMessage('Admin', 
		'New User joined'));

	socket.on('createMessage', (message)=>{
		console.log(`new message from ${message.from}: `, message.text);
		io.emit('newMessage',generateMessage(message.from, message.text));
		// socket.broadcast.emit('newMessage',{
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
	});

	socket.on('disconnect', ()=>{
		console.log('Client disconnected.');
	})
});

server.listen(port, ()=>{
	console.log(`Listening on port ${port}`)
})