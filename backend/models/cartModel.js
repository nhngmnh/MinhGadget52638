const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    itemId:{type: String, required: true},
    totalPrice: { type: Number, required: true }, 
    totalItems: { type: Number, required: true,default:1 },  
    status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    paymentMethod: { type: String, enum: ['cash', 'credit_card', 'paypal'], required: true },
    paymentStatus: { type: Boolean, default: false },
    shippingAddress: { type: String, required: true },
    deliveryDate: { type: Date, default: null },
    itemData:{type:Object,required:true}
}, { timestamps: true });  

const cartModel= mongoose.model.cart || mongoose.model('cart',cartSchema);
export default cartModel;