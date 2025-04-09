import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
const CheckoutAddToCart = () => {
  const navigate = useNavigate();
  const { products,userData,backendurl,token } = useContext(AppContext);
  const location = useLocation();
  const cartData = location.state || JSON.parse(localStorage.getItem('cartData'));
  const [address,setAddress]=useState(userData.address);
  const [payment,setPayment]=useState('Cash');
  const product = products.find((p) => p._id === cartData.prID);
  const [openChoosingMethod,setOpenChoosingMethod]=useState(false);
  const totalPrice = product ? product.price * cartData.quantity : 0;
  const handleAddCart = async ()=>{
    try {
      if (!token) toast.error("Login to add to cart")
      

     const addCart= await axios.post(backendurl+'/api/user/create-cart',{itemId:cartData.prID,totalItems:cartData.quantity, paymentMethod:payment, shippingAddress:address},{headers:{token}});
      if (addCart) {
        toast.success("Add successfully")
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
    
    navigate('/mycart', { replace: true });
  }
  return token && (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Order Confirmation</h1>

      <div className="flex flex-col md:flex-row items-center bg-gray-100 p-6 rounded-lg">
        <img
          src={product?.image_url}
          alt={product?.name}
          className="w-1/3 rounded-lg shadow-md"
        />
        <div className="ml-6">
          <h2 className="text-3xl font-semibold mb-4">{product?.name}</h2>
          <p className="text-gray-600 mt-6">Price: ${product?.price.toFixed(2)}</p>
          <p className="text-gray-600 mt-4">Quantity: {cartData.quantity}</p>
          <p className="text-lg font-bold mt-4">Total: ${totalPrice.toFixed(2)}</p>
        </div>
      </div>
      <div className='mt-6'>
  <h3 className='text-xl font-semibold text-gray-800 mb-2'>Payment Method:</h3>
  <div className="relative w-48">
    <button
      className='w-full py-2 px-4 border rounded text-sm bg-gray-100 hover:bg-gray-200 transition'
      onClick={() => setOpenChoosingMethod(prev => !prev)}
    >
      {payment}
    </button>

    {openChoosingMethod && (
      <div className="absolute left-0 mt-2 w-full bg-white border shadow-lg rounded-md z-10">
        {['Cash', 'Pay online'].map((mt) => (
          <p
            key={mt}
            className='px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white transition'
            onClick={() => {
              setPayment(mt);
              setOpenChoosingMethod(false);
            }}
          >
            {mt}
          </p>
        ))}
      </div>
    )}
  </div>
</div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Shipping Address</h2>
        <input
          type="text"
          onChange={(e)=>setAddress(e.target.value)}
          placeholder="Enter your shipping address"
          className="mt-2 border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={() => handleAddCart()}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-shadow shadow-md"
      >
        Confirm Order
      </button>
    </div>
  );
};

export default CheckoutAddToCart;
