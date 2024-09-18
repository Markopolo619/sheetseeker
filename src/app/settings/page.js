"use client";
import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "./styles.css";

const Page = () => {
  const user = auth.currentUser; // Get the current user
  const [accountDropdownVisible, setAccountDropdownVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter();

  // Function to modify the profile image size in the URL
  const modifyImageUrlSize = (url, newSize) => {
    return url.replace(/s\d+-c/, `s${newSize}-c`);
  };

  // If no user is authenticated, redirect to the sign-up page
  if (!user) {
    router.replace("/");
    return null;
  }

  // Modify the profile image URL only if the user is available
  const profileImageUrl = modifyImageUrlSize(user.photoURL, 999);

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

  const handleclick = () => {
    setIsVisible(!isVisible);
  };

  const handleHideClick = () => {
    setIsVisible(false);
  }

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
              src={"/userAccount.svg"}
              alt="User Avatar"
              width={40}
              height={40}
            />
          </button>
          {accountDropdownVisible && (
            <div className="dropdown z-10 mr-2 mt-11 absolute right-0 py-2 w-48 bg-white rounded-lg shadow-lg">
              <Link
                href="/dashboard"
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
              >
                Dashboard
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
      <main className="mt-10 pt-2">
        <div className="bg-white w-[60vw] content-center p-8 rounded-lg shadow-lg mx-auto">
          <div className="flex flex-col items-center">
            <h3 className="font-sans text-4xl pb-10">Hi, {user.displayName}</h3>
            <div className="border-black border-2 rounded-full text-white w-32 h-32">
              <Image
                src={profileImageUrl}
                width={128}
                height={128}
                layout="responsive"
                className="rounded-full"
                alt="User Profile Photo"
              />
            </div>
          </div>
          <div className="flex flex-row justify-around pt-20">
            <button onClick={handleSignOut} className="transition ease-in-out delay-150 hover:-translate-y-1 duration-300 focus:scale-110 hover:scale-110  w-28 h-10 hover:bg-transparent border-black hover:text-black hover:border-2 text-white font-bold py-1 px-3 focus:outline-none focus:shadow-outline block focus:border-2 bg-black rounded-lg">
              Log Out
            </button>
            <button
              onClick={handleclick}
              className="transition ease-in-out delay-150 hover:-translate-y-1 duration-300 focus:scale-110 hover:scale-110 w-36 h-10 hover:bg-transparent hover:border-red-600 hover:text-red-600 hover:border-2 text-white font-bold py-1 focus:outline-none focus:shadow-outline block focus:border-2 bg-red-600 rounded-lg"
            >
              Delete Account
            </button>
          </div>
          {isVisible && (
            <div className="fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center">
              <div className="bg-white flex flex-col rounded shadow-md p-4 w-[30%] ">
                <button onClick={handleHideClick} className="text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <p className="text-center p-4">
                  Are you sure you want to delete your account? This action is
                  irreversible.
                </p>
                <label className="pl-3 pb-1 text-sm text-red-400 ">
                  Please retype your email as verification
                </label>
                <input
                  className=" shadow appearance-none border-2 border-black rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder={user.email}
                />
                <div className="btn flex flex-col items-center pt-6">
                  <button className="w-full transition ease-in-out delay-150 hover:-translate-y-1 duration-300 focus:scale-100 hover:scale-100 h-10 hover:bg-transparent hover:border-red-600 hover:text-red-600 hover:border-2 text-white font-bold py-1 focus:outline-none focus:shadow-outline block focus:border-2 bg-black rounded-lg">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;
