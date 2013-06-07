var serialport = require("serialport");

console.log("module", serialport);
console.log("class", serialport.SerialPort);

var serialPort = new serialport.SerialPort("/dev/cu.usbmodem1421", {
    baudrate: 9600,
    parser: serialport.parsers.readline('\r\n')
});

serialPort.on('open', function() {
    console.log('Port open');
});

serialPort.on('data', function(data) {
    console.log(data);
});
