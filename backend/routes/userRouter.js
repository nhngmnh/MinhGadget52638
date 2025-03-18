import express from 'express';
import { createCart, getProfile, listCart, loginUser, registerUser } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.get('/login',loginUser)
userRouter.get('/get-profile',authUser,getProfile)
userRouter.get('/list-mycart',authUser,listCart)
userRouter.post('/create-cart',createCart)
export default userRouter