
import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const Login = () => {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const {setAToken,backendurl}=useContext(AdminContext)
    const onSubmitHandler =async(event) =>{
        event.preventDefault()
        try {
                console.log(backendurl);
                
                const {data}=await axios.post(backendurl+'/api/admin/login',{email,password})
                if (data.success){
                    
                    localStorage.setItem('aToken',data.token)
                    setAToken(data.token)}
                
             else {
                toast.error(data.message)}
             
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
       <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-gray-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'>
        <span className='text-primary'>Admin</span>     Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-gray-100 rounded w-full p-2 mt-1' type="email" required/>
            </div>
            <div className='w-full'>
                <p> Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-gray-100 rounded w-full p-2 mt-1' type="password" required/>
            </div>
            <button className='bg-primary text-white w-full py-2 rounded-md text-base bg-blue-500 mt-6'>Login</button>
       </div>
    </form>
  )
}
export default Login