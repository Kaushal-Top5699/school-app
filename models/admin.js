const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: String,
        default: "null"
    },
    avatar: {
        type: String,
        default: "null"
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email')
            }
        }
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    information: {
        degree: {
            title: {
                type: String,
                default: "null"
            },
            showInfo: {
                type: Boolean,
                default: false
            }
        },
        education: {
            university: {
                location: {
                    type: String,
                    default: "null"
                },
                name: {
                    type: String,
                    default: "null"
                },
                showInfo: {
                    type: Boolean,
                    default: false
                }
            }
        }
    },
    institutionInfo: {
        intitutionID: {
            type: String,
            default: "null"
        }
    },
    loginInfo: {
        isOnline: {
            type: Boolean,
            default: false
        },
        lastLoggedIn: {
            type: Date,
            default: null
        }
    },
    loginOptions: {
        permitLogin: {
            type: Boolean,
            default: false
        },
        reason: {
            type: String,
            default: "infoRequired"
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validator(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

adminSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    //delete userObject.tokens

    return userObject
}

//This method generates a token for user
adminSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

//Finds the user with email and password, for logging in the users
adminSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login!')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login!')
    }

    return user
}

adminSchema.statics.findEmail = async (email) => {
    const user = await User.findOne({ email })

    if (user) {
        throw new Error('Email already exists, Log in')
    } else {
        console.log('Ok Create with this email')
    }

}

//Hash the plain text password before saving
adminSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('Admin', adminSchema)
module.exports = User