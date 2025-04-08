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
    const [myReplies,setMyReplies]=useState([])
    const [comments,setComments]=useState([])
    const getComments = async ()=>{
        try {
            const {data}=await axios.get(backendurl+'/api/user/get-comments',{headers:{token}});
            if (!data) toast.warn("No comment or error connect server");
            setComments(data.comments);
        } catch (error) {
            toast.error(error.message);
            console.log(error);
            
        }
    }
    const getRepliesByUser = async ()=>{
        try {
            const {data}=await axios.get(backendurl+'/api/user/get-my-replies',{headers:{token}})
            if (!data) toast.warn("No replies yet or Error connect server")
            setMyReplies(data.replies);
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const getAllReplies = async ()=>{
        try {
            const {data}=await axios.get(backendurl+'/api/user/get-all-replies',{headers:{token}})
            if (!data) toast.warn("No replies yet or Error connect server")
            setReplies(data.replies);
            
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
    
    useEffect(() => {
        const fetchInitialData = async () => {
          try {
            await Promise.all([
              getProductsData(),
              getAllReplies()
            ]);
          } catch (error) {
            console.error("Error fetching initial data", error);
          }
        };
      
        fetchInitialData();
      }, []);
      
      useEffect(() => {
        const fetchUserData = async () => {
          if (token) {
            await getUserData();
          } else {
            setUserData(false);
          }
        };
      
        fetchUserData();
      }, [token]);
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider