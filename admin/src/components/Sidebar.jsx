import React from 'react'
import { NavLink } from 'react-router-dom'
import Search from './Search'

const Sidebar = ({ isVisible, setSidebarVisible }) => {
  const menuItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/all-carts', label: "Customer's Cart" },
    { path: '/add-product', label: 'Add Products' },
    { path: '/products-list', label: 'List Products' },
    { path: '/comments-list', label: 'List Comments' },
    { path: '/notifications', label: 'Notifications' },
  ]

  return (
    <div
      className={`min-h-screen bg-white border-r fixed top-0 left-0 w-72 transition-all duration-300 ease-in-out z-40 ${
        isVisible ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:relative md:block`}
    >
      {/* Close Button for mobile */}
      <div className="absolute top-0 left-2 z-50 md:hidden mb-4">
        <button
          onClick={() => setSidebarVisible(false)} // Close the sidebar
          className="text-xl text-gray-700"
        >
          X
        </button>
      </div>
      <div className='md:hidden block mt-10'><Search/></div>
      {/* Sidebar Menu Items */}
      <ul className="text-gray-700 mt-8">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-gray-200 border-r-4 border-blue-400' : ''
              }`
            }
            to={item.path}
          >
            <p className="text-gray-700">{item.label}</p>
          </NavLink>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar;
