var cors = require('cors')
const express = require('express');
const app = express();
app.use(cors())
const fs = require('fs')
const SerialPort = require('serialport')


app.get('/', (req, res) => {
    res.send("This is our server")
  })

const port = 8000

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.post('/', (req, res) => {
    machineDataFile = './machineData.txt'
    patientAndSampleDataFile = './patientAndSampleData.txt'

    current_patientData =[]
    final_data=[];

    // read from sensor
    const RaspberryPi = new SerialPort('/dev/tty.usbmodem14201', {
        baudRate: 115200 
    })

    RaspberryPi.on('data', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        console.log("eyoooo -->", Boolean(data))
    })

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
                    final_data.push({
                        "patient": p[0],
                        "sample": p[1],
                        "machine": m[0],
                        "time": m[1],
                        "start": m[2],
                    });
                }
                //console.log("final", final_data)
            }
            res.send(final_data)
        })
    });
});