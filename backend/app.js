const cookieParser = require('cookie-parser')
const express = require('express')
const { nextTick } = require('process')
const app = express()
const errorMiddleware = require('./middleware/error')
app.use(express.json())
app.use(cookieParser())

//routes imports
const product = require('./routes/productRoute')
const user = require('./routes/userRoute')
//product route
app.use('/api/v1',product)
app.use('/api/v1',user)


//middleware for error -> last middleware
app.use(errorMiddleware)

module.exports = app

