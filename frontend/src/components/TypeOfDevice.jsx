import React from 'react'
import { typeOfProductData } from '../assets/assets'
import { Link } from 'react-router-dom'
const TypeOfDevice = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-black'  id='type'>
    <h1 className='text-bold text-3xl font-medium'>Type of products</h1>
    <p className='sm:w-1/3 text-center text-sm'>Simply select your product type through our product filters</p>
       <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
         {
           typeOfProductData.map((item,index)=>(
             <Link onClick={()=>scrollTo(0,0)} class='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index} to={`/doctors/${item.type}`}>
               <img className='w-16 sm:w-24 mb-2' src={item.image} alt=''/>
               <p className='text-center'>{item.type}</p>
             </Link>
           ))
         }
       </div>
   </div>
  )
}

export default TypeOfDevice