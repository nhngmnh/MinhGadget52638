
import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
//import { get } from "mongoose";
export const AdminContext= createContext()
const AdminContextProvider=(props)=>{
    const [aToken,setAToken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    const [products,setProducts]=useState([])
    const [dashData, setDashData]=useState(false)
    const [carts, setCarts]=useState([])
    const [latestComments, setLatestComments]=useState([])
    const backendurl=import.meta.env.VITE_BACKEND_URL
    const getProducts=async()=>{
        try {
            const { data } = await axios.get(backendurl + '/api/admin/all-products', { headers: { aToken } });

            if (data.success){
                setProducts(data.products)
                console.log(data.products);
                
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const getCarts =async(req,res)=>{
        try {
            const {data}=await axios.get(backendurl+'/api/admin/all-carts',{headers:{aToken}})
            if (data){
                toast.success("Thành công")
                setCarts(data.carts)
            } else {
                res.json({message:"thatbai"})
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const getLatestComment= async(req,res)=>{
        try {
            const {data}=await axios.get(backendurl+'/api/admin/latest-comment',{headers:{aToken}})
            if (data){
                res.json({success:true,latestComment:data.latestComment});
                setLatestComments(data.latestComment)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const changeAvailability= async(itemId)=>{
        try {
            const {data}=await axios.post(backendurl+ '/api/admin/change-product-availability',{prID:itemId},{headers:{aToken}})
            if (data.success){
                toast.success(data.message)
            } else {
                console.log(data.message);
                
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            
            toast.error(error.message)
        }
    }
    const removeCart = async(cartId) => {
        try {
            const {data}= await axios.post(backendurl+`/api/admin/delete-cart/${cartId}`)
            if (!data){
                toast.error("No data")
            } 
            console.log(data.cart);
            setCarts(prevCarts => prevCarts.filter(cart => cart._id !== cartId));
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const getDashData= async()=>{
        try {
            const {data}=await axios.get(backendurl+'/api/admin/admin-dashboard',{headers:{aToken}})
            if (data.success){
                setDashData(data.dashData)
                console.log(data.dashData);
                
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const value={
        aToken,setAToken,
        backendurl,products,setProducts,
        getProducts,changeAvailability,
        dashData,getDashData,setDashData,
        carts, setCarts,
        latestComments, setLatestComments,
        getCarts, getLatestComment, removeCart
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider