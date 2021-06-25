const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const mongoose = require('mongoose')
const Student = require('../models/student')

router.post('/student/signup', async (req, res) => {
    // Required fields: Name, Gender, Email, Phone, Password
    const student = new Student(req.body)

    try {
        const existingStudent = await Student.findEmail(req.body.email)
        if (existingStudent) {
            return res.status(400).send('Student already exists')
        }
        await student.save()
        const token = await student.generateAuthToken()
        res.status(200).send({ student, token })

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post('/student/login', async (req, res) => {
    try {

        const student = await Student.findByCredentials(req.body.email, req.body.password)
        const studentUID = student._id
        const token = await student.generateAuthToken()
        res.status(200).send({ student, token, studentUID })

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post('/student/logout', auth, async (req, res) => {
    try {

        req.student.tokens = req.student.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.student.save()
        res.status(200).send('Logout Successfully!')

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

module.exports = router