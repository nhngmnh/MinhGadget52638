import { createContext, useEffect,useState } from "react";
import axios from 'axios'
import {toast} from "react-toastify"
export const AppContext=createContext()

const AppContextProvider=(props)=>{
    const currencySymbol=' VNĐ'
    
    const [user,setUser]=useState()
    const user1={
      email: 'nhungocminh2004@gmail.com',
      name:'Nhu Ngoc Minh',
      phone: '862613118',
      address:'An Thi, Hung Yen',
      gender:'Male',
      birthday:'22/03/2004'

    }
//    const [userData,setUserData]=useState(false)
    
    const getUsersData= ()=>{
        setUser(user1);
    }
    const value={
        user, setUser, getUsersData

    }
    
    useEffect(()=>{
        getUsersData();
    },[])
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider