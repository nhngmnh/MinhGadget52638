import { createContext, useEffect,useState } from "react";
import axios from 'axios'
import {toast} from "react-toastify"
export const AppContext=createContext()
const AppContextProvider=(props)=>{
    const [search,setSearch]=useState('')
    const currencySymbol='$'
    const backendurl=import.meta.env.VITE_BACKEND_URL
    const [userData,setUserData]=useState(false)
    const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false);
    const [products,setProducts]=useState([]);
    const [cart,setCart]=useState([]);
    const [replies,setReplies] =useState([])
    const [comments,setComments]=useState([])
    const getComments = async ()=>{
        try {
            const {data}=await axios.get(backendurl+'api/user/get-comments',{headers:{token}});
            if (!data) toast.warn("No comment or error connect server");
            setComments(data.comments);
        } catch (error) {
            toast.error(error.message);
            console.log(error);
            
        }
    }
    const getRepliesByUser = async ()=>{
        try {
            const {data}=await axios.get(backendurl+'/api/user/get-replies',{headers:{token}})
            if (!data) toast.warn("No replies yet or Error connect server")
            setReplies(data.replies)
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const getProductsData = async ()=>{
        try {
            const {data}= await axios.get(backendurl+'/api/user/get-products')
            if (data && data.success) {
                setProducts(data.products);
                console.log(data.products);
            } else {
                toast.error("chả thấy data nảo cả")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getUserData=async()=>{
        try {
            const {data}= await axios.get(backendurl+'/api/user/get-profile',{headers:{token}})
            if (data.success) {
                setUserData(data.userData)
                console.log(data.userData);
                
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
        
    const value={
        search,
        setSearch,
        products,
        setProducts,
        token,setToken,
        currencySymbol,
        userData, 
        setUserData, 
        getUserData,
        getProductsData,
        backendurl,
        getRepliesByUser, replies,setReplies,
        comments, getComments, setComments
    }
    
    useEffect(()=>{
        getProductsData()
    },[])
    useEffect(()=>{
        if (token){
            getUserData();
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