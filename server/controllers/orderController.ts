import asyncHandler from "../middleware/asyncHandler";
import Order from "../models/orderModel";
import Product from "../models/productModel";
import { calcPrices } from '../utils/calcPrices'
// import { verifyPayPalPayment, checkIfNewTransaction } from '../utils/paypal';
import { order, orderItem, CartState, CartItem, product, IOrder } from "../../client/src/types/interfaces";
import { AuthRequest, OrderRequest } from "../types/types";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler<OrderRequest>(async(req,res)=>{
    const { orderItems, shippingAddress, paymentMethod } = req.body;
    if(!orderItems || orderItems.length == 0){
        res.status(400);
        console.log(req);
        console.log(orderItems);
        throw new Error("No order items.");
    }

    //get ordered items from the database
    const itemsFromDB= await Product.find({
        _id:{ $in: orderItems.map( x => x._id ) },
    });


    // Check if all items from the client have a matching item in the database
    const allItemsFound = orderItems.every((itemFromClient:any) =>
        itemsFromDB.some((itemFromDB) => itemFromDB._id.toString() === itemFromClient._id.toString())
    );

    if (!allItemsFound) {
        res.status(400);
        throw new Error("Could not match prices of orders. Some items are missing.");
    }

    // All items have been validated, now map over the order items
    const dbOrderItems = orderItems.map((itemFromClient:any) => {
        const matchingItemFromDB = itemsFromDB.find(
            (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id.toString()
        );
        if(!matchingItemFromDB){
            res.status(401);
            throw new Error("could not match prices of orders.");
        }
        return {
            ...itemFromClient,
            product: itemFromClient._id,
            price: matchingItemFromDB.price,  // QUESTION MARK ???
        };
    });

    const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrices(dbOrderItems);

    const order = new Order({
    orderItems: dbOrderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
    
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorder
// @access  Private
const getMyOrders = asyncHandler<AuthRequest>(async(req,res)=>{
    const orders = await Order.find({  user: req.user._id });
    res.status(200).json(orders);
});

// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler<AuthRequest>(async(req,res)=>{
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if(order){
        res.status(200).json(order);
    }else{
        res.status(404);
        throw new Error("Error not found");
    }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler<AuthRequest>(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    }else{
        res.status(404);
        throw new Error("Order not found");
    }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler<AuthRequest>(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isDelivered = true;
        order.deliveredAt = new Date();
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder); 
    }else{
        res.status(404);
        throw new Error("Order not found.");
    }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler<AuthRequest>(async(req,res)=>{
    const orders = await Order.find({}).populate('user', 'id name'); // or _id
    res.status(200).json(orders);
});


export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
};
