"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage(){
    
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async () =>{
        try {
            await axios.get('../api/users/logout')
            toast.success("Logout Successfully!");
            router.push('/');
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async () =>{
       const fes = await axios.get('../api/users/me')
       console.log(fes.data);
       setData(fes.data.data._id);
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl text-blue-500">Profile</h1>
            <h2>
                {data ==='nothing' ? "Nothing": 
                <Link 
                    href = {`/profile/${data}`}> 
                    {data}
                </Link> } 
            </h2>
            
            <button 
                onClick = {logout}
                className=" p-2 m-10 border border-rose-700 rounded-xl hover:bg-rose-300 hover:text-black" type="submit"> 
                    Logout
            </button>
            <button 
                onClick = {getUserDetails}
                className=" p-2 m-10 border border-emerald-800 rounded-xl hover:bg-emerald-600 hover:text-black" type="submit"> 
                   User Details
            </button>
        </div>
    )
};