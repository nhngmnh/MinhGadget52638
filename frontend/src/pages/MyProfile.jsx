import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {
  const { userData, setUserData, backendurl, token, getUserData } = useContext(AppContext)
  const [image, setImage] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const updateProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', userData.address)
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      if (image) {
        formData.append('image', image);
      }

      const { data } = await axios.post(backendurl + '/api/user/update-profile', formData, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        await getUserData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return userData && (
    <div className='flex justify-center items-center min-h-screen bg-white'>
      <div className='w-[400px] bg-white shadow-lg rounded-2xl p-6'>
        {/* Ảnh đại diện */}
        <div className='flex justify-center mb-4'>
          {isEdit ? (
            <label htmlFor='image' className='relative cursor-pointer'>
              <img className='w-32 h-32 rounded-full object-cover opacity-75' 
                src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden />
            </label>
          ) : (
            <img className='w-32 h-32 rounded-full object-cover' src={userData.image} alt="" />
          )}
        </div>

        {/* Thông tin cá nhân */}
        <div className='text-center'>
          {isEdit ? (
            <input className='bg-gray-50 text-xl font-semibold w-full text-center' 
              type="text" value={userData.name} 
              onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} 
            />
          ) : (
            <p className='text-xl font-semibold text-gray-900'>{userData.name}</p>
          )}
        </div>

        <hr className='my-4 border-gray-300' />

        {/* Thông tin liên hệ */}
        <div className='text-sm text-gray-700 space-y-2'>
          <p><span className='font-medium'>Email:</span> {userData.email}</p>
          <p><span className='font-medium'>Phone:</span> {isEdit ? (
            <input className='bg-gray-50 w-full' type="text" 
              value={userData.phone} 
              onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
            />
          ) : userData.phone}</p>
          <p><span className='font-medium'>Address:</span> {isEdit ? (
            <input className='bg-gray-50 w-full' type="text" 
              value={userData.address} 
              onChange={e => setUserData(prev => ({ ...prev, address: e.target.value }))} 
            />
          ) : userData.address}</p>
        </div>

        <hr className='my-4 border-gray-300' />

        {/* Thông tin cơ bản */}
        <div className='text-sm text-gray-700 space-y-2'>
          <p><span className='font-medium'>Gender:</span> {isEdit ? (
            <select className='bg-gray-50 w-full' 
              value={userData.gender} 
              onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : userData.gender}</p>

          <p><span className='font-medium'>Birthday:</span> {isEdit ? (
            <input className='bg-gray-50 w-full' type='date' 
              value={userData.dob} 
              onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
            />
          ) : userData.dob}</p>
        </div>

        {/* Nút chỉnh sửa và lưu */}
        <div className='mt-6 text-center'>
          {isEdit ? (
            <button className='bg-blue-500 text-white px-6 py-2 rounded-lg' onClick={updateProfileData}>
              Save Information
            </button>
          ) : (
            <button className='bg-gray-600 text-white px-6 py-2 rounded-lg' onClick={() => setIsEdit(true)}>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyProfile;
