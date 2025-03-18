import express from 'express';
import {addProduct,adminDashboard,getProducts, updateCart, updateProduct} from '../controllers/adminController.js'


const adminRouter= express.Router();
adminRouter.post('/add-product',addProduct);
adminRouter.get('/all-products',getProducts);
adminRouter.get('/admin-dashboard',adminDashboard)
adminRouter.post('/update-product',updateProduct);
adminRouter.post('/update-cart',updateCart);
export default adminRouter