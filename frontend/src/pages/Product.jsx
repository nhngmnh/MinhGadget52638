import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { products } from '../assets/assets'
const Product = () => {
  const [category,setCategory]=useState('');
  const [brand,setBrand]=useState('');
  const handleCategoryChange = (newCategory) => {
    setCategory(prev => (prev === newCategory ? '' : newCategory)); // Nếu đã chọn rồi thì xóa
  };
  const handleBrandChange = (newBrand) => {
    setBrand(prev => (prev === newBrand ? '' : newBrand));
  };

  const[filterPro,setFilterPro]=useState([])
  const {products,setProducts}=useContext(AppContext)
  const [showFilter,setShowFilter]=useState(false)
  const navigate=useNavigate()
  useEffect(() => {
    const params = new URLSearchParams();
  
    if (category) params.set('category', category);
    if (brand) params.set('brand', brand);
    setFilterPro(products.filter(pr=>pr.category===category&&pr.brand===brand))
    navigate(`?${params.toString()}`);
  }, [category, brand]);
  
  return (
    <div className='flex flex-col'>
      <p className='text-gray-600 ml-0'>Browse through the device categories.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 flex relative w-36 px-3 border rounded text-sm transition-all sm:hidden ${showFilter? 'bg-primary text-white':''}`} onClick={()=>setShowFilter(prev=>!prev)}>Filter</button>
        <div className={`flex flex-col gap-4 text-sm ${showFilter?'flex':'hidden sm:flex'}`}>
          <p onClick={handleCategoryChange('Laptop')} className={`w-[94vw] sm:w-56 pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-primary hover:text-white ${category==="Laptop"?"bg-indigo-200 text-black":""} `}>Laptop</p>
          <p onClick={()=>category==='Smartphone'? navigate('/products'):navigate('/products/Smartphone')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-primary hover:text-white ${category==="Smartphone"?"bg-indigo-200 text-black":""}`}>Smartphone</p>
          <p onClick={()=>category==='Tablet'? navigate('/products'):navigate('/products/Tablet')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-primary hover:text-white ${category==="Tablet"?"bg-indigo-200 text-black":""}`}>Tablet</p>
          <p onClick={()=>category==='Pc, Printer'? navigate('/products'):navigate('/products/PcPrinter')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-primary hover:text-white ${category==="PcPrinter"?"bg-indigo-200 text-black":""}`}>PC, Printer</p>
          <p onClick={()=>category==='Smartwatch'? navigate('/products'):navigate('/products/Smartwatch')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-primary hover:text-white ${category==="Smartwatch"?"bg-indigo-200 text-black":""}`}>Smartwatch</p>
          <p onClick={()=>category==='Accessory'? navigate('/products'):navigate('/products/Accessory')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-primary hover:text-white ${category==="Accessory"?"bg-indigo-200 text-black":""}`}>Accessory</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterPro.map((item,index)=>(
              <div onClick={()=>navigate(`/detail/${item._id}`)}className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-blue-50 'src={item.image_url} alt=''/>
               <div className='p-4'>
               <div className={`flex items-center gap-2 text-sm ${item.bestseller? 'text-green-500':'text-gray-500'}`}>
            <p className="flex items-center gap-2">
              <span className={`w-2 h-2 ${item.bestseller ?'bg-green-500': 'bg-gray-500'}  rounded-full`}></span>
                <p>{item.available? 'Available':'Not available'}</p>
            </p>
            </div>
                <div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.brand}</p>
                </div>
               </div>
              </div>
              ))
          }
        </div>
      </div>
    </div>
  )
}

export default Product