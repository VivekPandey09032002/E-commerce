//REST: API -> CRUD
// product schema
const Product = require('../model/productModel')

//create Product -- admin
exports.createProduct = async (req,res,next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success : true,
        product
    })
}


// get all products
exports.getAllProducts = async (req,res) => {
    const products = await Product.find();
    res.status(200).json({
        success : true,
        products
    })
}

// get product details
exports.getProductDetails = async (req,res,next) =>{
    let product = await Product.findById(req.params.id)
    if(!product){
        return res.status(500).json({
            success : false,
            message : "Product not found"
        })
    }   
    res.status(200).json({
        success : true,
        product
    }) 

}

// get product details 

// update product -- admin
exports.updateProduct = async (req,res,next) => {
    let product = await Product.findById(req.params.id)
    if(!product){
        return res.status(500).json({
            success : false,
            message : "Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new : true, runValidators : true})
    res.status(200).json({
        success : true,
        product
    })
}

exports.deleteProduct = async (req,res,next) => {
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success : false,
            message : "product not found"
        })
    }
    await product.remove()
    return res.status(200).json({
        success: true,
        message : "product delete successfully"
    })
}