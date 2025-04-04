import express from 'express';
import {addProduct,adminDashboard,changeProductAvailability,getProducts, loginAdmin, updateCart, updateProduct} from '../controllers/adminController.js'
import authAdmin from '../middlewares/authAdmin.js';
import upload from '../middlewares/multer.js';
import { getCarts, removeCart } from '../controllers/cartController.js';
import { getAllComments } from '../controllers/commentController.js';
import { changeBestsellerStatus } from '../controllers/productController.js';
import { getAllReplies, replyComment } from '../controllers/replyController.js';
const adminRouter= express.Router();
adminRouter.post('/add-product',upload.single('image'),authAdmin,addProduct);
adminRouter.get('/all-products',authAdmin,getProducts);
adminRouter.get('/admin-dashboard',authAdmin,adminDashboard)
adminRouter.post('/update-product',authAdmin,updateProduct);
adminRouter.post('/update-cart',authAdmin,updateCart);
adminRouter.post('/login',loginAdmin);
adminRouter.post('/change-product-availability',authAdmin,changeProductAvailability);
adminRouter.get('/all-carts',authAdmin,getCarts)
adminRouter.post('/delete-cart/:cartId',authAdmin,removeCart);
adminRouter.get('/comments',authAdmin,getAllComments)
adminRouter.post('/change-bestseller-status',authAdmin,changeBestsellerStatus)
adminRouter.post('/reply',authAdmin,replyComment)
adminRouter.post('/all-replies',authAdmin,getAllReplies)
export default adminRouter