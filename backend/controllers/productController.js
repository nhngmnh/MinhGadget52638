import express from 'express';
import productModel from '../models/productModel.js';
import cartModel from '../models/cartModel.js';
const detailProduct=async(req,res)=>{
    try {
        const {prId}=req.params;
        const product = await productModel.findById(prId);
        if (product) {
            console.log({success: true, data: product});
            
        }
    } catch (error) {
        console.log(error);
        toast.error("Cannot find products")
        
    }
}
const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        // Lấy thông tin đơn hàng
        const order = await cartModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (["shipped", "cancelled"].includes(order.status)) {
            return res.status(400).json({ message: "Cannot cancel an order that is already shipped or cancelled" });
        }


        const product = await productModel.findById(order.itemId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const [updatedOrder, _] = await Promise.all([
            cartModel.findByIdAndUpdate(orderId, { status: "cancelled" }, { new: true }),
            productModel.findByIdAndUpdate(order.itemId, { $inc: { stock_quantity: order.totalItems } })
        ]);

        return res.status(200).json({ message: "Order cancelled successfully", updatedOrder });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
export {
    detailProduct,cancelOrder
}