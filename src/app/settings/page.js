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
  const [dropdownVisible, setDropdownVisible] = useState(false);

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
  const profileImageUrl = modifyImageUrlSize(user.photoURL, 900);

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
      <main className="mt-10">
        <div className="bg-white content-center p-8 rounded-lg shadow-lg max-w-4xl mx-auto my-8">
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
          
        </div>
      </main>
    </div>
  );
};

export default Page;
