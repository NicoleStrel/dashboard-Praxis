var cors = require('cors')
const express = require('express');
const app = express();
app.use(cors())


app.get('/', (req, res) => {
    res.send("This is our server")
  })

const port = 8000

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.post('/', (req, res) => {
    // RECIEVE ARDUINO INFO FROM HERE 

    data = ["hello1", "hello2", "hello3", "hello4", "hello5"]
    res.send(data)
});