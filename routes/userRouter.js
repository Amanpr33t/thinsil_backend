const express = require('express')
const router = express.Router()
const { signup, login } = require('../controllers/user')

router.post('/signup', signup) //This route is used to signup a user
router.post('/login', login) //This route is used to login a user

module.exports = router