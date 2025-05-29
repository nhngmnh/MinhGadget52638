import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import Search from './Search'
import { HiMenuAlt3 } from 'react-icons/hi'

const Navbar = ({ setSidebarVisible }) => {
    const { aToken, setAToken, search, setSearch } = useContext(AdminContext)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const logout = () => {
        setIsLoading(true)
        setTimeout(() => {
            if (aToken) {
                setAToken('')
                localStorage.removeItem('aToken')
            }
            navigate('/')
        }, 1000)
    }

    return (
        <div className="relative">
            {isLoading && (
                <div className="absolute inset-0 z-50 bg-white bg-opacity-80 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

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

                {/* Logout + Hamburger */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={logout}
                        className="bg-blue-500 text-white px-2 ml-3 md:px-8 py-2 md:py-2 rounded-full hover:cursor-pointer text-xs md:text-sm"
                    >
                        Logout
                    </button>
                    <button
                        onClick={() => setSidebarVisible(prev => !prev)}
                        className="text-xl text-gray-700 md:hidden"
                    >
                        <HiMenuAlt3 />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
