const express = require('express')
const app = express()
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const userRouter = require('./routes/userRouter')
const cartRouter = require('./routes/cartRouter')
const connectDB = require('./db/connect')
const port = 3311
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
require('dotenv').config()
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware')

const cors = require('cors');
app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    next()
})

app.use('/user', userRouter) //This middleware is used to login and signup a user
app.use('/cart', cartRouter) //This middleware is used manage cart items
app.use(notFound) //This middleware is used when no other route is found
app.use(errorHandlerMiddleware) //This middleware is triggered when an error occurs

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server running on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}
start()


