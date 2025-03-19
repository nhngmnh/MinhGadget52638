import { createContext, useEffect,useState } from "react";
import axios from 'axios'
import {toast} from "react-toastify"
export const AppContext=createContext()
import { products } from "../assets/assets";
const AppContextProvider=(props)=>{
    const currencySymbol='$'
    const backendurl=import.meta.env.VITE_BACKEND_URL
    const [userData,setUserData]=useState(false)
    const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false);
    const [products,setProducts]=useState([]);
    const getProductsData = async ()=>{
        try {
            const {data}=axios.get(backendurl+'/api/user/get-products')
            if (data.success) {
                setProducts(data.products);
                console.log(data.products);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getUserData=async()=>{
        try {
            const {data}= axios.get(backendurl+'/user/get-profile')
            if (data.success) {
                setUserData(data)
                console.log(userData);
                
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const value={
        products,
        setProducts,
        token,setToken,
        currencySymbol,
        userData, 
        setUserData, 
        getUserData,
        getProductsData,
    }
    
    useEffect(()=>{
        getProductsData()
    },[])
    useEffect(()=>{
        if (token){
            getUserData()
        } else {
            setUserData(false)
        }
    },[token])
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider