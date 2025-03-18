import express from 'express';
import {addProduct,adminDashboard,getProducts, loginAdmin, updateCart, updateProduct} from '../controllers/adminController.js'
import authAdmin from '../middlewares/authAdmin.js';
import upload from '../middlewares/multer.js';
const adminRouter= express.Router();
adminRouter.post('/add-product',authAdmin,upload.single('image'),addProduct);
adminRouter.get('/all-products',authAdmin,getProducts);
adminRouter.get('/admin-dashboard',authAdmin,adminDashboard)
adminRouter.post('/update-product',authAdmin,updateProduct);
adminRouter.post('/update-cart',authAdmin,updateCart);
adminRouter.post('/login',loginAdmin);
export default adminRouter