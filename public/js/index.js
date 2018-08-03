var socket = io();


socket.on('connect', function(){
	socket.on('roomList', (params)=>{
		var select = jQuery('[name="dropdown"]');
		//var option = jQuery('<option></option>');

		params.forEach(function(room){
			//console.log(room);
			select.append(jQuery('<option></option>').text(room));
		})

		jQuery('#drop-down-field').html(select);

		var room;
		jQuery('[name="dropdown"]').change(function(){
			room = jQuery(this).val();
		})

		if(room){
			socket.emit('roomSelected', room);
		}
	})

});