// fpp: fucking procedural programming

var app = require('express')()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server)
    , serialport = require("serialport");

// initialize serial port object
var serialPort = new serialport.SerialPort("/dev/cu.usbmodem1411", {
    baudrate: 9600,
    parser: serialport.parsers.readline('\r\n')
});

// open
serialPort.on('open', function() {
    console.log('Serial port open');

    console.log('Wait for hello from arduino');
    serialPort.on('data', function(data) {
        if(data=='Hello!') {
            console.log('Arduino says hello, we can start with the server');
            initServer();
        }
    });
});

function initServer() {
    server.listen(8080);
    app.get('/', function (req, res) {
        res.sendfile(__dirname + '/index.html');
    });

    console.log('init the socket.io communication');
    initSocket();
}

function initSocket() {
    io.sockets.on('connection', function (socket) {
    
        console.log('connected, send hello to the internet');
        socket.emit('hello', { hello: 'world' });
    
        pingpong(socket);
    });
}

function pingpong(socket) {
    console.log('wait for ping from the internet');

    socket.on('ping', function (data) {
        
        console.log('got the ping! forward the ping to arduino');
        console.log(data);

        // arduino is quite fast, be ready for the answer: prepare the listener first
        serialPort.on('data', function(data) {
            if(data=='pong.') {
                console.log('got the pong from arduino! send it back to the internet');
                socket.emit('pong', {data: 'pong'});
            }
        });

        // now send the ping
        serialPort.write('ping.', function(err, results) {
            if(err)
                console.log('err ' + err);
            console.log('results ' + results);
        }); 
    });
}
