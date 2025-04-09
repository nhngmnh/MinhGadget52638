import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaTimesCircle, FaTruck } from "react-icons/fa";

const Cart = () => {
  const { backendurl, token } = useContext(AppContext);
  const [cart, setCart] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const navigate = useNavigate();

  const getMyCart = async () => {
    try {
      const response = await axios.get(`${backendurl}/api/user/list-mycart`, {
        headers: { token },
      });
      if (response.data) {
        console.log({ success: true, data: response.data });
        setCart(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.post(`${backendurl}/api/user/cancel-order?orderId=${deleteItemId}`, {
        headers: { token },
      });
      setDeleteItemId('');
      toast.success("Item removed from cart");
      setCart(cart.filter(item => item._id !== deleteItemId));
      setShowConfirm(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item");
    }
  };

  useEffect(() => {
    const fetchCart = async ()=>{
      await getMyCart();
    };
    fetchCart();
  }, [token]);

  return token && (
    <div className="mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
        🛒 My Cart
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
        {cart.map((item, index) => (
          <div
            className="flex items-center gap-6 p-4 border rounded-lg shadow-md bg-white hover:bg-indigo-100"
            key={index}
          >
            {/* Product Image */}
            <img
              className="w-28 h-28 object-cover rounded-lg border"
              src={item.itemData.image_url}
              alt=""
            />

            {/* Product Details */}
            <div className="flex-1">
              <p className="text-2xl mb-2">
                {item.itemData.name}&nbsp;&nbsp;&nbsp;
                {item.status === 'processing' ? (
                  <span className="text-gray-500 text-xs">&#128666; Delivering </span>
                ) : item.status === 'shipped' ? (
                  <span className="text-green-600 flex items-center gap-1 text-sm">
                    <FaCheckCircle className="text-green-600 text-xs" /> Completed
                  </span>
                ) : (
                  <span className="text-red-500 flex items-center gap-1 text-sm">
                    <FaTimesCircle /> Cancelled
                  </span>
                )}
              </p>
              <p className="text-lg font-semibold text-gray-800">{item.name}</p>
              <p className="text-gray-600 text-sm">Quantity: {item.totalItems}</p>
              <p className="text-gray-700 font-medium mt-2">
                💰 Price: <span className="text-primary">${item.totalPrice}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                🕒 Ordered on:{' '}
                {new Date(new Date(item.deliveryDate).getTime() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => navigate('/banking')}
                  className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 transition rounded-lg text-sm"
                >
                  Pay Online
                </button>
              )}

              {item.isCompleted && (
                <p className="px-4 py-2 text-sm text-green-600 border border-green-500 rounded-lg text-center">
                  ✅ Completed
                </p>
              )}

              {!item.cancelled && !item.isCompleted && (
                <button
                  className="px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 transition rounded-lg"
                  onClick={() => {
                    setDeleteItemId(item._id);
                    setShowConfirm(true);
                  }}
                >
                  🗑 Delete
                </button>
              )}

              {item.cancelled && (
                <p className="px-4 py-2 text-sm text-red-700 border border-red-500 rounded-lg text-center">
                  ❌ This item was cancelled
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this item?</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={handleDelete}
              >
                Confirm
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
