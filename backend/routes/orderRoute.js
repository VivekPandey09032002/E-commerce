const express = require("express");
const { newOrder, getOrderDetails, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controller/orderController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


router.route("/order/new").post(isAuthenticatedUser,newOrder);
router.route("/order/:id").get(isAuthenticatedUser,getOrderDetails)
router.route("/orders/my").get(isAuthenticatedUser,myOrders)
router.route("/admin/orders").get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders)
router.route("/admin/order/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateOrder).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder)
module.exports = router;
