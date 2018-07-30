var socket = io();

socket.on('connect', function(){
	console.log('Connected to server');

	// socket.emit('createMessage', {
	// 	from: 'kim',
	// 	text: 'hai. testing!'
	// });
});

socket.on('disconnect', function(){
	console.log('Disconnected from server.')
})

socket.on('newMessage', function(message){
	console.log(message);

	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
// 	from: 'Jeff',
// 	text: 'Hi'
// }, function(ack){
// 	console.log(ack);
// });

jQuery('#message-form').on('submit', function(e){
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message').val()
	}, function(){
		console.log('Message created');
	})
});