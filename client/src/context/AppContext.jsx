import {  createContext, useEffect, useState } from "react";
import axios from 'axios'

export const AppContext = createContext();

const AppContextProvider = ({children})=>{
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false);
    const [userData,setUserData] = useState(false)


    const loadUserProfileData = async ()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/user/get-profile',{headers: { Authorization: `Bearer ${token}` }})
            if(data.success){
                setUserData(data.userData)
            }else{
                console.error(data.error)
            }
        } catch (error) {
            console.error(error.message || "An Error Occurred while profile")
        }
    }
    const value ={
        token,
        setToken,
        userData,
        setUserData,
        loadUserProfileData,
        backendUrl
    }

    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }else{
            setUserData(false)
        }
    },[token])

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;
