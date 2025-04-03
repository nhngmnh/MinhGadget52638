import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/all-carts',  label: "Customer's Cart" },
    { path: '/add-product',  label: 'Add Products' },
    { path: '/products-list',  label: 'List Products' },
    { path: '/comments-list', label: 'List Comments' },
  ];

  return (
    <div className='min-h-screen bg-gray-200 border-r'>
      {aToken && (
        <ul className='text-gray-700 mt-5'>
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive ? 'bg-white border-r-4 border-primary' : ''
                }`
              }
              to={item.path}
            >
              <p className='hidden md:block'>{item.label}</p>
            </NavLink>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;