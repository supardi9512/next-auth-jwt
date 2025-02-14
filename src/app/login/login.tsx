'use client'

import Link from "next/link";
import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "../../../node_modules/next/navigation";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import Cookies from 'js-cookie';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //define state validation
    const [validation, setValidation] = useState([]);

    const router = useRouter();

    // const submitLogin = async (e: SyntheticEvent) => {
    //     e.preventDefault();
    //     setPending(true);

    //     try {
    //         const res = await fetch('http://localhost:8000/api/login', {
    //             method: "POST",
    //             headers: {'Content-Type': 'application/json'},
    //             body: JSON.stringify({
    //                 username,
    //                 password
    //             })
    //         });

    //         const content = await res.json();

    //         if (content?.code != 200) {
    //             console.log('res error :::: ',res)
    //             setErrorMessage(content.message);
    //             setPending(false);
    //         } else {
    //             setPending(false);
    //             await router.push('/');      
    //         }
    //     } catch (error) {
    //         console.error("Login error:", error);
    //         setErrorMessage("An error occurred during login");
    //         setPending(false);
    //     }
    // }

    //function "loginHanlder"
    const loginHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
     
        //send data to server
        await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/login`, 
            JSON.stringify({
                username,
                password,
            }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then((response: any) => {

            Cookies.set('is_login', true);
            Cookies.set('token', response.data.data.token);
            Cookies.set('name', response.data.data.name);
            Cookies.set('username', response.data.data.username);
            Cookies.set('email', response.data.data.email);

            router.push('/');
        })
        .catch((error: any) => {
            setValidation(error.response.data);
        })
    };

    //hook useEffect
    useEffect(() => {
        if(Cookies.get('is_login')) {
            router.push('/');
        }
    }, []);

    return (
        <>
            <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-2 gap-16 sm:p-2 font-[family-name:var(--font-geist-sans)]">
                <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                    <div className="flex flex-col justify-center p-6 lg:px-20 lg:py-10 rounded-lg bg-cyan-500 shadow-xl shadow-cyan-500/50">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Next Auth JWT" />
                            <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                        </div>
            
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" onSubmit={loginHandler}>
                                {
                                    validation.message && (
                                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">      
                                            <p className="font-bold">Error!</p>
                                            <p>{validation.message}</p>
                                        </div>
                                    )
                                }
                                <div>
                                    <label htmlFor="username" className="block text-sm/6 font-medium text-white">Username</label>
                                    <div className="mt-2">
                                        <input type="text" name="username" id="username" placeholder="Input Username" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-800 border -border-offset-1 border-gray-300 placeholder:text-gray-400 focus:-border-offset-2 focus:border-indigo-600 sm:text-sm/6" 
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>
                
                                <div>
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-white">Password</label>
                                    <div className="mt-2">
                                        <input type="password" name="password" id="password" placeholder="Input Password" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-800 border -border-offset-1 border-gray-300 placeholder:text-gray-400 focus:-border-offset-2 focus:border-indigo-600 sm:text-sm/6" 
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                
                                <div>
                                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                                </div>
                            </form>
                
                            <p className="mt-10 text-center text-sm/6 text-white">
                                Not a member?
                                <Link href="/register">
                                    <span className="ml-2 font-semibold text-indigo-600 hover:text-indigo-500">Register!</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}