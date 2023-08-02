'use client'
import Link from "next/link"


export default function UserProfile({params}:any): React.JSX.Element{


    


    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex flex-col rounded-xl shadow-xl bg-red-950 shadow-red-600 p-20">
                <div className=" flex flex-col justify-center items-center">
                    <img 
                    className=" h-56 rounded-xl mb-24"
                    src="https://images.unsplash.com/photo-1608889175123-8ee362201f81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80" 
                    alt="profile pic" />
                </div>
             <Link className=" py-5 rounded-2xl bg-red-700 hover:bg-rose-600 text-center text-black font-semibold"
                href={'/'}
                > 
                  Home
                </Link>
                <p className="text-4xl mt-10">Profile <span className="p-3 rounded-xl bg-rose-500 text-black font-bold">{params.id}</span>
                </p>
                
            </div>
        </div>
    )
};