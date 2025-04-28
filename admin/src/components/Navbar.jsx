
import React, { useCallback, useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'
import { assets } from '../assets/assets'
import Search from './Search'
const Navbar = () => {
    const {aToken,setAToken,search,setSearch}=useContext(AdminContext)
    const navigate = useNavigate()
    const logout=()=>{
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
    }
    
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
        <img
  onClick={() => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
  className='w-56 sm:w-48 cursor-pointer'
  src={assets.admin_logo}
  alt="Logo"
/>

            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 '>Admin</p>
        </div>
        <Search search={search} setSearch={setSearch} />
        <button onClick={logout} className='bg-blue-500 text-white text-sm px-10 py-2 rounded-full hover:cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar