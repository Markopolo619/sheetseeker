"use client";
import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Dashboard = () => {
  const [accountDropdownVisible, setAccountDropdownVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const router = useRouter();

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
    <div className="container">
      <>
        <div className="nav-container w-full pt-4 h-auto flex flex-row justify-end pr-10">
          <nav className="flex flex-col pr-10">
            <button
              className="block focus:border-2 focus:border-gray-600 h-10 w-10 absolute rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none "
              onClick={toggleAccountDropdown}
            >
              <Image
                className="h-full w-full object-cover"
                src={"/userAccount.svg"}
                alt="User Avatar"
                width={40}
                height={40}
              />
            </button>
            {accountDropdownVisible && (
              <div className="dropdown z-10 mr-2 mt-11 absolute right-0 py-2 w-48 bg-white rounded-lg shadow-lg">
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                >
                  Account Settings
                </Link>
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
                  className="aspect-video bg-neutral-300 search-input block w-full h-14 p-4 ps-10 text-sm border-4 border-black placeholder-black text-black  rounded-xl outline-none"
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
          <div className="search-params flex justify-center pt-3">
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
        <div className="mt-16 mx-auto max-w-md"></div>
      </>

      {/* Start of User Account Dropdown */}
    </div>
  );
};

export default Dashboard;
