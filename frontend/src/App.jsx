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
import Banner from './components/Banner'
import Privacy from './pages/Privacy'
import Jobs from './pages/Jobs'
const App = () => {
  return (
    <div className='mx-4 sm:mx-[5%]'>
      <Navbar className='z-50'/>
      <div className='flex flex-col'>
      
      
      <Routes>
        
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Product/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/products/:type" element={<Product/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/my-profile" element={<MyProfile/>} />  
        <Route path="/privacy" element={<Privacy/>} />
        <Route path="/jobs" element={<Jobs/>} />
      </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App