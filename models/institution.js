const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const validator = require('validator')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')

const schema = new Schema({
    instId: {
        type: String,
        required: true
    },
    adminName: {
        type: String,
        default: "null"
    },
    adminUid: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        default: "null"
    },
    images: {
        type: Array,
        default: []
    },
    information: {
        officeNo: {
            type: String,
            required: true
        },
        contacts: {
            type: Array,
            default: []
        },
        locality: {
            type: String,
            required: true
        },
        pinCode: {
            type: String,
            required: true
        },
        emails: {
            type: Array,
            default: []
        },
        websites: {
            type: Array,
            default: []
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        address1: {
            type: String,
            required: true
        },
        address2: {
            type: String,
            required: true
        }
    },
    description: {
        type: String,
        default: "null"
    },
    // classes: [{
    //     "class": {

    //     }
    // }]
})

const Institution = mongoose.model('Institution', schema)
module.exports = Institution