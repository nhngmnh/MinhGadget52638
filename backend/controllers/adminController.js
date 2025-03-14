import express from 'express';
import connectDB from '../config/connectDB.js';
import productModel from '../models/productModel.js'
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

export {
    addProduct
}