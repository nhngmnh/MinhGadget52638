
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
    const [comments, setComments]=useState([])
    const [replies,setReplies]=useState([])
    const [search,setSearch]=useState('')
    const [filterProducts,setFilterProducts]=useState([])
    const backendurl=import.meta.env.VITE_BACKEND_URL
    const getProducts=async()=>{
        try {
            const { data } = await axios.get(backendurl + '/api/admin/all-products', { headers: { aToken } });

            if (data.success){
                setProducts(data.products)  
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
                setCarts(data.carts)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const getComments= async(req,res)=>{
        try {
            const {data}=await axios.get(backendurl+'/api/admin/comments',{headers:{aToken}})
            if (data){
                setComments(data.comments)
                
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const changeAvailability= async(itemId)=>{
        try {
            const {data}=await axios.post(backendurl+ '/api/admin/change-product-availability',{productId:itemId},{headers:{aToken}})
            if (data.success){
                toast.success(data.message)
            } else {       
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            
            toast.error(error.message)
        }
    }
    const removeCart = async(cartId) => {
        try {  
            const {data}= await axios.post(backendurl+`/api/admin/delete-cart/${cartId}`,{},{headers:{aToken}})
            if (!data){
                toast.error("No data")
            } 
            console.log(data);
            setCarts(prevCarts => prevCarts.filter(cart => cart._id !== cartId));
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const changeBestsellerStatus = async (productId)=>{
        try {
            const {data}= await axios.post(backendurl+'/api/admin/change-bestseller-status',{productId:productId},{headers:{aToken}})
            if (!data){
                toast.error("Can't find data");
            }
            else {
                toast.success('Change bestseller status successfully')
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
                
            } else {
                toast.error(data.message)
                console.log(data.headers);
                
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const getAllReplies = async ()=>{
        try {
            const {data}=await axios.get(backendurl+'/api/admin/all-replies',{headers:{aToken}});
            if (!data){
                toast.error("No data");
            }
            setReplies(data.replies);
           
            
        } catch (error) {
            toast.error(error.message);
            console.log(error);
            
        }
    }
    const replyComment = async (commentId, text) => {
        try {
          const x = await axios.post(backendurl + '/api/admin/reply', { commentId, text }, {
            headers: { aToken }
          });
          if (!x) {
            toast.error("Can't reply");
            return null; // nếu lỗi thì return null
          }
          toast.success("Reply successfully");
          return x; // return data để hàm gọi bên ngoài biết thành công
        } catch (error) {
          toast.error(error.message);
          console.log(error);
          throw error; // ném lỗi ra ngoài để try/catch ở nơi gọi xử lý
        }
      };
    const editReply= async (replyId,text)=>{
        try {
            const {data}=await axios.post(backendurl+'/api/admin/update-reply',{replyId,text},{headers:{aToken}})
            if (!data) toast.error("Can't find data");
            else toast.success("Edit successfully")
        } catch (error) {
            toast.error(error.message)
        }
    }
    const deleteReply = async (replyId) => {
        try {
            const { data } = await axios.post(
                backendurl + '/api/admin/remove-reply',
                { replyId },
                { headers: { aToken } }
            );
    
            if (!data) {
                toast.error("Can't find data");
            } else {
                toast.success("Reply removed successfully");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    const changeCartStatus = async (cartId, status) => {
        try {
          const response = await axios.post(`${backendurl}/api/admin/change-cart-status`, {
            cartId,
            status,
          }, {
            headers: { aToken },
          });
      
          if (response.data.success) {
            toast.success(response.data.message);
            return true;
          } else {
            toast.error(response.data.message || "Failed to change status");
            return false;
          }
        } catch (error) {
          console.error("Error changing cart status:", error);
          toast.error("Server Error");
          return false;
        }
      };
    const notifyChangeStatusCart= async (cart) =>{
        try {
            await axios.post(backendurl+'/api/admin/create-notification',{
                userId:cart.userId,
                text:cart.text,
                createAt:Date.now(),
                isRead:false,
            },{headers:{aToken}})
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const createReplyNotification = async (userId,replyText, productName) => {
        try {
          const x= await axios.post(
            `${backendurl}/api/admin/create-notification`,
            { userId, text:`The admin replied your comment in ${productName} page: ${replyText}.`},  // Truyền các tham số vào
            { headers: { aToken } }
          );
        } catch (error) {
          console.error('Failed to create notification', error);
          toast.error('Error sending notification');
        }
      };

    const deleteUser = async (userId)=>{
        try {
            await axios.post(backendurl+'/api/admin/delete-user',{userId},{headers:{aToken}});
            toast.success("Delete user successfully!");
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const value={
        aToken,setAToken,
        backendurl,products,setProducts,
        getProducts,changeAvailability,
        dashData,getDashData,setDashData,
        carts, setCarts,search,setSearch,filterProducts,setFilterProducts,
        comments, setComments,
        getCarts, getComments, removeCart,
        changeBestsellerStatus,
        replies,setReplies,getAllReplies,
        replyComment,deleteReply,editReply,changeCartStatus,
        notifyChangeStatusCart,createReplyNotification,
        deleteUser
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider