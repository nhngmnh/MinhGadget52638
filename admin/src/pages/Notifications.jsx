import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import moment from 'moment'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Notifications = () => {
  const { aToken, backendurl } = useContext(AdminContext)
  const [notifications, setNotifications] = useState([])
  const [selectedNotification, setSelectedNotification] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  useEffect(() => {
    const fetchAllNotifications = async () => {
      try {
        const res = await axios.get(backendurl + '/api/admin/get-all-notifications', {
          headers: { aToken }
        })
        console.log(res.data)
        setNotifications(res.data.data)
      } catch (error) {
        console.error(error)
        toast.error(error.message)
      }
    }

    fetchAllNotifications()
  }, [aToken, backendurl])

  const deleteNotification = async () => {
    if (!confirmDelete) return

    try {
      await axios.post(backendurl + `/api/admin/delete-notification`, { notificationId: confirmDelete._id }, {
        headers: { aToken }
      })
      setNotifications(prev => prev.filter(n => n._id !== confirmDelete._id))
      toast.success("Delete successfully")
      setConfirmDelete(null)
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  return (
    <div className='p-6 mx-auto w-full'>
      <h2 className='text-2xl font-semibold mb-4'>Admin: All User Notifications</h2>

      {
        notifications.length === 0 ? (
          <p>No notifications available.</p>
        ) : (
          notifications.map((n, index) => (
            <div key={n._id} className='p-4 mb-3 border rounded bg-white shadow-sm'>
              <div className='flex justify-between items-center'>
                <div>
                  <p className='font-medium text-gray-800 max-w-md truncate'>
                    #{index + 1} | <span className='text-blue-600'>User:</span> {n.userId} — {n.text}
                  </p>
                  <p className='text-xs text-gray-500'>{moment(n.createdAt).fromNow()}</p>
                </div>
                <div className='flex gap-2'>
                  <button
                    onClick={() => setSelectedNotification(n)}
                    className='text-blue-500 text-sm hover:underline'
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => setConfirmDelete(n)}
                    className='text-red-500 text-sm hover:underline'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )
      }

      {/* Modal hiển thị thông báo chi tiết */}
      {
        selectedNotification && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Notification Detail</h3>
              <div className="text-sm text-gray-800 space-y-2">
                <p><strong>_id:</strong> {selectedNotification._id}</p>
                <p><strong>userId:</strong> {selectedNotification.userId}</p>
                <p><strong>text:</strong> {selectedNotification.text}</p>
                <p><strong>createdAt:</strong> {moment(selectedNotification.createdAt).format('LLL')}</p>
                <p><strong>isRead:</strong> {selectedNotification.isRead ? 'true' : 'false'}</p>
              </div>
              <div className="mt-5 text-right">
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* Modal xác nhận xóa thông báo */}
      {
        confirmDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
              <p className="text-sm text-gray-800 mb-4">
                Are you sure you want to delete notification #{notifications.findIndex(n => n._id === confirmDelete._id) + 1}?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteNotification}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Notifications
