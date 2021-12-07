//See 'list_serial.js' first.

const SerialPort = require('serialport')
const RaspberryPi = new SerialPort('/dev/tty.usbmodem14201', { //Note: Not "usbmodemXXX".
  baudRate: 115200 //115200 is the default baud rate of Raspberry Pi Pico.
})

RaspberryPi.on('data', (data, err) => { //The order of 'data' and 'err' matters!
  if (err) {
    console.error(err)
    return
  }
  if (data) {
    console.log('Input:')
    for (const value of data.values()) {
      console.log(Boolean(value)) //You can call other functions here.
    }
    console.log('')
  }
})

//Note: Raspberry Pi will send a byte of information whenever it detects a state change in the infrared sensor.
//When the infrared sensor starts to receive a signal, it will send one byte (the value is 1).
//When the infrared sensor stops receiving the signal, it will send one byte too (the value is 0).
//If you want Raspberry Pi to send more than one byte of information each time, please use a parser on the PC end.