import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { products } from '../assets/assets';
const CheckoutAddToCart = () => {
    const navigate= useNavigate();
    const toCartPage=()=>{
        navigate('/mycart');
    }
    
    const location = useLocation();
const cartData = location.state || JSON.parse(localStorage.getItem('cartData'));

    const pr=products.find(product=>product._id === cartData.prID);
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold">Xác Nhận Đơn Hàng</h1>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Thông Tin Sản Phẩm</h2>
          <img
          src={pr?.image?.[0]}
          alt="Product"
          className="w-1/2 h-auto rounded-lg"
        />

        <p className="mt-2"></p>
          <p className="mt-2">Tên sản phẩm: {cartData.prID}</p>
          <p className="mt-2">Số lượng: {cartData.quantity}</p>
          <p className="mt-2">Màu sắc: {cartData.selectedColor}</p>
          <p className="mt-2">Kích thước: {cartData.selectedSize}</p>
        </div>
  
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Địa Chỉ Giao Hàng</h2>
          <input
            type="text"
            placeholder="Nhập địa chỉ giao hàng"
            className="mt-2 border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
  
        <button onClick={toCartPage} className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
          Xác Nhận Đặt Hàng
        </button>
      </div>
    );
}

export default CheckoutAddToCart