import express from 'express';
import connectDB from '../config/connectDB.js';
import productModel from '../models/productModel.js'
// api add product
const addProduct =async (req,res)=>{
    try {
        connectDB();
        const {name,category,brand,stock_quantity}=req.body
        if (!name ||!category ||!brand ||!stock_quantity){
            return res.json({success:false,message:"Missing Details"}) // missing sth
        }
        const productData={
            name,
            category,
            brand,
            stock_quantity
        }
        const newProduct= new productModel(productData)
        const pr= newProduct.save();
        return res.json({success:true,data:pr}); 
    } catch (error) {
        console.log(error.message);
        
    }
}
export {
    addProduct
}