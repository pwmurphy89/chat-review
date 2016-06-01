var http = require('http');
var fs = require('fs');
var server = http.createServer(function(req,res){
	fs.readFile('index.html', 'utf-8', function(err, data){
		res.writeHead(200, {'content-type': 'text/html'});
		res.write(data);
		res.end();
	})

});

var io = require('socket.io').listen(server);
io.sockets.on('connect', function(socket){
	socket.on('message_to_server',function(data){
		io.sockets.emit("message_to_client", {
			message: data.message
		})
	})
})

server.listen(8000);
console.log("Listening on 8000");