import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'

const Product = () => {
  const [showFilterPrice, setShowFilterPrice] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [filterPro, setFilterPro] = useState([]);
  const { backendurl } = useContext(AppContext);
  const [showFilterCategory, setShowFilterCategory] = useState(false);
  const [showFilterBrand, setShowFilterBrand] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${backendurl}/api/user/get-products?category=${category}&brand=${brand}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
      .then((res) => setFilterPro(res.data.products))
      .catch((err) => console.error("Fetch error:", err));
  }, [category, brand,maxPrice,minPrice]);

  const handleCategoryChange = (newCategory) => {
    setCategory(prev => (prev === newCategory ? '' : newCategory));
    setShowFilterCategory(false);
  };

  const handleBrandChange = (newBrand) => {
    setBrand(prev => (prev === newBrand ? '' : newBrand));
    setShowFilterBrand(false);
  };

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row gap-5'>
        <div>
          <button 
            className={`py-1 w-36 px-3 border rounded text-sm transition-all ${showFilterCategory ? 'bg-primary text-white' : ''}`} 
            onClick={() => setShowFilterCategory(prev => !prev)}
          >
            {category ? `Category: ${category}` : 'Select category'}
          </button>
          {showFilterCategory && (
            <div className='flex flex-col gap-4 text-sm mt-2'>
              {['Laptop', 'Smartphone', 'Tablet', 'PcPrinter', 'Smartwatch', 'Accessory'].map(cat => (
                <p key={cat} onClick={() => handleCategoryChange(cat)} 
                   className={`w-36 pl-3 py-1.5 border rounded cursor-pointer hover:bg-primary hover:text-white ${category === cat ? "bg-indigo-200 text-black" : ""}`}
                >
                  {cat}
                </p>
              ))}
            </div>
          )}
        </div>
        <div>
          <button 
            className={`py-1 w-36 px-3 border rounded text-sm transition-all ${showFilterBrand ? 'bg-primary text-white' : ''}`} 
            onClick={() => setShowFilterBrand(prev => !prev)}
          >
            {brand ? `Brand: ${brand}` : 'Select a brand'}
          </button>
          {showFilterBrand && (
            <div className='flex flex-col gap-4 text-sm mt-2'>
              {['DELL', 'Apple', 'ASUS', 'Oppo', 'ACER', 'HP'].map(br => (
                <p key={br} onClick={() => handleBrandChange(br)} 
                   className={`w-36 pl-3 py-1.5 border rounded cursor-pointer hover:bg-primary hover:text-white ${brand === br ? "bg-indigo-200 text-black" : ""}`}
                >
                  {br}
                </p>
              ))}
            </div>
          )}
        </div>
        <div>
          <button 
            className={`py-1 w-72 px-3 border rounded text-sm transition-all ${showFilterPrice ? 'bg-primary text-white' : ''}`} 
            onClick={() => setShowFilterPrice(prev => !prev)}
          >
            {minPrice || maxPrice ? `Price: [${minPrice || 0} - ${maxPrice || '∞'}]` : 'Filter price'}
          </button>
          {showFilterPrice && (
            <div className='flex flex-col gap-2 text-sm mt-2 p-3 border rounded'>
              <input 
                type='number' 
                placeholder='Min Price' 
                className='border p-1 rounded'
                value={minPrice} 
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input 
                type='number' 
                placeholder='Max Price' 
                className='border p-1 rounded'
                value={maxPrice} 
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      <div className='w-full grid grid-cols-auto gap-4 gap-y-6 mt-6'>
        {filterPro.map((item, index) => (
          <div onClick={() => navigate(`/detail/${item._id}`)} 
               className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' 
               key={index}
          >
            <img className='bg-blue-50' src={item.image_url} alt='' />
            <div className='p-4'>
              <div className={`flex items-center gap-2 text-sm ${item.bestseller ? 'text-green-500' : 'text-gray-500'}`}>
                <p className="flex items-center gap-2">
                  <span className={`w-2 h-2 ${item.bestseller ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></span>
                  <span>{item.available ? 'Available' : 'Not available'}</span>
                </p>
              </div>
              <div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.brand}</p>
                <p className='text-gray-600 text-sm mt-4'>{item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
