const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const mongoose = require('mongoose')
const Parent = require('../models/parent')

router.post('/parent/signup', async (req, res) => {
    // TODO: Convert response wardUid to ObjectId
    // Required fields: WardUid, Name, Gender, Email, Phone, Password
    const parent = new Parent(req.body)

    try {
        const existingParent = await Parent.findEmail(req.body.email)
        if (existingParent) {
            return res.status(400).send('Parent already exists')
        }
        await parent.save()
        const token = await parent.generateAuthToken()
        res.status(200).send({ parent, token })

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post('/parent/login', async (req, res) => {
    try {
        const parent = await Parent.findByCredentials(req.body.email, req.body.password)
        const parentUID = parent._id
        const token = await parent.generateAuthToken()
        res.status(200).send({ parent, token, parentUID })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post('/parent/logout', auth, async (req, res) => {
    try {
        req.parent.tokens = req.parent.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.parent.save()
        res.status(200).send('Logout Successfully!')

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

module.exports = router