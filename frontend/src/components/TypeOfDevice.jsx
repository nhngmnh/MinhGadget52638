import React from 'react'
import { typeOfProductData } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'

const TypeOfDevice = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate

  // Hàm để điều hướng với state
  const handleNavigate = (category) => {
    navigate('/products', { state: { category } }); // Truyền type vào state
  }

  return (
    <div className='flex flex-col items-center gap-4 py-16 text-black' id='type'>
      <h1 className='text-bold text-3xl font-medium'>Type of products</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply select your product type through our product filters</p>
      <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
        {
          typeOfProductData.map((item, index) => (
            <div
              className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'
              key={index}
              onClick={() => {
                handleNavigate(item.type); // Gọi hàm handleNavigate khi click
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img className='w-16 sm:w-24 mb-2' src={item.image} alt='' />
              <p className='text-center'>{item.type}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default TypeOfDevice;
