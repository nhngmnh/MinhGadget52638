import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
const Footer = () => {
    const navigate=useNavigate();
  return (
    <div className='md:mx-10'>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/*left*/}
        <div>
            <img className='mb-5 w-56' src={assets.logo} alt=''/>
            <p className='w-full md:2/3 text-gray-600 leading-6'>Online Doctor Appointment Booking System (ODABS) is an online platform that allows patients to easily schedule appointments by selecting doctors, times, and desired services with just a few simple steps. Designed specifically for small clinics, the system provides an efficient solution for managing appointments, patient records, and enhancing the overall healthcare experience.</p>
        </div>
         {/*center*/}
         <div>
            <p className='text-xl font-medium mb-5'>
                Company
            </p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li onClick={()=>navigate('/')}>Home</li>
                <li onClick={()=>navigate('/about')}>About us</li>
                <li onClick={()=>navigate('/contact')}>Contact us</li>
                <li onClick={()=>navigate('/privacy')}>Privacy policy</li>
            </ul>
        </div>
         {/*right*/}
         <div >
            <p className='text-xl font-medium mb-5'>GET IN TOUGH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>phone number: +84 862613118</li>
                <li>gmail: nhungocminh2004@gmail.com</li>
            </ul>
        </div>
    
    </div>
    <div>
            <hr/>
            <p className='py-5 text-sm text-center'>Copyright © 2024</p>
        </div>
</div>
  )
}

export default Footer