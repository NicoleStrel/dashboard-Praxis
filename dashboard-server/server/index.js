var cors = require('cors')
const express = require('express');
const app = express();
app.use(cors())
const fs = require('fs')


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

    //Read from data file
    fs.readFile(machineDataFile, 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        data_list= data.split('\n')

        
        //now, get the next patient in line form patientAndSampleData.txt:
        fs.readFile(patientAndSampleDataFile, 'utf8' , (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            
            //first line
            dataList = data.split('\n')
            first_line = dataList[0]
            current_patientData.push(first_line)

            //remove first line
            var linesExceptFirst = dataList.slice(1).join('\n');
            fs.writeFile(patientAndSampleDataFile, linesExceptFirst, 'utf8', function(err) {
                if (err) throw err;
            });
        })
        
        //combine both lists 
        
        res.send(data_list)
    });
});