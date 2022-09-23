const ErrorHandler = require('../utils/ErrorHandler')

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server error"

    //cast error in mongodg
    if(err.name === "cast error"){
        const msg = `Resource not found ${err.path}`
        err = new ErrorHandler("message",400)
    }
    return  res.status(err.statusCode).json({
        success : false,
        message : err.message
    })
}