const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
	console.log('New user connected');

	socket.emit('newMessage', {
		from: 'jeff liu',
		text: 'when we meeting?',
		createdAt: new Date()
	});



	socket.on('createMessage', (newMessage)=>{
		console.log('new message', newMessage);
	});

	socket.on('disconnect', ()=>{
		console.log('Client disconnected.');
	})
});

server.listen(port, ()=>{
	console.log(`Listening on port ${port}`)
})