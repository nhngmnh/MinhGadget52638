import express from 'express';
import connectDB from '../config/connectDB.js';
import productModel from '../models/productModel.js'
import userModel from '../models/userModel.js'
import cartModel from '../models/cartModel.js';
// api add product
const addProduct = async (req, res) => {
    try { 
        connectDB();
        const { name, price, description, category, stock_quantity,brand } = req.body;
        const imageFile = req.file;

        // Kiểm tra xem đủ thông tin chưa
        if (!name || !price || !category || !stock_quantity ||!brand ) {
            return res.json({ success: false, message: "Missing product details" });
        }

        // Kiểm tra giá và số lượng phải là số dương
        if (price <= 0) {
            return res.json({ success: false, message: "Price must be positive and stock cannot be negative" });
        }

        // Upload ảnh sản phẩm lên Cloudinary (nếu có)
        let imageURL = "";
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            imageURL = imageUpload.secure_url;
        }

        const productData = {
            name,
            price,
            description,
            category,
            brand,
            stock_quantity,
            image: imageURL,
            dateAdded: Date.now()
        };

        const newProduct = new productModel(productData);
        await newProduct.save();

        res.json({ success: true, message: "Product added successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
const getProducts = async (req, res) => {
    try {
        const products = await productModel.find(); // Lấy toàn bộ sản phẩm
        res.json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
const adminDashboard = async(req,res)=>{
    try {
       
        const users=await userModel.find({})
        const products=await productModel.find({})
        const cards=await cardModel.find({})

        const dashData={
            users,products,cards
        }
        res.json({success:true,dashData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const loginAdmin=async(req,res)=>{
    try {
        const {email,password}=req.body
        if (email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        } else {
            res.json({success:false, message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export {
    addProduct,getProducts,adminDashboard,loginAdmin
}