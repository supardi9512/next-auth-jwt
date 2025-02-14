'use client'

import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "../../../node_modules/next/navigation";
import axios from "axios";

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [validation, setValidation] = useState([]);

    const router = useRouter();

    // const submitRegister = async (e: SyntheticEvent) => {
    //     e.preventDefault();

    //     await fetch('http://localhost:8000/api/register', {
    //         method: "POST",
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({
    //             name,
    //             email,
    //             username,
    //             password
    //         })
    //     });

    //     await router.push('/login');
    // }

    const registerHandler = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post(`${
            process.env.NEXT_PUBLIC_API_BACKEND}/api/register`, 
            JSON.stringify({
                name,
                email,
                username,
                password,
                confirmPassword
            }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(() => {
            router.push('/login')
        })
        .catch((error: any) => {
            setValidation(error.response.data);
        })

    };

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
                            <form className="space-y-6" onSubmit={registerHandler}>
                                {
                                    validation.message && (
                                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">      
                                            <p className="font-bold">Error!</p>
                                            <p>{validation.message}</p>
                                        </div>
                                    )
                                }
                                <div>
                                    <label htmlFor="name" className="block text-sm/6 font-medium text-white">Name</label>
                                    <div className="mt-2">
                                        <input type="text" name="name" id="name" placeholder="Input Name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-800 border -border-offset-1 border-gray-300 placeholder:text-gray-400 focus:-border-offset-2 focus:border-indigo-600 sm:text-sm/6" 
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm/6 font-medium text-white">Email</label>
                                    <div className="mt-2">
                                        <input type="text" name="email" id="email" placeholder="Input Email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-800 border -border-offset-1 border-gray-300 placeholder:text-gray-400 focus:-border-offset-2 focus:border-indigo-600 sm:text-sm/6" 
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

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
                                    <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-white">Confirm Password</label>
                                    <div className="mt-2">
                                        <input type="password" name="confirm_password" id="confirmPassword" placeholder="Input Confirm Password" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-800 border -border-offset-1 border-gray-300 placeholder:text-gray-400 focus:-border-offset-2 focus:border-indigo-600 sm:text-sm/6" 
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                
                                <div>
                                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
                                </div>
                            </form>
                
                            <p className="mt-10 text-center text-sm/6 text-white">
                                Already have an account?
                                <Link href="/login">
                                    <span className="ml-2 font-semibold text-indigo-600 hover:text-indigo-500">Login!</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}