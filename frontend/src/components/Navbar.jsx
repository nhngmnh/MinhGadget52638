import React, { useContext, useEffect, useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import SearchEngine from './SearchEngine'
import { AppContext } from '../context/AppContext'
const Navbar = () => {
    const navigate= useNavigate();
    const {token,setToken,backendurl,userData,search,setSearch} = useContext(AppContext)
    const deleteToken=()=>{
        setToken(null);
        localStorage.removeItem('token');
    }
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 relative z-50'>
    <img onClick={()=>navigate('/')} className='w-40 cursor-pointer' src={assets.logo} alt="Our logo"/>
        <ul className='hidden md:flex items-start gap-5 font-medium text-sm'>
            <NavLink className='p-2  hover:bg-gray-100' to='/'>
                <li className='py-1'>Home</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink className='p-2 hover:bg-gray-100' to='/products'>
                <li className='py-1 '>All products</li>
                <hr className=' border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink className='p-2 hover:bg-gray-100 ' to='/ai-assistant'>
                <li className='py-1'>AI assistant</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink className='p-2 hover:bg-gray-100 ' to='/about'>
                <li className='py-1'>About</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink className='p-2 hover:bg-gray-100' to='/contact'>
                <li className='py-1'>Contact</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>

        </ul>    
        <SearchEngine search={search} setSearch={setSearch}/>
        <div className='flex items-center gap-4'>
        {
            token 
            ?
        <div className='flex items-center gap-2 cursor-pointer group relative'>
                <img className='w-10 rounded-full' src={userData.image} alt=''/>
                <img className='w-2.5' src='' alt=''/>
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 hidden group-hover:block'>
                    <div className='min-w-48 round flex flex-col gap-2 p-4 bg-gray-50 font-bold text-black'>
                    <p onClick={()=>navigate('/my-profile')}  className='group cursor-pointer hover:bg-blue-400  hover:text-white px-2 py-2'>My Profile</p>
                    <p onClick={()=>navigate('/mycart')} className='group cursor-pointer hover:bg-blue-400  hover:text-white px-2 py-2'>My Cart</p>
                    <p onClick={()=>navigate('/comments')} className='group cursor-pointer hover:bg-blue-400  hover:text-white px-2 py-2'>Comments & Rating</p>
                    <p onClick={deleteToken} className='group cursor-pointer hover:bg-blue-400  hover:text-white px-2 py-2'>Log out</p>
                    </div>
                </div>
                
            </div>
             :<div>
                <button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-bold hidden md:block'>Login</button>
                
             </div>
            }
        </div>
    </div>
  )
}

export default Navbar