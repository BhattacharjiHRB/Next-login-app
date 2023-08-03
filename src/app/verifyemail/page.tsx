"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import React,{useState, useEffect} from "react"



export default function VerifyEmailPage(){
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
           await axios.post('../api/users/verifyemail', {token} )
           setVerified(true)
        } catch (error:any) {
            setError(true)
            console.log(error.response.data);
            
        }
    }
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken ||"");
    },[])
    
    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail()
        }
        
    },[token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-5">
            <h1 className="text-4xl "> Verify Your Email</h1>
            <h3 className="p-2 bg-emerald-700 text-zinc-50 rounded-lg">{token ?`${token}`:"Not Verified"}</h3>

                {verified &&(
                    <div>

                        <h2 className="text-3xl">Email Verified</h2>
                        <Link href={'/login'}>Login</Link>
                    </div>
                )};
                {error &&(
                    <div> 
                        <h2 className="bg-red-500 p-5 text-black">Error Occurd</h2>
                    </div>
                )}

        </div>
    )
    
}