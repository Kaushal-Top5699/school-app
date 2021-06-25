const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const mongoose = require('mongoose')
const Admin = require('../models/admin')

router.post('/sign-up', async (req, res) => {

    try {



    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

})

router.post('/login', async (req, res) => {

    try {



    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

})

router.post('/logout', auth, async (req, res) => {

    try {



    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

})

module.exports = router