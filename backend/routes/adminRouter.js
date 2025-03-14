import express from 'express';
import {addProduct} from '../controllers/adminController.js'


const adminRouter= express.Router();
adminRouter.post('/add-product',addProduct);

export default adminRouter