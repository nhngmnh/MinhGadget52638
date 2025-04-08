import React from 'react'
import { useNavigate } from 'react-router-dom'
import { branch } from '../assets/assets'

const FamousBranch = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate

  // Hàm điều hướng với state là brand
  const handleNavigate = (brand) => {
    navigate('/products', { state: { brand } });
  }

  return (
    <div className='flex flex-col items-center gap-4 py-16 text-black' id='type'>
      <h1 className='text-bold text-3xl font-medium'>Find your device with famous brands</h1>
      <p className='sm:w-1/3 text-center text-sm'>Help you feel secure in choosing products from the most reputable brands</p>
      
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-5 w-full place-content-center'>
        {
          branch.map((item, index) => (
            <div
              key={index}
              className='r flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'
              onClick={() => {
                handleNavigate(item.name); // Truyền tên thương hiệu
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img className='w-16 sm:w-24 mb-2 mt-5' src={item.image} alt='' />
              <p className='text-center'>{item.name}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default FamousBranch
