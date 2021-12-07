var cors = require('cors')
const express = require('express');
const app = express();
app.use(cors())
const fs = require('fs')
const SerialPort = require('serialport')
const RaspberryPi = new SerialPort('/dev/tty.usbmodem14203', { 
    baudRate: 115200 //115200 is the default baud rate of Raspberry Pi Pico.
  })

app.get('/', (req, res) => {
    res.send("This is our server")
  })

const port = 8000

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

sensor_list = []
RaspberryPi.on('data', (data, err) => { 
    if (err) {
        console.error(err)
        return
    }
    if (data) {
        console.log('Input:')
        for (const value of data.values()) {
            console.log(Boolean(value))
            sensor_list.push(value);
        }
        console.log('')
    }
})

app.post('/', (req, res) => {
    machineDataFile = './machineData.txt'
    patientAndSampleDataFile = './patientAndSampleData.txt'

    current_patientData =[]
    final_data=[];

    //Read from data file
    fs.readFile(machineDataFile, 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        current_machine_data= data.split('\n');
        l=current_machine_data.length;
        final_data=[]
        
        //now, get the patients to match the data
        fs.readFile(patientAndSampleDataFile, 'utf8' , (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            dataList = data.split('\n')
            current_patientData=dataList.slice(0,l)

            //combine lists
            if (current_patientData.length > 0 && (current_machine_data.length >0 && current_machine_data[0]!='')){
                for (let i = 0; i < l; i++) {
                    p=current_patientData[i].split('   ')
                    m=current_machine_data[i].split('    ')
                    
                    console.log("Sensor List: ", sensor_list)
                    if (i == 0){ //controlled by the sensor - 1 = starts , 0 = finished
                        len = sensor_list.length
                        if (len == 2 && sensor_list[len-2] == 1 && sensor_list[len-1] == 0){
                            time = '0'
                        }
                        else if (len > 2){

                        }
                        final_data.push({
                            "patient": p[0],
                            "sample": p[1],
                            "machine": m[0],
                            "time": (len == 2 && sensor_list[len-2] == 1 && sensor_list[len-1] == 0) || len > 2? '0': m[1], //0 = finishes timer (after being 1 before)
                            "start": len == 1 && sensor_list[len-1] == 1? '1': m[2], // 1 = starts timer 
                        });
                    }
                    else {
                        final_data.push({
                            "patient": p[0],
                            "sample": p[1],
                            "machine": m[0],
                            "time": m[1],
                            "start": m[2],
                        });
                    }
                }
                //console.log("final", final_data)
            }
            res.send(final_data)
        })
    });
});