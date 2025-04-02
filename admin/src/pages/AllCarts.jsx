import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../context/AdminContext'

const AllCarts = () => {
  const { aToken, carts, getCarts, removeCart } = useContext(AdminContext)
  const [changeCart, setChangeCart] = useState(false);
  const [selectedCart, setSelectedCart] = useState(null);

  useEffect(() => {
    const fetchCarts = async () => {
      if (aToken) {
        try {
          await getCarts();
        } catch (error) {
          console.error('Error fetching carts:', error);
        }
      }
    };
    fetchCarts();
  }, [aToken, changeCart]);

  // Hàm mở modal xác nhận xoá
  const handleDeleteClick = (cart) => {
    setSelectedCart(cart);
  };

  // Hàm xác nhận xóa cart
  const confirmDelete = () => {
    if (selectedCart) {
      removeCart(selectedCart._id);
      setChangeCart(prev => !prev);
      setSelectedCart(null); // Đóng modal
    }
  };

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Carts</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>

        {/* Tiêu đề cột */}
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_2fr_1fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Product</p>
          <p>Number of Items</p>
          <p>Total Price</p>
          <p>Status</p>
          <p>Actions</p>
        </div>

        {/* Danh sách giỏ hàng */}
        {
          carts.map((cart, index) =>
            <div key={cart._id} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_2fr_1fr_1fr_1fr] items-center text-gray-800 py-3 px-6 border hover:bg-primary'>
              <p className='max-sm:hidden'>{index + 1}</p>

              {/* Thông tin người dùng */}
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={cart.itemData.image_url} alt="" />
                <p>{cart.itemData.name}</p>
              </div>
              
              {/* Số sản phẩm */}
              <p>{cart.totalItems}</p>
              {/* Tổng tiền */}
              <p>{cart.totalPrice} VNĐ</p>

              {/* Trạng thái */}
              {cart.status === 'completed'
                ? <p className='text-green-500 text-xs font-medium'>Checked Out</p>
                : <p className='text-yellow-500 text-xs font-medium'>Pending</p>
              }

              {/* Xoá giỏ hàng */}
              <img
                onClick={() => handleDeleteClick(cart)}
                className='w-10 cursor-pointer'
                src='' // Thêm icon trash vào đây
                alt="Remove Cart"
              />
            </div>
          )
        }
      </div>

      {/* Modal xác nhận xoá */}
      {selectedCart && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-5 w-96">
            <h3 className="text-lg font-semibold text-gray-900">
              Xóa giỏ hàng {selectedCart.itemData.name}?
            </h3>
            <p className="text-gray-700 mt-2">
              Bạn có chắc chắn muốn xóa giỏ hàng <b>{selectedCart.itemData.name}</b> với số lượng <b>{selectedCart.totalItems}</b> không?
            </p>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedCart(null)}
                className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default AllCarts;
