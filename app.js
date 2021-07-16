const express = require('express')
const mongoose = require('mongoose')

const adminRouter = require('./routers/admin')
const parentRouter = require('./routers/parent')
const studentRouter = require('./routers/student')
const teacherRouter = require('./routers/teacher')
const institutionRouter = require('./routers/institution')

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(adminRouter)
app.use(parentRouter)
app.use(studentRouter)
app.use(teacherRouter)
app.use(institutionRouter)

const port = process.env.PORT || 3000

const dbURI = process.env.MONGODB_KEY

// To suppress all Mongoose deprecation warnings
mongoose.set('useFindAndModify', false)

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, () => {
            console.log('Server is up on port:', port)
        })
    }).catch((error) => {
        console.log(error)
    })