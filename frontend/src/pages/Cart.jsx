import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../context/AppContext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { products } from '../assets/assets'
const Cart = () => {
  
  const [cart, setCart]=useState([])
  
  const getMyCart = () =>{
    let myCart=[];
    products.map((item,index)=>{
      myCart.push({
        id: index,
        cartData:item,
        number:1,
        isCompleted:false,
        cancelled:false
       })
    })
    setCart(myCart)
  }
  const navigate=useNavigate()
 
 
  useEffect(()=>{
    getMyCart();
},[])

  return (
    <div >
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Cart</p>
      <div>
      {cart.map((item,index)=>(
        <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 border-b' key={index}>
          <div>
            <img className='w-32 bg-indigo-50' src={item.cartData.image} alt=""/>
          </div>
          <div className='flex-1 text-sm text-zinc-600'>
            <p className='text-neutral-800 font-semibold'>{item.cartData.name}</p>
            <p>{item.cartData.category}</p>
            
          
            <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time: </span>{Date()}</p>
          </div>
          <div className='flex flex-col gap-2 justify-end'>
            
            {!item.cancelled && !item.isCompleted && <button onClick={()=>navigate('/banking')} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:text-white hover:bg-primary'>
              Pay online
            </button>}
            
            {item.isCompleted && <p className='text-sm text-green-600 text-center sm:min-w-48 py-2 border'>
              Completed
            </p>}

            {!item.cancelled && !item.isCompleted && <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:text-white hover:bg-red-600'>Delete
            </button>}
            {item.cancelled && <button className='sm:min-w-48 py-2 border border-red-700 rounded text-red-700'>This device was cancelled</button>} 
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default Cart