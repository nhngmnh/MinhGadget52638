import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import Search from './Search'
import { HiMenuAlt3 } from 'react-icons/hi' // Sử dụng biểu tượng hamburger từ Heroicons

const Navbar = ({ setSidebarVisible }) => {
    const { aToken, setAToken, search, setSearch } = useContext(AdminContext)
    const navigate = useNavigate()
    
    const logout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
    }

    return (
        <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
            {/* Logo */}
            <div className="flex items-center gap-2 text-xs">
                <img
                    onClick={() => {
                        navigate('/')
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="w-32 md:w-48 cursor-pointer"
                    src={assets.admin_logo}
                    alt="Logo"
                />
                <p className="border px-1 py-0.5 rounded-full border-gray-500 text-gray-600 text-xs md:text-md">
                    Admin
                </p>
            </div>

            {/* Search bar */}
            <div className="text-sm hidden md:block">
                <Search search={search} setSearch={setSearch} />
            </div>

            {/* Container for logout button and hamburger icon */}
            <div className="flex items-center gap-3">
                {/* Logout button */}
                <button
                    onClick={logout}
                    className="bg-blue-500 text-white px-2 ml-3 md:px-8 py-2 md:py-2 rounded-full hover:cursor-pointer text-xs md:text-sm"
                >
                    Logout
                </button>

                {/* Biểu tượng hamburger nhỏ nằm đằng sau logout */}
                <button onClick={() => setSidebarVisible(prev => !prev)} className="text-xl text-gray-700 md:hidden">
                    <HiMenuAlt3 /> {/* Hamburger icon */}
                </button>
            </div>
        </div>
    )
}

export default Navbar
