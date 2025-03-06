import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
  const navigate=useNavigate();
  return (
    <div>
      {/*left is image*/}
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <b>CONTACT US</b>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
      <div>
        <img className='w-full md:max-w-[360px]' src={assets.contact_img} alt=""/>
      </div>
      <div  className='flex flex-col justify-center items-start gap-6'>
        <p  className='flex flex-col justify-center font-semibold'>Our OFFICE</p>
        <p className='text-gray-600'>1 Dai Co Viet, Hai Ba Trung<br/> 
        Hanoi, Vietnam</p>
        <p className='text-gray-600'>Tel: (84) 862613118<br/>Email: nhungocminh2004@gmail.com</p>
        <p  className='flex flex-col justify-center font-semibold'>Careers at our shop</p>
        <p className='text-gray-600'>Learn more about our teams and job openings.</p>
        <button onClick={()=>navigate('/jobs')} className="bg-gray-200 text-gray-800 border-1 px-4 py-2 rounded transition-transform duration-300 hover:bg-primary hover:text-white hover:scale-110">
  Explore Jobs
</button>

      </div>
      </div>
    </div>
  )
}

export default Contact