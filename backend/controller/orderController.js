const Order = require("../model/orderModel");
const Product = require("../model/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../utils/catchAsyncError");

//create new order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success : true,
    order
  })
});

//get order detials
exports.getOrderDetails = catchAsyncError(async (req, res, next) => {
    //populate -> user is a ref so populate bring users (name,email)
    const order = await Order.findById(req.params.id).populate("user","name email")
    if(!order){
        return next(new ErrorHandler(`Order not found with this id`,404))
    }
    res.status(200).json({
      success : true,
      order
    })
});

//get logged in user Orders

//get  my order detials
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const order = await Order.find(req.user._id)
    res.status(200).json({
      success : true,
      order
    })
});

//get all orders -- admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0
    orders.forEach( order =>  {
        totalAmount += order.totalPrice
    })
    res.status(200).json({
      success : true,
      orders,
      totalAmount
    })
});

//update Order status -- admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    
    const order = await Order.findById(req.params.id)
    
    if(!order){
        return next(new ErrorHandler("order not found with this it",404))
    }

    if(order.orderStatus  === "Delivered"){
        return next(new ErrorHandler("you have already Delivered Order",404))
    }
    //stock mai quantity kam karna hai jab delivered ho jai
    order.orderItems.forEach( async (order) => {
        await updateStock(order.product, order.quantity)
    })

    order.orderStatus = req.body.status
    if(req.body.status == "Delivered"){
        order.deliveredAt = Date.now()
    }
    await order.save({validateBeforeSave : false})
    res.status(200).json({
      success : true,
      order,
    })
});

//delete order
//update Order status -- admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler("order not found with this it",404))
    }
    await order.remove()
    res.status(200).json({
      success : true,
    })
});

async function updateStock(id,quantity){
    const product = await Product.findById(id)
    product.stock -= quantity
    await product.save({validateBeforeSave : false})
}


