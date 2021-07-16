const express = require('express')
const router = new express.Router()
const mongoose = require('mongoose')

const Generate = require("../libs/generate")
const ISD = require("../libs/IndianStatesDistricts")

const Institution = require("../models/institution")

router.get("/institution/:uid", async (req, res) => {
    try {
        const params = req.params
        const uid = params["uid"]

        const result = await Institution.findOne({ $or: [{ _id: mongoose.Types.ObjectId(uid) }, { instId: uid.toString() }] })

        if (!result)
            return res.status(404).send("notFound")

        return res.status(200).send(result)
    } catch (e) {
        console.error(e)
        return res.status(500).send(e)
    }
})

router.post("/institution/new", async (req, res) => {
    try {
        const body = req.body

        const adminName = body["adminName"]
        const adminUid = mongoose.Types.ObjectId(body["adminUid"])
        const logo = body["logo"]
        const name = body["name"]
        const officeNo = body["officeNo"]
        const address1 = body["address1"]
        const address2 = body["address2"]
        const locality = body["locality"]
        const pinCode = body["pinCode"]
        const city = body["city"]
        const state = body["state"]

        const instId = Generate.generateInstId(ISD.getSF(state))
        const newInstitution = new Institution({
            instId: instId,
            adminName: adminName,
            adminUid: adminUid,
            logo: logo,
            name: name,
            information: {
                officeNo: officeNo,
                address1: address1,
                address2: address2,
                locality: locality,
                pinCode: pinCode,
                city: city,
                state: state
            }
        })

        newInstitution.save()

        return res.status(200).send(newInstitution)
    } catch (e) {
        console.log(e)
        return res.status(500).send(e)
    }
})

module.exports = router