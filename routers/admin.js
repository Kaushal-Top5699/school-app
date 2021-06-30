const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const mongoose = require('mongoose')
const Admin = require('../models/admin')

router.post('/admin/signup', async (req, res) => {
    // Required fields: Name, Gender, Email, Phone, Password
    const admin = new Admin(req.body)

    try {
        const existingAdmin = await Admin.findEmail(req.body.email)
        if (existingAdmin) {
            return res.status(400).send('Admin already exists')
        }
        await admin.save()
        const token = await admin.generateAuthToken()
        res.status(200).send({ admin, token })

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post('/admin/login', async (req, res) => {
    try {

        const admin = await Admin.findByCredentials(req.body.email, req.body.password)
        const adminUID = admin._id
        const token = await admin.generateAuthToken()
        res.status(200).send({ admin, token, adminUID })

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post('/admin/logout', auth, async (req, res) => {
    try {

        req.admin.tokens = req.admin.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.admin.save()
        res.status(200).send('Logout Successfully!')

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post('/admin/update-profile', auth, async (req, res) => {

    try {
        await Admin.findByIdAndUpdate({ _id: req.admin._id }, req.body)
        const admin = await Admin.findById({ _id: req.admin._id })
        res.status(200).send(admin)

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

module.exports = router