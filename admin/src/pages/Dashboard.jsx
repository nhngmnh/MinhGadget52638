import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useEffect } from 'react'

const Dashboard = () => {

  const {aToken,dashData,getDashData} =useContext(AdminContext)
  useEffect(()=>{
    if (aToken){
        getDashData();
    }
  },[aToken])
  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3' >
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all' >
          <img  className='w-14'src='' alt=''/>
          <div>
            <p>{dashData.qproducts}</p>
            <p>Products</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src='' alt=''/>
          <div>
            <p>{dashData.qcarts}</p>
            <p>Carts</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src='' alt=''/>
          <div>
            <p>{dashData.qcomments}</p>
            <p>Comments</p>
          </div>
        </div>
      </div>
      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-4 rounded-t border'>
          <img src='' alt=''/>
          <p>Latest users</p>
        </div>
        <div>
          <div className='pt-2 border border-t-0'>
          <div className='pt-2 border border-t-0'>
  {
    dashData.users.map((user, index) => (
      <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-200' key={index}>
        <img className='rounded-full w-10 h-10' src={user.image} alt='' />
        <div className='flex-1 text-sm'>
          <p className='text-gray-800 font-medium'>{user.name}</p>
          <p className='text-gray-700 text-xs md:text-md'>{user.email}</p> {/* nếu có email */}
        </div>
       
      </div>
    ))
  }
</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard