const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

console.log("helo helo helo")

const dbURI = process.env.MONGODB_KEY
mongoose.set('useFindAndModify', false)
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(port, () => {
            console.log('Server is up on port: ' + port)
        })
    }).catch((error) => {
        console.log(error)
    })