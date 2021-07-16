var RandExp = require('randexp')

// Constants
const token = /[a-zA-Z0-9]{30}/
const institutionId = /[a-zA-Z0-9]{6}/
//

// Instances
const tokenGen = new RandExp(token)
const institutionIdGen = new RandExp(institutionId)
//

// A class containing methods to generate random strings from provided RegEx
class Generate {
    static generateToken() {
        return tokenGen.gen()
    }
    static generateInstId(stateCode, districtCode) {
        return (stateCode || "KA") + "-" + (districtCode || "22") + "-" + institutionIdGen.gen()
    }
}

module.exports = Generate