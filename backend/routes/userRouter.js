import express from 'express';
import { createCart, getProfile, listCart, loginUser, registerUser, getProducts, updateProfile } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';
import { cancelOrder, detailProduct } from '../controllers/productController.js';
import { createComment, getCommentsByProduct } from '../controllers/commentController.js';
const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile',authUser,getProfile)
userRouter.get('/list-mycart',authUser,listCart)
userRouter.post('/create-cart',authUser,createCart)
userRouter.get('/get-products',getProducts)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile) 
userRouter.post('/cancel-order',authUser,cancelOrder)
userRouter.post('/create-comment',createComment)
userRouter.get('/get-comments-by-product/:id',getCommentsByProduct)
export default userRouter