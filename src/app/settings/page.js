"use client";
import React, { useState, useEffect } from "react";
import { signOut, deleteUser, getAuth } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getFirestore, doc, deleteDoc, getDoc } from 'firebase/firestore';
import "./styles.css";

const Page = () => {
  const [user, setUser] = useState(null); // Initialize user state
  const [accountDropdownVisible, setAccountDropdownVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [inputEmail, setInputEmail] = useState(''); // Input email state
  const [userEmail, setUserEmail] = useState(''); // Store email from Firestore
  const [error, setError] = useState(''); // Error state for email mismatch

  const router = useRouter();
  const db = getFirestore();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;
      setUser(currentUser);
      
      // Redirect if no user is found
      if (!currentUser) {
        router.push('/');
      } else {
        // Fetch email from Firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserEmail(userDoc.data().email); // Assuming Firestore stores email
        } else {
          console.error('No user document found.');
        }
      }
    };
    
    fetchUser();
  }, [router, db]);

  const modifyImageUrlSize = (url, newSize) => {
    return url.replace(/s\d+-c/, `s${newSize}-c`);
  };

  const profileImageUrl = user ? modifyImageUrlSize(user.photoURL, 999) : "/default-avatar.svg";

  const handleDeleteAccount = async () => {
    // Prevent deletion if emails do not match
    if (inputEmail !== userEmail) {
      setError('The email you entered does not match the account email.');
      return;
    }

    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        await deleteDoc(userDocRef);  // Delete user data from Firestore
        await deleteUser(user);       // Delete user account from Firebase Auth

        router.push('/');
        console.log('User account and data deleted successfully.');
      } catch (error) {
        console.error('Error deleting user account:', error);
        setError('An error occurred while deleting your account.');
      }
    }
  };

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
    setError(''); // Clear error when closing the modal
  };

  return (
    <div className="main">
      <div className="nav-container w-full pt-4 h-auto flex flex-row justify-end pr-10">
        <nav className="flex flex-col pr-10">
          <button
            className="block focus:border-2 focus:border-gray-600 h-10 w-10 absolute rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none"
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
      <main className="mt-10 pt-8">
        <div className="bg-white md:max-w-4xl sm:max-w-2xl content-center p-8 rounded-lg shadow-lg mx-auto">
          <div className="flex flex-col items-center">
            <h3 className="font-sans text-4xl pb-10">Hi, {user?.displayName}</h3>
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
              Sign Out
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
              <div className="bg-white flex flex-col rounded shadow-md p-4 w-[30%]">
                <button onClick={handleHideClick} className="text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <p className="text-center p-4">
                  Are you sure you want to delete your account? This action is irreversible.
                </p>
                <label className="pl-3 pb-1 text-sm text-red-400 ">
                  Please retype your email as verification
                </label>
                <input
                  className="shadow appearance-none border-2 border-black rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder={user?.email || ""}
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <div className="btn flex flex-col items-center pt-6">
                  <button onClick={handleDeleteAccount} className="w-full transition ease-in-out delay-150 hover:-translate-y-1 duration-300 focus:scale-100 hover:scale-100 h-10 hover:bg-transparent hover:border-red-600 hover:text-red-600 hover:border-2 text-white font-bold py-1 focus:outline-none focus:shadow-outline block focus:border-2 bg-black rounded-lg">
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
