
import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
//import { get } from "mongoose";
export const AdminContext= createContext()
const AdminContextProvider=(props)=>{
    const [aToken,setAToken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    const [products,setProducts]=useState([])
    const [dashData, setDashData]=useState(false)
    const backendurl=import.meta.env.VITE_BACKEND_URL
    const getProducts=async()=>{
        try {
            const{data}=await axios.get(backendurl+'/api/admin/get-products',{},{headers:{aToken}})
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
    const changeAvailability= async(itemId)=>{
        try {
            const {data}=await axios.post(backendurl+ '/api/admin/change-availability',{itemId},{headers:{aToken}})
            if (data.success){
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
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
        backendurl,products,
        getProducts,changeAvailability,
        dashData,getDashData,setDashData
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider