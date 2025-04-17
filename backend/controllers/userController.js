import userModel from '../models/userModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import {toast} from 'react-toastify'
import productModel from '../models/productModel.js';
import cartModel from '../models/cartModel.js';
import CryptoJS from 'crypto-js';
import config from '../config/zalopay.js'
import axios from 'axios'
import { v1 as uuidv1 } from 'uuid';
import moment from 'moment';
import { redirect } from 'react-router-dom'
const registerUser = async (req,res) =>{
try {
   
    const {username,email,password}=req.body 
    if (!username || !email || !password){
        return res.json({success:false,message:"Missing Details"}) // missing sth
    }
    if (!validator.isEmail(email)) // invalid email
    {
        return res.json({success:false,message:"Invalid email"})
    }
    if (password.length<8){  //weak password
        return res.json({success:false,message:"Please enter strong password"}) 
    }
    // HAShing USER PASSWORD
    const salt = await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    const userData={
        name:username,
        email,
        password:hashedPassword
    }
    const newUser= new userModel(userData)
    const user= await newUser.save()
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.json({success:true,token})
} catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
}}
//API for user login
const loginUser=async(req,res)=>{
try {
    const {email,password}=req.body
    const user=await userModel.findOne({email})
    if (!user){
        return res.json({success:false,message:"User do not exist"})
    }
    const isMatch= await bcrypt.compare(password,user.password)
    if (isMatch)
    {
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
         return res.json({success:true,token})
    } else {
        return res.json({success:false,message:"Invalid credentials"})
    }
} catch (error) {
    console.log(error)
     return res.json({success:false,message:error.message+"hehehe"})
}
}
//api get user profile

