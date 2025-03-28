import express from 'express';
import {addProduct,adminDashboard,changeProductAvailability,getProducts, loginAdmin, updateCart, updateProduct} from '../controllers/adminController.js'
import authAdmin from '../middlewares/authAdmin.js';
import upload from '../middlewares/multer.js';
const adminRouter= express.Router();
adminRouter.post('/add-product',upload.single('image'),addProduct);
adminRouter.get('/all-products',authAdmin,getProducts);
adminRouter.get('/admin-dashboard',authAdmin,adminDashboard)
adminRouter.post('/update-product',authAdmin,updateProduct);
adminRouter.post('/update-cart',authAdmin,updateCart);
adminRouter.post('/login',loginAdmin);
adminRouter.post('/change-product-availability',changeProductAvailability);
export default adminRouter