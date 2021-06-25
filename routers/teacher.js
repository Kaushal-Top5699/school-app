const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const mongoose = require('mongoose')
const Teacher = require('../models/teacher')

router.post('/teacher/signup', async (req, res) => {
    // Required fields: Name, Gender, Email, Phone, Password
    const teacher = new Teacher(req.body)

    try {
        const existingTeacher = await Teacher.findEmail(req.body.email)
        if (existingTeacher) {
            return res.status(400).send('Teacher already exists')
        }
        await teacher.save()
        const token = await teacher.generateAuthToken()
        res.status(200).send({ teacher, token })

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post('/teacher/login', async (req, res) => {
    try {

        const teacher = await Teacher.findByCredentials(req.body.email, req.body.password)
        const teacherUID = teacher._id
        const token = await teacher.generateAuthToken()
        res.status(200).send({ teacher, token, teacherUID })

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post('/teacher/logout', auth, async (req, res) => {
    try {
        req.teacher.tokens = req.teacher.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.teacher.save()
        res.status(200).send('Logout Successfully!')

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

module.exports = router