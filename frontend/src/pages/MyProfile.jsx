import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import {assets} from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
const MyProfile = () => {
 // const {userData,setUserData,token,backendurl,loadUserProfileData }= useContext(AppContext)

  const [image,setImage]=useState(false)

  const [isEdit,setIsEdit]=useState(false)
  // const updateProfileData=async() =>{
  //   try {
  //     const formData=new FormData()

  //     formData.append('name',userData.name)
  //     formData.append('phone',userData.phone)
  //     formData.append('address',JSON.stringify(userData.address))
  //     formData.append('gender',userData.gender)
  //     formData.append('dob',userData.dob)
  //     if (image) {
  //       formData.append('image',image);
  //     }
  //     const {data} = await axios.post(backendurl+'/api/user/update-profile',formData,{headers:{token}})
  //     if (data.success) {
  //       toast.success(data.message+'tc')
  //       await loadUserProfileData()
        
  //       setIsEdit(false)
  //       setImage(false)
  //     } else {
  //       toast.error(data.message)
  //     }

  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message)
  //   }
  // }
  return  (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
       {
        isEdit
        ? <label htmlFor='image'>
          <div className='inline-block relative cursor-pointer'>
            <img className='w-36 rounded opacity-75' src='' alt="" />
           
            <img className='w-10 absolute bottom-12 right-12' src={assets.avatar} alt="" />
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden />
        </label>
        :<img className='w-36 rounded'src='' alt=""/>
      }
      
      {
        isEdit
        ? <input className='bg-gray-50 text-2xl font-medium max-w-60 mt-4' type="text" value='hehehehe' />
        :<p className='font-medium text-2xl text-neutral-800 mt-4'>Myname</p> 
      }
      <hr className='bg-zinc-400 h-[1px] border-none'/>
      <div>
        <p className='text-neutral-600 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>nhungocminh2004@gmail.com</p>
          <p className='font-medium'>
            Phone:
          </p>
          {
        isEdit
        ? <input className='bg-gray-100 max-w-52' type="text" value='' onChange={ e=> setUserData(prev => ({...prev,phone:e.target.value}))} />
        :<p className='text-blue-500'>1234567890</p> 
      }
      <p className='font-medium'>Address:</p>
      {
        isEdit
        ? <p className='text-gray-500'>
            <input
              className='bg-gray-50'
              onChange={e => setUserData(prev => ({
                ...prev, // Giữ nguyên các trường khác trong userData
                address: {
                  ...prev.address, // Giữ nguyên các trường khác trong address
                  line1: e.target.value // Chỉ cập nhật line1
                }
              }))}
              value={userData.address.line1 || ''} // Đảm bảo tránh undefined
              type="text"
            />
            <br />
            <input
              className='bg-gray-50'
              onChange={e => setUserData(prev => ({
                ...prev, // Giữ nguyên các trường khác trong userData
                address: {
                  ...prev.address, // Giữ nguyên các trường khác trong address
                  line2: e.target.value // Chỉ cập nhật line2
                }
              }))}
              value={userData.address.line2 || ''} // Đảm bảo tránh undefined
              type="text"
            />
          </p>
        : <p>{userData.address?.line1}
            <br />
            {userData.address?.line2}
          </p>
      }
        </div>
      </div>
      <div>
        <p className='text-neutral-600 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
        <p className='font-medium'>Gender: </p>
        {
        isEdit
        ? <select className='max-w-20 bg-gray-100' onChange={(e)=>setUserData(prev=>({...prev,gender:e.target.value}))}value={userData.gender}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        :<p className='text-gray-500'>{userData.gender}</p> 
      }
      <p className='font-medium'>Birthday:</p>
      {
        isEdit ? <input className='max-w-28 bg-gray-100' type='date' onChange={(e)=>setUserData(prev=>({...prev,dob:e.target.value}))}value={userData.dob}></input>
        : <p className='text-gray-500'>{userData.dob}</p>
      }
        </div>
      </div>
      <div className='mt-10'>
        {
          isEdit
          ?<button className='border border-gray-500 px-8 py-2 rounded-full hover:bg-primary hover:text-white' onClick={updateProfileData}>Save Information</button>:
          <button className='border border-gray-500 px-8 py-2 rounded-full hover:bg-primary hover:text-white' onClick={()=>setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile