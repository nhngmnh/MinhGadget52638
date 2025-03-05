import React from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
const Navbar = () => {
    const navigate= useNavigate();
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 '>
    <img onClick={()=>navigate('/')} className='w-40 cursor-pointer' src={assets.logo} alt="Our logo"/>
        <ul className='hidden md:flex items-start gap-5 font-medium text-sm'>
            <NavLink to='/'>
                <li className='py-1'>Home</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/'>
                <li className='py-1'>All products</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
           
            <NavLink to='/'>
                <li className='py-1'>About</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/'>
                <li className='py-1'>Contact</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>

        </ul>    
        <div className='flex items-center gap-4'>
        <div className='flex items-center gap-2 cursor-pointer group relative'>
                <img className='w-12 rounded-full' src={assets.avatar} alt=''/>
                <img className='w-2.5' src='' alt=''/>
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 hidden group-hover:block'>
                    <div className='min-w-48 round flex flex-col gap-2 p-4 bg-gray-100 font-bold text-gray-500'>
                    <p  className='group cursor-pointer hover:bg-blue-400 hover:text-primary hover:text-white px-2 py-2'>My Profile</p>
                    <p  className='group cursor-pointer hover:bg-blue-400 hover:text-primary hover:text-white px-2 py-2'>My Cart</p>
                    <p  className='group cursor-pointer hover:bg-blue-400 hover:text-primary hover:text-white px-2 py-2'>Log out</p>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Navbar