const getProfile= async(req,res)=>{
    try {
        const {userId}=req.body
        const userData=await userModel.findById(userId).select('-password')
        res.json({success:true,userData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const updateProfile=async(req,res)=>{
    try {
        const {userId,name,phone,address,dob,gender}=req.body
        const imageFile=req.file
        if (!name || !phone || !dob || !gender || !address) {
            return res.json({success:false,message:"Data missing"+ name + phone +address+dob+gender})
        }
        await userModel.findByIdAndUpdate(userId,{name,phone,address,dob,gender})
        if (imageFile){
            // uplpad img to cloudinary
            const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageurl= imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId,{image:imageurl})
            
            
        }
        res.json({success:true,message:"Profile updated"})
    //    res.json({success:true,message:"Profile updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const listCart= async(req,res)=>{
    try {
        
        const {userId}=req.body
        const carts=await cartModel.find({userId})
        res.json({success:true,cartData:carts})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        // Lấy thông tin đơn hàng
        const order = await cartModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Không cho phép hủy nếu đơn đã giao hoặc đã bị hủy
        if (["shipped", "cancelled"].includes(order.status)) {
            return res.status(400).json({ message: "Cannot cancel an order that is already shipped or cancelled" });
        }

        // Lấy thông tin sản phẩm
        const product = await productModel.findById(order.itemId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Cập nhật trạng thái đơn hàng và kho hàng đồng thời
        const [updatedOrder, _] = await Promise.all([
            cartModel.findByIdAndUpdate(orderId, { status: "cancelled" }, { new: true }),
            productModel.findByIdAndUpdate(order.itemId, { $inc: { stock_quantity: order.totalItems } })
        ]);

        return res.status(200).json({ message: "Order cancelled successfully", updatedOrder });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const createCart = async (req, res) => {
    try {
        const { userId, itemId, totalItems, paymentMethod, shippingAddress } = req.body;
        
        // Lấy thông tin sản phẩm
        const itemData = await productModel.findById(itemId);
        const userData = await userModel.findById(userId).select('-password')
        if (!itemData || !userData) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }
        if (totalItems>itemData.stock_quantity || totalItems>20 ) {return res.status(404).json({ success: false, message:"Max quantity is 20 products per cart"})}
        // Tính ngày giao hàng đúng cách
        const today = new Date();
        const deliveryDate = new Date();
        deliveryDate.setDate(today.getDate() + 5);

        // Tạo dữ liệu giỏ hàng
        const data = {
            userId,
            itemId,
            totalItems,
            paymentMethod,
            shippingAddress,
            status: 'processing',
            itemData,
            userData,
            totalPrice: itemData.price*totalItems,
            paymentStatus: false,
            deliveryDate
        };
        // Tạo và lưu giỏ hàng
        const newCart = new cartModel(data);
        const cart = await newCart.save();
        const product =await productModel.findByIdAndUpdate(itemId,{
            stock_quantity:itemData.stock_quantity-totalItems
        },
    {
        new: true,
    })
        res.json({ success: true, message: "Cart created successfully", cartData: cart, productData: product});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
const getProducts = async (req, res) => {
    try {
        const { query, category, brand, minPrice, maxPrice } = req.query;
        let filter = [];

        if (query) {
            filter.push({
                $or: [
                    { brand: { $regex: query, $options: "i" } }, 
                    { category: { $regex: query, $options: "i" } }, 
                    { description: { $regex: query, $options: "i" } }
                ]
            });
        }

        if (category) {
            filter.push({ category });
        }

        if (brand) {
            filter.push({ brand });
        }

        let priceFilter = {};
        if (minPrice) priceFilter.$gte = parseFloat(minPrice) || 0;
        if (maxPrice) priceFilter.$lte = parseFloat(maxPrice) || Infinity;
        if (Object.keys(priceFilter).length > 0) {
            filter.push({ price: priceFilter });
        }

        const products = await productModel.find(filter.length ? { $and: filter } : {});

        return res.json({ success: true, products: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getMerchantBanks= async (req,res) => {
    const reqtime = Date.now();
    const mac = CryptoJS.HmacSHA256(`${config.app_id}|${reqtime}`, config.key1).toString();
  
    const params = {
      app_id: config.app_id,
      reqtime,
      mac
    };
  
    try {
      const response = await axios.get(config.endpoint, { params });
      const banks = response.data.banks;
  
      for (const id in banks) {
        const bankList = banks[id];
        console.log(`${id}.`);
        for (const bank of bankList) {
          console.log(bank);
        }
      }
    } catch (error) {
      console.error("Error fetching merchant banks:", error.message);
    }
  }
  const payCart = async (req, res) => {
    try {
        const embed_data = {
            redirecturl: "https://docs.zalopay.vn/v2/general/overview.html"
        };

        const items = [{}];
        const transID = Math.floor(Math.random() * 1000000);
        const order = {
            app_id: config.app_id,
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
            app_user: "user123",
            app_time: Date.now(),
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: 50000,
            description: `Lazada - Payment for the order #${transID}`,
            bank_code: "zalopayapp",
            callback_url: "https://2b19-118-70-98-111.ngrok-free.app/api/user/callback"
        };

        const data = [
            order.app_id,
            order.app_trans_id,
            order.app_user,
            order.amount,
            order.app_time,
            order.embed_data,
            order.item
        ].join("|");

        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        const response = await axios.post(config.endpoint, null, {
            params: order
        });

        console.log(response.data);
        return res.json(response.data); // Gửi dữ liệu phản hồi về client
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Payment error", error: error.message });
    }
};


const callback = (req, res) => {
    let result = {};
  
    try {
      let dataStr = req.body.data;
      let reqMac = req.body.mac;
  
      let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
      console.log("mac =", mac);
        console.log("reqmac=",reqMac);
        
  
      // kiểm tra callback hợp lệ (đến từ ZaloPay server)
      if (reqMac !== mac) {
        // callback không hợp lệ
        result.returncode = -1;
        result.returnmessage = "mac not equal";
      }
      else {
        // thanh toán thành công
        // merchant cập nhật trạng thái cho đơn hàng
        let dataJson = JSON.parse(dataStr, config.key2);
        console.log("update order's status = success where apptransid =", dataJson["apptransid"]);
  
        result.returncode = 1;
        result.returnmessage = "success";
      }
    } catch (ex) {
      result.returncode = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
      result.returnmessage = ex.message;
    }
  
    // thông báo kết quả cho ZaloPay server
    return res.json(result);
  };
export {
    registerUser,loginUser,getProfile,updateProfile,listCart,cancelOrder,createCart,getProducts,getMerchantBanks,payCart,callback
}