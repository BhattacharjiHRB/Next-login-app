"use client"

import Link from "next/link";
import React, { useState, useEffect } from 'react';
import {useRouter,} from "next/navigation";
import axios, {Axios} from "axios"
import toast from "react-hot-toast";
import Spinner from "../component/spinner";


export default function LoginPage(){
    const [user, setUser] = useState({
        email    : "",
        password : "",
        username : "",
    })
    
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter();


    const onLogin = async () => {
        try {
            setLoading(true)
           const response = await axios.post('../api/users/login', user)
           console.log("Login successful", response.data);
           toast.success("Login successful");
           router.push("/profile")
            
        } catch (error:any) {
            console.log("Failed to login", error.message);
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    

    useEffect(() => {
        if(user.password.length > 0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }

    },[user])

    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-5">

            <div className=" flex flex-col items-center justify-center rounded-xl shadow-lg bg-red-900 shadow-red-600 p-20 gap-5">

                <h1 className="justify-center text-2xl text-gray-200 py-5 font-bold">
                    Login
                </h1>
                <p>
                    {loading ? <Spinner/> : "Login Here" }
                </p>
                <hr/>
                <input className=" items-center border border-gray-700  bg-transparent focus:outline-none focus:border-gray-500 py-3 placeholder:px-2" 
                id="username" 
                type="text" 
                value={user.username} 
                onChange={(e)=> setUser({...user , username: e.target.value})}
                placeholder="Username"/>
                
                <input className=" items-center border border-gray-800  bg-transparent focus:outline-none focus:border-gray-500 py-3 placeholder:px-2" 
                id="password" 
                type="password" 
                value={user.password} 
                onChange={(e)=> setUser({...user , password: e.target.value})}
                placeholder="Password"/>

                <button 
                onClick={onLogin}
                className="bg-gradient-to-r from-red-700 to-gray-700 hover:from-gray-700 hover:to-red-700 text-white font-semibold py-2 px-4 rounded">
                {buttonDisabled ? "Can't Login 🥲": "Login 😁"}
                </button>

                <Link href="/signup"
                className="text-center text-sm">
                    Create an Account
                </Link>

            </div>


        </div>
    )
}