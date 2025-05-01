import React, { useState, useContext } from 'react'
import { AdminContext } from './context/AdminContext'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import Dashboard from './pages/Dashboard'
import ProductsList from './pages/ProductsList'
import AllCarts from './pages/AllCarts'
import Comments from './pages/Comments'
import AddProduct from './pages/AddProduct'
import UpdateProduct from './pages/UpdateProducts'
import Notifications from './pages/Notifications'
import 'react-toastify/dist/ReactToastify.css'
import 'tailwindcss/tailwind.css'

const App = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false)
  const { aToken } = useContext(AdminContext)

  return aToken ? (
    <div className="bg-white">
      <ToastContainer />
      <Navbar setSidebarVisible={setSidebarVisible} />
      <div className="flex flex-col md:flex-row items-right">
        <Sidebar isVisible={isSidebarVisible} setSidebarVisible={setSidebarVisible} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products-list" element={<ProductsList />} />
          <Route path="/all-carts" element={<AllCarts />} />
          <Route path="/comments-list" element={<Comments />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/update-product" element={<UpdateProduct />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App
