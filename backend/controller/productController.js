//REST: API -> CRUD
// product schema
const Product = require("../model/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../utils/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

//create Product -- admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id

  const product = await Product.create(req.body);
  if (!product) {
    return next(new ErrorHandler("cannot create product", 500));
  }
  res.status(201).json({
    success: true,
    product,
  });
});

// get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments()
  const apiFeature = new ApiFeatures(Product.find(), req.query).pagination(resultPerPage);

  const products = await apiFeature.query;
  if (!products) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    products,
    productCount
  });
});

// get product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// get product details

// update product -- admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await product.remove();
  return res.status(200).json({
    success: true,
    message: "product delete successfully",
  });
});


//create and update review
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const {rating,comment,productId} = req.body
  const review = {
    user : req.user._id,
    name : req.user.name,
    rating : Number(rating),
    comment
  }

  let product = await Product.findById(productId);

});
