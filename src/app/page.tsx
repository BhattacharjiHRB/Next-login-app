import Link from "next/link";



export default function Home(){
    return (
        <main className="flex flex-col items-center justify-between p-24 gap-16">
           
                <h1 className="text-xl">Home</h1>
                <Link className=" p-5 rounded-2xl bg-red-700 hover:bg-rose-600 text-center text-black font-semibold"
                href={'/signup'}
                > 
                    Signup 
                </Link>

                <a className=" p-5 rounded-2xl bg-red-700 hover:bg-rose-600 text-center text-black font-semibold"
                href={'/login'}
                > 
                 login
                </a>
            
        </main>
    )
}