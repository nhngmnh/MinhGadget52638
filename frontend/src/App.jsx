import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Product from './pages/Product'
import Navbar from './components/Navbar'
import Contact from './pages/Contact'
import Login from './pages/Login'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import SearchEngine from './components/SearchEngine'
const App = () => {
  return (
    <div className='mx-4 sm:mx-[5%]'>
      <Navbar/>
      <div className='flex flex-col sm:grid grid-cols-[1.5fr_4fr]'>
      <SearchEngine />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Product/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/products/:type" element={<Product/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/my-profile" element={<MyProfile/>} />
      </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App