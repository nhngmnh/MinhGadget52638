import express from 'express';
import {addProduct,adminDashboard,getProducts} from '../controllers/adminController.js'


const adminRouter= express.Router();
adminRouter.post('/add-product',addProduct);
adminRouter.get('/all-products',getProducts);
adminRouter.get('/admin-dashboard',adminDashboard)

export default adminRouter