import express from 'express';
import connectDB from '../config/connectDB.js';
import productModel from '../models/productModel.js'
import userModel from '../models/userModel.js'
import cartModel from '../models/cartModel.js';
// api add product
const addProduct = async (req, res) => {
    try { 
        connectDB();
        const { name, price, description, category, stock_quantity,brand,specifications } = req.body;
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
            specifications,
            category,
            brand,
            stock_quantity,
            image: imageURL,
            dateAdded: Date.now()
        };

        const newProduct = new productModel(productData);
        await newProduct.save();

        res.json({ success: true, message: "Product added successfully",data:newProduct});
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
const adminDashboard = async(req,res)=>{
    try {
       
        const users=await userModel.find({})
        const products=await productModel.find({})
        const carts=await cartModel.find({})

        const dashData={
            users,products,carts
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
const updateProduct = async (req, res) => {
    try {
        const { productId, price,available, stock_quantity, bestseller } = req.body;
        const product = await productModel.findByIdAndUpdate(
            productId,
            {   
                price: price,
                available: available,
                stock_quantity: stock_quantity,
                bestseller: bestseller
             },
            { new: true } 
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.json({success: true, data:product});

    }
        catch(err){
            console.log({success: false, message: err.message});
            
        }
}
const updateCart = async (req, res) => {
    try {
        const {status, cartId}=req.body;
        const cart = await cartModel.findByIdAndUpdate(
            cartId, 
            { status: status },
            { new: true } 
        );
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        return res.json({success: true, data:cart});
    } catch (error) {
        console.log(error.message);
        
    }
}
const getProducts = async (req, res) => {
    try {
        const { query, category, brand } = req.query;
        let filter = [];

        if (query) {
            filter.push({
                $or: [
                    {   name: {$regex:query,$options:"i"}},
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

        res.json({ success: true, results: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const changeProductAvailability=async(req,res)=>{
    try {
        
        const {productId}=req.body
        const productData=await productModel.findById(productId)
        const data= await productModel.findByIdAndUpdate(productId,{available:!productData.available}).select(['-image_url']);
        res.json({success:true,message:"Availability Changed",data:data})
    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
    }
}
export {
    addProduct,getProducts,adminDashboard,loginAdmin,updateProduct,updateCart,changeProductAvailability
}