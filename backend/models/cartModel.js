import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    itemId:{type: String, required: true},
    totalPrice: { type: Number, required: true }, 
    totalItems: { type: Number, required: true,default:1 },  
    status: { type: String, enum: [ 'processing', 'shipped', 'cancelled'], default: 'processing' },
    paymentMethod: { type: String, enum: ['cash', 'credit_card', 'paypal'], required: true,default: 'cash'},
    paymentStatus: { type: Boolean, default: false },
    shippingAddress: { type: String, required: true },
    deliveryDate: { type: Date, default: null },
    itemData:{type:Object,required:true}
}, { timestamps: true });  

const cartModel= mongoose.model.cart || mongoose.model('cart',cartSchema);
export default cartModel;