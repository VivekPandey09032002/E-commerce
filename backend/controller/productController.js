//REST: API -> CRUD
// product schema
const Product = require('../model/productModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../utils/catchAsyncError')

//create Product -- admin
exports.createProduct = catchAsyncError(async (req,res,next) => {
    const product = await Product.create(req.body);
    if(!product){
        return next(new ErrorHandler("cannot create product",500))
    }  
    res.status(201).json({
        success : true,
        product
    })
});


// get all products
exports.getAllProducts = catchAsyncError(async (req,res) => {
    const products = await Product.find();
    if(!products){
        return next(new ErrorHandler("Product not found",404))
    }  
    res.status(200).json({
        success : true,
        products
    })
});

// get product details
exports.getProductDetails = catchAsyncError(async (req,res,next) =>{
    let product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }   
    res.status(200).json({
        success : true,
        product
    }) 

});

// get product details 

// update product -- admin
exports.updateProduct = catchAsyncError(async (req,res,next) => {
    let product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }  

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new : true, runValidators : true})
    res.status(200).json({
        success : true,
        product
    })
})

exports.deleteProduct = catchAsyncError(async (req,res,next) => {
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }  
    await product.remove()
    return res.status(200).json({
        success: true,
        message : "product delete successfully"
    })
});