const express = require('express')
const { nextTick } = require('process')
const app = express()
const errorMiddleware = require('./middleware/error')
app.use(express.json())

//routes imports
const product = require('./routes/productRoute')
//product route
app.use('/api/v1',product)


//middleware for error -> last middleware
app.use(errorMiddleware)

module.exports = app

