var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');
var escape_html = require('escape-html');

var server = http.createServer();
var io = socketio(server);
var port = 8080;

fs.readFile('./index.html',function(err, html_strings){
    if(err){
        throw err;
    }

    io.on('connection',function(socket){

        socket.on('message',function(data){
            // обработка сообщения от клиента
            if(data && typeof data.nickname == 'string' && typeof data.message == 'string' && data.nickname && data.message)
            socket.broadcast.emit('message',{nickname:escape_html(data.nickname), message: escape_html(data.message)});
            console.log(data)
        });

    });

    server.on('request',function(request, response){
        response.writeHeader(200,{'Content-Type': 'text/html'});
        response.end(html_strings);
    });

    server.listen(port, function(){
       console.log('Server running at port' + port);
    });
});