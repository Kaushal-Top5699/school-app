const express = require('express')
const mongoose = require('mongoose')
const adminRouter = require('./routers/admin')
const parentRouter = require('./routers/parent')
const studentRouter = require('./routers/student')
const teacherRouter = require('./routers/teacher')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(adminRouter)
app.use(parentRouter)
app.use(studentRouter)
app.use(teacherRouter)

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