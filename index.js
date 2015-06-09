var app  = require('express')();
var http = require('http').Server(app);
var io  = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');

	socket.on('connection message', function(msg) {
    	io.emit('connection message', 'User ' + socket.conn.id + ' has connected.');
  	});

	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});

	socket.on('disconnect', function(){
		io.emit('disconnect message', 'User ' + socket.conn.id + ' has disconnected.');
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});