'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useRouter } from "../../node_modules/next/navigation";

export default function Home() {

  const token = Cookies.get('token');

  const router = useRouter();

  useEffect(() => {

      if(!Cookies.get('is_login')) {
          router.push('/login');
      }      

   
  }, []);

  const logoutHanlder = async () => {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/logout`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      )
      .then(() => {

          Cookies.remove("is_login");
          Cookies.remove("token");
          Cookies.remove("name");
          Cookies.remove("username");
          Cookies.remove("email");

          router.push('/login');
      });
  };


  return (
    <>
      <header className="bg-cyan-500 shadow-xl shadow-cyan-500/50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Next Auth JWT</span>
              <img className="h-8 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </a>
          </div>
          <div className="flex flex-1 justify-end">
            <a onClick={logoutHanlder} className="text-sm/6 font-semibold text-white hover:text-indigo-600">Logout <span aria-hidden="true">&rarr;</span></a>
          </div>
        </nav>
      </header>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-2 gap-16 sm:p-2 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          SELAMAT DATANG
        </main>
      </div>
    </>
  );
}
