require ('dotenv').config()
const express = require('express')
const cors =  require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connecté'))
    .catch(err => console.error(err));

    

app.listen(port, ()=>{
    console.log('Server lancé !!!!');
    
})