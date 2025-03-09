import React, { useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { products } from '../assets/assets'
import { assets } from '../assets/assets'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import RelatedProducts from '../components/RelatedProducts'
const DetailProduct = () => {
   const navigate=useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('red');
  const [selectedSize, setSelectedSize] = useState('M');
  const [category, setCategory] = useState('');
  const {prID}=useParams();
    const [pr,setPr]=useState();
    const applyFilter=()=>{
        if (prID){
            console.log(prID);
            const prInfo= products.find(p=>p._id===prID);
            setPr(prInfo);
            setCategory(prInfo.category);
        }
    }
    useEffect(()=>{
        applyFilter();
    },[prID]);
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const handleAddToCart = () => {
    // Chuyển hướng đến trang xác nhận
    const cartData = { prID, quantity, selectedColor, selectedSize };
    localStorage.setItem('cartData', JSON.stringify(cartData));
    navigate('/checkout', { state: cartData });
  };
  return (
    <div>
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg w-auto mt-8">
      <div className="flex">
      <img
          src={pr?.image?.[0]}
          alt="Product"
          className="w-1/2 h-auto rounded-lg"
        />
        <div className="ml-6 w-1/2">
          <h1 className="text-2xl font-bold">Tên Sản Phẩm</h1>
          <p className="text-xl text-gray-700 mt-2">Giá: $99.99</p>
          
          <div className="mt-4">
            <label className="block text-gray-700">Màu sắc:</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="mt-1 border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="red">Đỏ</option>
              <option value="blue">Xanh</option>
              <option value="green">Xanh lá</option>
            </select>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700">Kích thước:</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="mt-1 border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700">Số lượng:</label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="mt-1 border border-gray-300 rounded-md p-2 w-20"
            />
          </div>

          <button onClick={handleAddToCart} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Product's description</h2>
        <p className="text-gray-600 mt-2">
        {pr?.description}
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Product Review</h2>
        <p className="text-gray-600 mt-2">⭐️⭐️⭐️⭐️☆ (4/5 từ 100 đánh giá)</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Delivery information</h2>
        <p className="text-gray-600 mt-2">Giao hàng miễn phí trong vòng 3-5 ngày làm việc.</p>
      </div>
     
    </div>
      
      <RelatedProducts prid={prID} category={category}/>
     </div>
  );
}

export default DetailProduct