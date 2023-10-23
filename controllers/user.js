require('express-async-errors')
const { StatusCodes } = require('http-status-codes')
const User = require('../models/user')
const CustomAPIError = require('../errors/custom-error')

//This function is used to signup a user
const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(200).json({ status: 'noContent', msg: 'Please enter email and password' })
        }
        const emailExists = await User.findOne({ email })
        if (emailExists) {
            return res.status(200).json({ status: 'emailExists', msg: 'Email already exists' })
        }
        const user = await User.create({ email, password })
        const authToken = await user.createJWT()
        return res.status(200).json({ status: 'ok', msg: 'Account has been created', authToken })
    } catch (error) {
        next(error)
    }

}

//This function is used to login a user
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(200).json({ status: 'noContent', msg: 'Please enter email and password' })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(200).json({ status: 'invalidUser', msg: 'Invalid credentials' })
        }

        const isPasswordCorrect = await user.comparePassword(password)

        if (!isPasswordCorrect) {
            return res.status(200).json({ status: 'invalidPassword', msg: 'Invalid password' })
        }
        const authToken = await user.createJWT()
        return res.status(200).json({ status: 'ok', authToken })
    } catch (error) {
       next(error)
    }
}

module.exports = {
    signup,
    login
}