var app = require('express')()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server)
    , serialport = require("serialport");


server.listen(8080);

app.get('/', function (req, res) {
     res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {

    console.log('connected, send a news');
    socket.emit('news', { hello: 'world' });

    console.log('wait for ping');
    socket.on('ping', function (data) {
        console.log('got the ping!');
        console.log(data);

        console.log('now sending the pong');
        socket.emit('pong', {data: 'pong'});
    });
});
