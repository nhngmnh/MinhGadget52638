import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../context/AdminContext'

const AllCarts = () => {
  const { aToken, carts, getCarts, removeCart, changeCartStatus,notifyChangeStatusCart } = useContext(AdminContext)
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

  const handleDeleteClick = (cart) => {
    setSelectedCart(cart);
  };

  const confirmDelete = async () => {
    if (selectedCart) {
      try {
        await removeCart(selectedCart._id);
        await notifyChangeStatusCart({
          userId: selectedCart.userId,
          text: `The cart (id: #${selectedCart._id}) that has ${selectedCart.totalItems} item(s) of ${selectedCart.itemData.name} you ordered has been deleted by admin.`
        });
        setChangeCart(prev => !prev);
        setSelectedCart(null);
        toast.success("Delete successfully")
      } catch (error) {
        console.error('Error deleting cart:', error);
      }
    }
  };

  const handleStatusChange = async (cart, newStatus) => {
    const success = await changeCartStatus(cart._id, newStatus);
    if (success) {
      // Sau khi cập nhật thành công thì tạo thông báo
      await notifyChangeStatusCart({
        userId: cart.userId,
        text: `The cart (id: #${cart._id}) that has ${cart.totalItems} item(s) of ${cart.itemData.name} was updated to ${newStatus} by admin.`
      });
  
      setChangeCart(prev => !prev);
    }
  };

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Carts</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>

        {/* Column headers */}
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_2fr_1fr_1fr_2fr] grid-flow-col py-3 px-6 border-b font-semibold text-gray-700'>
          <p>#</p>
          <p>Product</p>
          <p>Number of Items</p>
          <p>Total Price</p>
          <p>Status</p>
          <p>Actions</p>
        </div>

        {/* Cart rows */}
        {
          carts.map((cart, index) =>
            <div key={cart._id} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_2fr_1fr_1fr_2fr] items-center text-gray-800 py-3 px-6 border hover:bg-gray-100'>
              <p className='max-sm:hidden'>{index + 1}</p>

              <div className='flex items-center gap-2'>
                <img className='w-8 h-8 rounded-full object-cover' src={cart.itemData.image_url} alt="Product" />
                <p className='font-medium'>{cart.itemData.name}</p>
              </div>

              <p>{cart.totalItems}</p>
              <p>{cart.totalPrice} VNĐ</p>

              <div>
                <select
                  value={cart.status}
                  onChange={(e) => handleStatusChange(cart, e.target.value)}
                  className='text-xs border rounded px-2 py-1 bg-white'
                >
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className='flex gap-2 items-center'>
                <button
                  onClick={() => handleDeleteClick(cart)}
                  className='text-red-500 hover:text-red-700 text-xs underline'
                >
                  Delete
                </button>
              </div>
            </div>
          )
        }
      </div>

      {/* Delete Confirmation Modal */}
      {selectedCart && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-5 w-96">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete cart of {selectedCart.itemData.name}?
            </h3>
            <p className="text-gray-700">
              Are you sure you want to delete the cart with <b>{selectedCart.totalItems}</b> item(s)?
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
