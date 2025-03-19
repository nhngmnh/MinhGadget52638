import React, { useContext } from 'react'
import { useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
const Login = () => {
  const navigate=useNavigate();
  const {backendurl,token,setToken}= useContext(AppContext);
  const [state,setState]=useState('Sign Up');
  const [username, setUsername]=useState('');
  const [password, setPassword]=useState('');
  const [email, setEmail]=useState('');
  const onSubmitHandler= async(event)=>{
    event.preventDefault()
    try {
      if(state==='Sign Up'){
        const {data}=await axios.post(backendurl+'/api/user/register',{username,password,email})
        if (data && data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        } else {
          toast.error("k thành công")
        }
      } else {
        const {data}=await axios.post(backendurl+'/api/user/login',{password,email})
        if (data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
          console.log(data);
          
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
    
} 
useEffect(()=>{
  if (token){
      navigate('/')
  }
},[token])
  return (
    <div 
      className="bg-cover bg-center min-h-screen" 
      style={{ backgroundImage: `url(${assets.bg})` }}
    >

    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center '>
    <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl bg-white text-zinc-600 text-sm shadow-lg'>
      <p className='text-2xl font-semibold'>
        {state==='Sign Up'?"Create Account":"Login"}
      </p>
      <p>Please
      {state==='Sign Up'?" sign up":" login"} to book appointment</p>
      {
        state==="Sign Up" && <div className='w-full'>
        <p>Full Name</p>
        <input className='border border-zinc-500 rounde w-full p-2 mt-1' type="text" onChange={(e)=>setUsername(e.target.value) } value={username} required/>
      </div>
      }
      <div className='w-full'>
        <p>Email</p>
        <input className='border border-zinc-500 rounde w-full p-2 mt-1' type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required/>
      </div>
      <div className='w-full'>
        <p>Password</p>
        <input className='border border-zinc-500 rounde w-full p-2 mt-1'type="password" onChange={(e)=>setPassword(e.target.value) }value={password} required/>
      </div>
      <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer'>{state==='Sign Up'?"Create Account":"Login"} </button>
      {
      state==="Sign Up"
      ? <p>Already have an account? <span onClick={()=>setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
      : <p>Create a new account? <span onClick={()=>setState('Sign Up')}className='text-primary underline cursor-pointer'>Click here</span></p>
    }
    </div>
  </form>
  </div>
  )
}

export default Login