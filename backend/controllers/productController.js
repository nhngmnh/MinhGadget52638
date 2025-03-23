import express from 'express';
import productModel from '../models/productModel.js';
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
export {
    detailProduct
}