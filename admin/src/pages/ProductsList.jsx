import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const ProductsList = () => {
  const navigate =useNavigate();
  const {aToken,changeAvailability,getProducts,products,setProducts,changeBestsellerStatus}=useContext(AdminContext)
  const handleNavigate =(item)=>{
     navigate('/update-product',{state:{
      productId:item._id,
      specifications:item.specifications,
      name: item.name,
      category: item.category,
      brand: item.brand,
      description: item.description,
      image_url:item.image_url,
      price:item.price,
      stock_quantity:item.stock_quantity
     }})
  }
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (aToken) {
          await getProducts(); 
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  }, [aToken]);
  
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>
        All Products
      </h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {products.map((item,index)=>(
          <div onClick={()=>handleNavigate(item)} className='border border-indigo-200 rounded-xl max-w-52 overflow-hidden cursor-pointer group' key={index}>
            <img 
  className='bg-indigo-50 group-hover:bg-primary transition-all duration-500 h-64 object-cover' 
  src={item.image_url} 
  alt=""
/>

            <div className='p-4'>
              <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
              <p className='text-zinc-600 text-sm'>{item.category}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
              <input 
  onChange={() => {
    changeAvailability(item._id);
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p._id === item._id ? { ...p, available: !p.available } : p
      )
    );
  }} 
  type="checkbox" 
  checked={item.available} 
/>
                <p>Available</p>
              </div>
              <div className='mt-2 flex items-center gap-1 text-sm'>
              <input 
  onChange={() => {
    changeBestsellerStatus(item._id);
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p._id === item._id ? { ...p, bestseller: !p.bestseller } : p
      )
    );
  }} 
  type="checkbox" 
  checked={item.bestseller} 
/>
                <p>Bestseller</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductsList