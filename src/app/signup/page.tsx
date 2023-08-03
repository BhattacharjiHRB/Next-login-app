"use client"

import Link from "next/link";
import React, { useState, useEffect } from 'react';
import {useRouter} from "next/navigation";
import axios from "axios"
import {toast} from "react-hot-toast";
import Spinner from "../component/spinner";


export default function SignupPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({

        email    : "",
        password : "",
        username : "",

    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    
    const onSignup = async () => {
        try {
            setLoading(true);

           const response =  await axios.post('../api/users/signup',user)
           console.log("signup successful", response.data)
            router.push("/login");

        } catch (error: any) {
            console.log("Failed to Signup", error);

            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.password.length >0){
            setButtonDisabled(false)
        }
        else{
            setButtonDisabled(true);
        }
   },[user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-5">
            <div className="flex flex-col items-center justify-center rounded-xl shadow-lg bg-red-900 shadow-red-600 p-20 gap-5">
            <h1 className="justify-center text-2xl text-zinc100 py-4">SignUp</h1>
            <p>
                {loading ? <Spinner /> : "Welcome to my App"}
            </p>
            <hr/>

            <input className=" items-center border border-gray-800  bg-transparent focus:outline-none focus:border-gray-600 py-3 placeholder:px-2" 
            id="username" 
            type="text" 
            value={user.username} 
            onChange={(e)=> setUser({...user , username: e.target.value})}
            placeholder="Username"/>
            
            <input className=" items-center border border-gray-800  bg-transparent focus:outline-none focus:border-gray-600 py-3 placeholder:px-2" 
            id="email" 
            type="text" 
            value={user.email} 
            onChange={(e)=> setUser({...user , email: e.target.value})}
            placeholder="email"/>

            <input className=" items-center border border-gray-800  bg-transparent focus:outline-none focus:border-gray-600 py-3 placeholder:px-2" 
            id="password" 
            type="password" 
            value={user.password} 
            onChange={(e)=> setUser({...user , password: e.target.value})}
            placeholder="Password"/>

            <button 
                onClick={onSignup}
                className="px-5 py-3 bg-gradient-to-r from-red-700 to-gray-700 hover:from-gray-700 hover:to-red-700 text-white font-semibold rounded" >
                    {buttonDisabled ? "Can't Signup 🥲" : "Signup 😁"}
            </button>

            <Link href="/login"
            className="text-center text-sm "> 
                Login To Access Web
            </Link>

            </div>
        </div>
    )
}


