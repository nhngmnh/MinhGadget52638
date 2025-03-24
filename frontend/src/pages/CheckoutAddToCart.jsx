import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const CheckoutAddToCart = () => {
  const navigate = useNavigate();
  const { products } = useContext(AppContext);
  const location = useLocation();
  const cartData = location.state || JSON.parse(localStorage.getItem('cartData'));

  const product = products.find((p) => p._id === cartData.prID);
  const totalPrice = product ? product.price * cartData.quantity : 0;

  return (
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

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Shipping Address</h2>
        <input
          type="text"
          placeholder="Enter your shipping address"
          className="mt-2 border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={() => navigate('/mycart')}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-shadow shadow-md"
      >
        Confirm Order
      </button>
    </div>
  );
};

export default CheckoutAddToCart;
