import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import SearchEngine from './SearchEngine'
import { AppContext } from '../context/AppContext'
import { FaBell, FaShoppingCart } from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {
    const navigate = useNavigate();
    const {
        token, setToken, backendurl, userData,
        search, setSearch,
        getNotifications, notifications, markOneAsRead, markAllAsRead
    } = useContext(AppContext);

    const [showNotification, setShowNotification] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);

    const deleteToken = () => {
        setToken(null);
        localStorage.removeItem('token');
    }

    useEffect(() => {
        if (token) getNotifications();
    }, [token, markAllAsRead, markOneAsRead]);

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 relative z-50'>
            <img onClick={() => navigate('/')} className='w-40 cursor-pointer' src={assets.logo} alt="Our logo" />

            <ul className='hidden md:flex items-start gap-5 font-medium text-sm'>
                <NavLink className='p-2 hover:bg-gray-100' to='/'><li className='py-1'>Home</li></NavLink>
                <NavLink className='p-2 hover:bg-gray-100' to='/products'><li className='py-1'>All products</li></NavLink>
                <NavLink className='p-2 hover:bg-gray-100' to='/about'><li className='py-1'>About</li></NavLink>
                <NavLink className='p-2 hover:bg-gray-100' to='/contact'><li className='py-1'>Contact</li></NavLink>
            </ul>

            <SearchEngine search={search} setSearch={setSearch} />

            <div className='flex items-center gap-4'>
                {/* My Cart icon */}
                {token && (
                    <div
                        onClick={() => navigate('/mycart')}
                        className="relative cursor-pointer p-2 rounded-full hover:bg-gray-200 transition"
                        title="My Carts"
                    >
                        <FaShoppingCart className="text-[22px] text-gray-700 hover:text-blue-500" />
                        {/* Uncomment nếu muốn hiển thị số lượng sản phẩm
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                            3
                        </span>
                        */}
                    </div>
                )}

                {/* Notifications */}
                {token && notifications && (
                    <div className="relative">
                        <FaBell
                            className="w-6 h-6 cursor-pointer text-gray-700 hover:text-primary transition duration-200"
                            onClick={() => setShowNotification(prev => !prev)}
                        />
                        {notifications && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                {notifications.length > 9 ? '9+' : notifications.length}
                            </span>
                        )}
                        {showNotification && (
                            <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-80 max-h-96 flex flex-col z-50">
                                <div className="flex-1 overflow-y-auto">
                                    {notifications.length === 0 ? (
                                        <p className="p-4 text-gray-500">No notifications</p>
                                    ) : (
                                        notifications.slice(0, 15).map((n, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => {
                                                    setSelectedNotification(n);
                                                    setShowDetailModal(true);
                                                    markOneAsRead(n._id);
                                                }}
                                                className={`p-3 border-b hover:bg-gray-100 cursor-pointer ${n.isRead ? 'bg-gray-200' : 'bg-white'}`}
                                            >
                                                <p className="font-semibold text-sm">{n.isRead?'Old notification':<strong className='text-blue-500'>New notification</strong>}</p>
                                                <p className="text-xs text-gray-700">{n.text}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className="text-center p-2 border-t bg-white">
                                    <button
                                        onClick={markAllAsRead}
                                        className="text-blue-500 hover:underline text-sm"
                                    >
                                        Mark all as read
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Avatar & Menu */}
                {token ? (
                    <div className='flex items-center gap-2 cursor-pointer group relative'>
                        <img className='w-10 rounded-full' src={userData.image} alt='' />
                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 hidden group-hover:block'>
                            <div className='min-w-48 round flex flex-col gap-2 p-4 bg-gray-50 font-bold text-black'>
                                <p onClick={() => navigate('/my-profile')} className='hover:bg-blue-400 hover:text-white px-2 py-2 cursor-pointer'>My Profile</p>
                                <p onClick={() => navigate('/comments')} className='hover:bg-blue-400 hover:text-white px-2 py-2 cursor-pointer'>My Comments</p>
                                <p onClick={deleteToken} className='hover:bg-blue-400 hover:text-white px-2 py-2 cursor-pointer'>Log out</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-bold hidden md:block'>
                        Login
                    </button>
                )}
            </div>

            {/* Modal chi tiết thông báo */}
            {showDetailModal && selectedNotification && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-md p-6 w-[600px] h-auto max-w-full shadow-lg relative">
                        <button
                            onClick={() => setShowDetailModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                        >
                            ✕
                        </button>
                        <h2 className="text-3xl font-bold mb-5">Notification Detail</h2>
                        <p className='text-lg mb-1'><strong>ID:</strong> {selectedNotification._id}</p>
                        <p className='text-lg mb-1'><strong>Receiver:</strong> You</p>
                        <p className='text-lg mb-1'><strong>By:</strong> Admin</p>
                        <p className='text-lg mb-1 text-red-500'><strong>Notify:</strong> {selectedNotification.text}</p>
                        <p className='text-lg'><strong>Time:</strong> {new Date(selectedNotification.createdAt).toLocaleString()}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar
