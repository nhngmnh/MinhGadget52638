import React from 'react'
import { Link } from 'react-router-dom'
import { branch } from '../assets/assets'
const FamousBranch = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-black'  id='type'>
    <h1 className='text-bold text-3xl font-medium'>Find your device with famous branches</h1>
    <p className='sm:w-1/3 text-center text-sm'>Help you feel secure in choosing products from the most reputable brands</p>
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-5 w-full place-content-center'>

         {
           branch.map((item,index)=>(
             <Link onClick={()=>scrollTo(0,0)} class='r flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index} to={`/doctors/${item.name}`}>
               <img className='w-16 sm:w-24 mb-2 mt-5' src={item.image} alt=''/>
               <p className='text-center'>{item.name}</p>
             </Link>
           ))
         }
       </div>
   </div>
  )
}

export default FamousBranch