import express from 'express';
import connectDB from '../config/connectDB.js';
import userModel from '../models/userModel.js'
import validator from 'validator'
import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import {toast} from 'react-toastify'
const registerUser = async (req,res) =>{
try {
    connectDB();
    const {name,email,password}=req.body 
    if (!name || !email || !password){
        return res.json({success:false,message:"Missing Details"}) // missing sth
    }
    if (!validator.isEmail(email)) // invalid email
    {
        return res.json({success:false,message:"Invalid email"})
    }
    if (password.length<8){  //weak password
        return res.json({success:false,message:"Please enter strong password"}) 
    }
    // HAShing USER PASSWORD
    const salt = await bycrypt.genSalt(10)
    const hashedPassword=await bycrypt.hash(password,salt)
    const userData={
        name,
        email,
        password:hashedPassword
    }
    const newUser= new userModel(userData)
    const user= await newUser.save()
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.json({success:true,token})
} catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
}}
//API for user login
const loginUser=async(req,res)=>{
try {
    const {email,password}=req.body
    const user=await userModel.findOne({email})
    if (!user){
        return res.json({success:false,message:"User do not exist"})
    }
    const isMatch= await bycrypt.compare(password,user.password)
    if (isMatch)
    {
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
         return res.json({success:true,token})
    } else {
        return res.json({success:false,message:"Invalid credentials"})
    }
} catch (error) {
    console.log(error)
     return res.json({success:false,message:error.message})
}
}
export {
    registerUser,loginUser
}