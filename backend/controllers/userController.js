import userModel from '../models/userModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js';
import cartModel from '../models/cartModel.js';
import CryptoJS from 'crypto-js';
import config from '../config/zalopay.js'
import axios from 'axios'
import moment from 'moment';
import { addPendingUser, getPendingUser, removePendingUser } from '../utils/pendingUsers.js'
import { sendEmail } from '../utils/sendEmail.js'
const registerUser = async (req,res) =>{
try {
   
    const {username,email,password}=req.body 
    const data= await userModel.findOne({email});
    if (data) return res.status(404).json({success:false,message:"Tài khoản email đã tồn tại !"})
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
    console.log({username,email});
    
    // HAShing USER PASSWORD
    const salt = await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    const userData={
        name:username,
        email,
        password:hashedPassword
    }
    // Lưu tạm user
       const tokenGmail=jwt.sign({email,userData},process.env.JWT_SECRET)
    addPendingUser(email, { hashedPassword, tokenGmail });

  // Gửi email
  const verifyLink = `${process.env.FE_URL}/verify?tokenGmail=${tokenGmail}`;
  await sendEmail(email, 'Xác thực tài khoản', `Nhấn vào đây để xác thực: ${verifyLink}`);

  return res.json({success:true, message:"Vui lòng kiểm tra email để xác thực"});
    
   
} catch (error) {
    console.log(error)
    return res.json({success:false,message:"Lỗi đăng ký"});
}}

const verify = async (req,res) =>{
    try {
        const tokenGmail= req.query.tokenGmail;
        if (!tokenGmail) return res.status(400).json({success:false,message:"Không thấy gmail!"})
        const decoded = jwt.verify(tokenGmail, process.env.JWT_SECRET); // kiểm tra hạn 15 phút
       
        const email = decoded.email;
        const userData=decoded.userData;
        console.log({email,userData});
        
        const pending = getPendingUser(email);

    if (!pending) {
      return res.status(400).send('Token đã hết hạn.');
    }
    console.log(pending.tokenGmail);
    
    if (pending.tokenGmail!==tokenGmail) return res.status(400).send('Token không có');
        const newUser= new userModel(userData);

        const user= await newUser.save();

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        // Xóa khỏi pending
        removePendingUser(email);
        return res.json({success:true,token})
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:"Lỗi xác thực"});
    }
}
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
        const { cart } = req.body;
        if (!cart) return res.status(400).json({success:false,message:"No cart choosen!"})
        const embed_data = {
            redirecturl: `${process.env.FE_URL}/mycart`
        };

        const items = [
            {
              itemid: cart._id || 1,
              itemname: cart.itemData?.name || "Unnamed Item",
              itemprice: cart.itemData?.price || 0,
              itemquantity: cart.totalItems || 1
            }
          ];
          
        const transID = Math.floor(Math.random() * 1000000);
        const order = {
            app_id: config.app_id,
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
            app_user: cart.userData.name,
            app_time: Date.now(),
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: cart.totalPrice,
            description: `MinhGadget52638 - Payment for the order #${transID} - ${cart.totalItems} of ${cart.itemData.name}`,
            bank_code: "",
            callback_url: `${process.env.BE_URL}/api/user/callback`
        };
       
        console.log(order.callback_url);
        
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
        return res.json({success:true,order_url:response.data.order_url}); // Gửi dữ liệu phản hồi về client
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Payment error", success:false });
    }
};
const callback = async (req, res) => {
    let result = {
        return_code: 1,  // Mặc định là thành công
        return_message: "success"
    };

    try {
        const dataStr = req.body.data;
        const reqMac = req.body.mac;
        
        // Tính toán HMAC từ dữ liệu và key
        const mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
        
        // Kiểm tra MAC
        if (reqMac !== mac) {
            result = {
                return_code: -1,  // Lỗi: MAC không khớp
                return_message: "mac not equal",
               
                
            };
            console.log("mac not equal")
            return res.json(result); // Trả về kết quả lỗi ngay lập tức
        }
        
        // Trả về kết quả cho ZaloPay ngay lập tức
        res.json(result);
        
        // Xử lý phía sau (non-blocking)
        const dataJson = JSON.parse(dataStr);
        const items = JSON.parse(dataJson.item);
        const itemId = items[0]?.itemid;
        const macQuery = CryptoJS.HmacSHA256(
            `${dataJson.app_id}|${dataJson.app_trans_id}|${config.key1}`,
            config.key1
        ).toString();
        // Truy vấn trạng thái thanh toán từ ZaloPay
        const billStatus = await axios.post('https://sb-openapi.zalopay.vn/v2/query', {
            app_trans_id: dataJson.app_trans_id,
            app_id: dataJson.app_id,
            mac: macQuery
        });
        console.log({
            app_trans_id: dataJson.app_trans_id,
            app_id: dataJson.app_id,
            mac: macQuery
        });
        
        console.log("Bill status:", billStatus.data);

        if (billStatus.data.return_code === 1) {
            // Thành công
            try {
                // Cập nhật trạng thái thanh toán trong giỏ hàng
                await cartModel.findByIdAndUpdate(itemId, { paymentStatus: true });
                console.log("Cart updated successfully.");
            } catch (err) {
                console.error("Update cart failed:", err);
            }
        } else if (billStatus.data.return_code === 2) {
            // Trùng mã giao dịch
            console.log("Transaction ID duplicated.");
        } else {
            // Không phải callback nữa
            console.log("No callback or invalid state.");
        }

    } catch (err) {
        console.error("Callback error:", err);
        result = {
            return_code: 0,  // Lỗi: Ngoại lệ hệ thống
            return_message: "Internal server error"
        };
        return res.json(result); // Trả về lỗi nếu xảy ra ngoại lệ trong quá trình xử lý
    }
};

export {
    registerUser,loginUser,getProfile,updateProfile,listCart,cancelOrder,createCart,getProducts,getMerchantBanks,payCart,callback,verify
}