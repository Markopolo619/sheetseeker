"use client";
import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import './styles.css'

const Dashboard = () => {
  const [accountDropdownVisible, setAccountDropdownVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const router = useRouter();
  const user = auth.currentUser;

  const modifyImageUrlSize = (url, newSize) =>
    url.replace(/s(\d+)-c/, `s${newSize}-c`);

  const profileImageUrl = user ? modifyImageUrlSize(user.photoURL, 999) : "/default-avatar.svg";


  if (!user) {
    router.replace("/");
    return null;
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Sign Out Error:", error);
    }
  };

  const toggleAccountDropdown = () => {
    setAccountDropdownVisible(!accountDropdownVisible);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="main">
        <div className="nav-container w-full pt-4 h-auto flex flex-row justify-end pr-10">
        <nav className="flex flex-col pr-10">
          <button
            className="block focus:border-2 focus:border-gray-600 h-10 w-10 absolute rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none "
            onClick={toggleAccountDropdown}
          >
            <Image
              className="h-full w-full object-cover"
              src={profileImageUrl}
              alt="User Avatar"
              width={40}
              height={40}
            />
          </button>
          {accountDropdownVisible && (
            <div className="dropdown z-10 mr-2 mt-11 absolute right-0 py-2 w-48 bg-white rounded-lg shadow-lg">
              <Link
                href="/privacy"
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
              >
                T&Cs
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
              >
                Account Settings
              </Link>
              <button
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          )}
        </nav>
      </div>
         <div className="search-items">
          <div className="search-bar mt-10 flex flex-row justify-center w-full">
            <form className="w-6/12 mt-5">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-black"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="text-lg aspect-video bg-neutral-300 search-input block w-full h-14 p-4 ps-10  border-4 border-black placeholder-black text-black  rounded-xl outline-none"
                  placeholder="Search for files..."
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-3 bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-4 py-2 "
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="search-params flex flex-row justify-center pt-3">
            <nav className="flex flex-col pr-10">
              <button
                className="transition ease-in-out delay-150 hover:-translate-y-1 duration-300 focus:scale-110 hover:scale-110 justify-center mb-2 w-28 h-10 items-center btn-submit hover:bg-transparent border-black hover:text-black hover:border-2 text-white font-bold py-1 px-3 focus:outline-none focus:shadow-outline block focus:border-2 absolute bg-black rounded-lg"
                onClick={toggleDropdown}
              >
                Search By
              </button>
              {dropdownVisible && (
                <div className="dropdown z-10 mr-2 mt-11 absolute  py-2 w-48 bg-white rounded-lg shadow-lg">
                  <ul>
                    <li className="cursor-pointer block px-4 py-2 text-gray-800 hover:bg-gray-950 hover:text-white">
                      File Name
                    </li>
                    <li className="cursor-pointer block px-4 py-2 text-gray-800 hover:bg-gray-950 hover:text-white">
                      Column Heading
                    </li>
                    <li className="cursor-pointer block w-full text-left px-4 py-2 text-black hover:bg-gray-950 hover:text-white">
                      File Text
                    </li>
                  </ul>
                </div>
              )}
            </nav>
          </div>
        </div>

         <div className="mt-16 text-center mx-auto max-w-lg">
          <div className="authenticateDrivebtn mt-28 text-center">
            <button className=" bg-transparent  hover:bg-gray-300 text-black border-4 border-black font-bold py-3 px-3 rounded-lg">
            <Link
              className="flex"
              href=""
            >
              <svg
                className="mr-2"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              <p>Google Drive Coming Soon...</p>
            </Link>
            </button>
          </div>
        </div> *

      {/* Start of User Account Dropdown */}
    </div>
  );
};

export default Dashboard;
