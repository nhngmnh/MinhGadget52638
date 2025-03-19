import express from 'express';
import connectDB from '../config/connectDB.js';
import userModel from '../models/userModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import {toast} from 'react-toastify'
import productModel from '../models/productModel.js';
import cartModel from '../models/cartModel.js';
import { parseAstAsync } from 'vite';
const registerUser = async (req,res) =>{
try {
   
    const {username,email,password}=req.body 
    if (!username || !email || !password){
        return res.json({success:false,message:"Missing Details"}) // missing sth
    }
    if (!validator.isEmail(email)) // invalid email
    {
        return res.json({success:false,message:"Invalid email"})
    }
    if (password.length<8){  //weak password
        return res.json({success:false,message:"Please enter strong password"}) 
    }
    // HAShing USER PASSWORD
    const salt = await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    const userData={
        name:username,
        email,
        password:hashedPassword
    }
    const newUser= new userModel(userData)
    const user= await newUser.save()
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.json({success:true,token})
} catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
}}
//API for user login
const loginUser=async(req,res)=>{
try {
    const {email,password}=req.body
    const user=await userModel.findOne({email})
    if (!user){
        return res.json({success:false,message:"User do not exist"})
    }
    const isMatch= await bcrypt.compare(password,user.password)
    if (isMatch)
    {
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
         return res.json({success:true,token})
    } else {
        return res.json({success:false,message:"Invalid credentials"})
    }
} catch (error) {
    console.log(error)
     return res.json({success:false,message:error.message+"hehehe"})
}
}
//api get user profile

const getProfile= async(req,res)=>{
    try {
        const {userId}=req.body
        const userData=await userModel.findById(userId).select('-password')
        res.json({success:true,userData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const updateProfile=async(req,res)=>{
    try {
        const {userId,name,phone,address,dob,gender}=req.body
        const imageFile=req.file
        if (!name || !phone || !dob || !gender || !imageFile) {
            return res.json({success:false,message:"Data missing"})
        }
        await userModel.findByIdAndUpdate(userId,{name,phone,address,dob,gender})
        if (imageFile){
            // uplpad img to cloudinary
            const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageurl= imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId,{image:imageurl})
            
            
        }
        res.json({success:true,message:"Profile updated"})
    //    res.json({success:true,message:"Profile updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const listCart= async(req,res)=>{
    try {
        
        const {userId}=req.body
        const carts=await cartModel.find({userId})
        res.json({success:true,carts})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
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

        // Không cho phép hủy nếu đơn đã giao hoặc đã bị hủy
        if (["shipped", "cancelled"].includes(order.status)) {
            return res.status(400).json({ message: "Cannot cancel an order that is already shipped or cancelled" });
        }

        // Lấy thông tin sản phẩm
        const product = await productModel.findById(order.itemId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Cập nhật trạng thái đơn hàng và kho hàng đồng thời
        const [updatedOrder, _] = await Promise.all([
            cartModel.findByIdAndUpdate(orderId, { status: "cancelled" }, { new: true }),
            productModel.findByIdAndUpdate(order.itemId, { $inc: { stock_quantity: order.totalItems } })
        ]);

        return res.status(200).json({ message: "Order cancelled successfully", updatedOrder });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const createCart = async (req, res) => {
    try {
        const { userId, itemId, totalItems, paymentMethod, shippingAddress } = req.body;
        
        // Lấy thông tin sản phẩm
        const itemData = await productModel.findById(itemId);
        if (!itemData) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }
        if (totalItems>itemData.stock_quantity || totalItems>20 ) {return res.status(404).json({ success: false, message:"So luong vuot qua cho phep"})}
        // Tính ngày giao hàng đúng cách
        const today = new Date();
        const deliveryDate = new Date();
        deliveryDate.setDate(today.getDate() + 5);

        // Tạo dữ liệu giỏ hàng
        const data = {
            userId,
            itemId,
            totalItems,
            paymentMethod,
            shippingAddress,
            status: 'processing',
            itemData,
            totalPrice: itemData.price*totalItems,
            paymentStatus: false,
            deliveryDate
        };
        // Tạo và lưu giỏ hàng
        const newCart = new cartModel(data);
        const cart = await newCart.save();
        const product =await productModel.findByIdAndUpdate(itemId,{
            stock_quantity:itemData.stock_quantity-totalItems
        },
    {
        new: true,
    }).select('-image_url')
        res.json({ success: true, message: "Cart created successfully", cartData: cart, productData: product});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
const getProducts = async (req, res) => {
    try {
        const { query, category, brand } = req.query;
        let filter = [];

        if (query) {
            filter.push({
                $or: [
                    { brand: { $regex: query, $options: "i" } }, 
                    { category: { $regex: query, $options: "i" } }, 
                    { description: { $regex: query, $options: "i" } }
                ]
            });
        }

        if (category) {
            filter.push({ category });
        }

        if (brand) {
            filter.push({ brand });
        }

        const products = await productModel.find(filter.length ? { $and: filter } : {});

        res.json({ success: true, products: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export {
    registerUser,loginUser,getProfile,updateProfile,listCart,cancelOrder,createCart,getProducts
}