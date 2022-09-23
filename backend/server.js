const app = require('./app')
const dotenv = require('dotenv')
const connectDB = require('./config/database')

//config
dotenv.config({path : "backend/config/config.env"})

//connect Database
connectDB()

app.listen(process.env.PORT, ()=> {
    console.log(`server is up ${process.env.PORT}`)
})