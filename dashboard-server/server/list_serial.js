//RUN THIS COMMAND FIRST: npm install serialport
//Since you are already using node JS, I assume that you have npm already.
//If you are not sure, please use command 'npm -v' to check if you have npm on your computer.

const SerialPort = require('serialport')
SerialPort.list().then(ports => {
  ports.forEach(function(port) {
    console.log(port.manufacturer);
    console.log(port.path, "\n");
  });
});

//This script will list all serial port devices on your computer.