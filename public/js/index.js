var socket = io();

socket.on('connect', function(){
	console.log('Connected to server');
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

socket.on('newLocationMessage', function(message){
	var li = jQuery('<li></li>');

	var a = jQuery('<a target="_blank">My current location</a>')

	li.text(`${message.from}: `);
	a.attr('href', message.url);
	li.append(a);
	jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', function(e){
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message').val()
	}, function(){
		console.log('Message created');
	})
});

var locationButton = jQuery('#send-location');
const geolocation_api_key = 'AIzaSyA-7KlkAohBN4oOZUpPCtGxWz0JCtTI7BQ';

locationButton.on('click', function(e){
	if(!navigator.geolocation){
		return alert('Geolocation not supported by your browser');
	}

	navigator.geolocation.getCurrentPosition(function(position){
		socket.emit('createLocationMessage',{
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		}, function(){
			console.log('Message created');
		})
	}, function(){
		alert('Unable to fetch location.')
	})
});