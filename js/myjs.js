'use strict';
/* eslint linebreak-style: ["error", "windows"]*/

const socket = io('http://busdata.metropolia.fi');
const images = $('#imageContainer');

socket.on('connect', function() {
  socket.emit('app_id', 'hege_images');
});

socket.on('message', function(data) {
     let img = $('<img>', {
        id: 'imgg',
        src: data.str,
    });

		$('#urls').append(img);
        //$('#urls').append(data.client_name+' says "'+data.str+'"</br>');
	});

$('#theurl').bind('keypress', function(e) {
		const code = (e.keyCode ? e.keyCode : e.which);
		if (code == 13 && socket) { 
			const msg = {};
			msg.app_id = 'hege_images';
			msg.time = Date.now();
			msg.str = $('#theurl').val();
			socket.json.emit('message', msg);
        }
	});
