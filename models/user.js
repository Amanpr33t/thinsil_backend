const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const validator = require('validator')
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minLength: 6
    },
    cartItems: {
        type: Array,
        default: []
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({
        userId: this._id, email: this.email
    },
        process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)