const data = require("./indStsDts.json")

const states = data["states"]

class ISD {
    static checkSF(sf) {
        return !!this.getName(sf)
    }
    static checkName(name) {
        return !!this.getSF(name)
    }

    static getSF(name) {
        return states.find(item => item["name"].toLowerCase() === name.toLowerCase())["code"].toUpperCase()
    }
    static getName(sf) {
        return states.find(item => item["code"].toUpperCase() === sf.toUpperCase())["name"]
    }

    static getAllSF() {
        return states.map(item => item["code"].toUpperCase())
    }
    static getAllNames() {
        return states.map(item => item["name"])
    }
    static getAllStates() {
        return states.filter(item => item["type"].toLowerCase() === "state")
    }
    static getAllNonStates() {
        return states.filter(item => item["type"].toLowerCase() !== "state")
    }
    static getAllDistricts(name) {
        return states.filter(item => item["name"].toLowerCase() === name.toLowerCase()).map(item => item["districts"])
    }
}

module.exports = ISD