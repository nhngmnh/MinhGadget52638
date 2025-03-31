import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'

const AllCarts = () => {
  const { aToken, allCarts, getAllCarts, removeCart } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      try {
        getAllCarts();
      } catch (error) {
        console.error('Error fetching carts:', error);
      }
    }
  }, [aToken]);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Carts</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        {/* Tiêu đề cột */}
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_2fr_1fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>User</p>
          <p>Number of Items</p>
          <p>Total Price</p>
          <p>Status</p>
          <p>Actions</p>
        </div>
        
        {/* Danh sách giỏ hàng */}
        {
          allCarts.map((cart, index) =>
            <div key={cart.id} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_2fr_1fr_1fr_1fr] items-center text-gray-800 py-3 px-6 border hover:bg-primary'>
              <p className='max-sm:hidden'>{index + 1}</p>

              {/* Thông tin người dùng */}
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={cart.user.image} alt="" />
                <p>{cart.user.name}</p>
              </div>

              {/* Số lượng sản phẩm */}
              <p>{cart.items.length}</p>

              {/* Tổng tiền */}
              <p>{cart.totalPrice} VNĐ</p>

              {/* Trạng thái */}
              {cart.isCheckedOut 
                ? <p className='text-green-500 text-xs font-medium'>Checked Out</p>
                : <p className='text-yellow-500 text-xs font-medium'>Pending</p>
              }

              {/* Xoá giỏ hàng */}
              <img onClick={() => removeCart(cart.id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="Remove Cart" />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default AllCarts;