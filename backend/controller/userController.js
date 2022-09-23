const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../utils/catchAsyncError");
const User = require('../model/userModle');
const sendToken = require("../utils/jwtToken");
const sendEmail = require('../utils/sendEmail')
const crypto = require("crypto")
// register a user

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const {name,email,password} = req.body
    // const isvalid = await User.findOne({email})
    // if(isvalid){
    //     return next(new ErrorHandler("email already exists",400))
    // }
    const user = await User.create({name,email,password,avatar : {
        public_id : "this is a sample it",
        url : "profile pic url"
    }})

    sendToken(user,201,res)

});


exports.loginUser = catchAsyncError(async (req, res, next) => {
    const {email,password} = req.body
    if(!email || !password){
        return next(new ErrorHandler("please enter email and password",400))
    }

    const user = await User.findOne({email : email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invaild criendtials",400))
    }

    const isPasswordMatched =  await  user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invaild email or password",400))
    }

    sendToken(user,200,res)
});


//logout user
exports.logOutUser = catchAsyncError(async (req, res, next) => {
    res.cookie("token",null,{
        expires : new Date(Date.now()),
        httpOnly : true
    })

    res.status(200).json({
        success : true,
        message : "Logged out successfully"
    })

});

//forgot password mail send
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({email : req.body.email})
    if(!user){
        return next(new ErrorHandler("User not found",404))
    }
    //get reset password token
    const resetToken = user.getResetPasswordToken()
    //need to save the changes in db
    await user.save({validateBeforeSave : false});

    //link for mail
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} if you have not requested this email then please ignore it`

    try{
        await sendEmail({
            email : user.email,
            subject : `E-commerce password recovery`,
            message,
        })
        res.status(200).json({
            success : true,
            message : `email sent to ${user.email}`
        })
    }catch(err){
        user.resetPasswordToken  = undefined
        user.resetPasswordExpire = undefined
        await user.save({validateBeforeSave : false});  
        return next(new ErrorHandler(err.message,500))   
    }
});


//reset the password
exports.resetPassword = catchAsyncError(async (req, res, next) => {

    //creating token hash
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
    // find hash token in db

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire : {$gt : Date.now()}
    })

    if(!user){
        return next(new ErrorHandler("reset password token is invalid or has been expired",400))   
    }

    if(req.body.password.length >= 8 && req.body.password != req.body.confirmPassword){
        return next(new ErrorHandler("password doesn't match",400))          
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()

    sendToken(user,200,res)
});
