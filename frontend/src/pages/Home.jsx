import React, { useEffect,useState } from 'react'
import axios from 'axios'
import Banner from '../components/Banner'
import TypeOfDevice from '../components/TypeOfDevice'
import FamousBranch from '../components/FamousBranch'
const Home = () => {
  
  return (
    <div className='z-10'>
      
    <Banner/>
    <TypeOfDevice/>
    <FamousBranch/>
    </div>
  )
}

export default Home