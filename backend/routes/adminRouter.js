import express from 'express';
import {addProduct,adminDashboard,changeProductAvailability,getProducts, loginAdmin, updateCart} from '../controllers/adminController.js'
import authAdmin from '../middlewares/authAdmin.js';
import upload from '../middlewares/multer.js';
import { changeStatus, getCarts, removeCart } from '../controllers/cartController.js';
import { getAllComments } from '../controllers/commentController.js';
import { changeBestsellerStatus, detailProduct, updateProduct } from '../controllers/productController.js';
import { editReply, getAllReplies, removeReply, replyComment } from '../controllers/replyController.js';
import { createNotification, deleteNotification } from '../controllers/notificationController.js';
const adminRouter= express.Router();
adminRouter.post('/add-product',upload.single('image'),authAdmin,addProduct);
adminRouter.get('/all-products',authAdmin,getProducts);
adminRouter.get('/admin-dashboard',authAdmin,adminDashboard)
adminRouter.post('/update-product',upload.single('image'),authAdmin,updateProduct);
adminRouter.post('/update-cart',authAdmin,updateCart);
adminRouter.post('/login',loginAdmin);
adminRouter.post('/change-product-availability',authAdmin,changeProductAvailability);
adminRouter.get('/all-carts',authAdmin,getCarts)
adminRouter.post('/delete-cart/:cartId',authAdmin,removeCart);
adminRouter.get('/comments',authAdmin,getAllComments)
adminRouter.post('/change-bestseller-status',authAdmin,changeBestsellerStatus)
adminRouter.post('/reply',authAdmin,replyComment)
adminRouter.get('/all-replies',authAdmin,getAllReplies)
adminRouter.post('/update-reply',authAdmin,editReply)
adminRouter.post('/remove-reply',authAdmin,removeReply)
adminRouter.get('/get-product/:prId',authAdmin,detailProduct)
adminRouter.post('/change-cart-status',authAdmin,changeStatus)
adminRouter.post('/create-notification',authAdmin,createNotification)
adminRouter.post('/delete-notification',authAdmin,deleteNotification)
export default adminRouter