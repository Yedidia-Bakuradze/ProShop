//Handels the logics
import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

// @desc	Create new order
// @route	GET /api/orders
// @access	Private
const addOrderItems = asyncHandler(async (req, res) => {
    res.send('add order items');
});

// @desc	Get logged in user orders
// @route	GET /api/orders/myorders
// @access	Private
const getMyOrders = asyncHandler(async (req, res) => {
    res.send('get my orderss');
});

// @desc	Get order by id
// @route	GET /api/orders/:id
// @access	Private
const getOrderById = asyncHandler(async (req, res) => {
    res.send('get order by id');
});

// @desc	Update order to paid
// @route	GET /api/orders/:id/pay
// @access	Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send('update order to paid');
});

// @desc	Update order to delivered
// @route	GET /api/orders/:id/deliver
// @access	Private/Admin
const updateOrderToDeliver = asyncHandler(async (req, res) => {
    res.send('update order to delivered');
});

// @desc	Get all orders
// @route	GET /api/orders
// @access	Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
    res.send('get all orderss');
});

export {
    addOrderItems,
    getAllOrders,
    getMyOrders,
    getOrderById,
    updateOrderToDeliver,
    updateOrderToPaid
};
