"use client";
import React, { useState, useEffect } from "react";
import { signOut, deleteUser } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getFirestore, doc, deleteDoc, getDoc } from "firebase/firestore";
import "./styles.css";

const Page = () => {
  const [user, setUser] = useState(null);
  const [accountDropdownVisible, setAccountDropdownVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");
  const [deleteButtonText, setDeleteButtonText] = useState("Delete Account");
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();
  const db = getFirestore();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return router.push("/");

      const userDocRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      setUser(currentUser);
      setUserEmail(userDoc.exists() ? userDoc.data().email : "");
    };

    fetchUser();
  }, [router, db]);

  const modifyImageUrlSize = (url, newSize) => {
    return url.replace(/s\d+-c/, `s${newSize}-c`);
  };

  const profileImageUrl = user
    ? modifyImageUrlSize(user.photoURL, 999)
    : "/default-avatar.svg";

  const animateEllipsis = () => {
    let step = 0;
    const steps = ["Deleting", "Deleting.", "Deleting..", "Deleting..."];

    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        setDeleteButtonText(steps[step]);
        step++;

        if (step === steps.length) {
          clearInterval(intervalId);
          setTimeout(() => {
            step = steps.length - 1;
            const reverseIntervalId = setInterval(() => {
              setDeleteButtonText(steps[step]);
              step--;

              if (step < 0) {
                clearInterval(reverseIntervalId);
                resolve();
              }
            }, 300);
          }, 600);
        }
      }, 300);
    });
  };

  const handleDeleteAccount = async () => {
    if (inputEmail == "") {
      setError("Please actually enter email ╰（‵□′）╯");
      return;
    }
    if (inputEmail !== userEmail) {
      setError("The email you entered does not match the account email.");
      return;
    }

    if (user) {
      try {
        setIsDeleting(true);
        await animateEllipsis();

        await Promise.all([
          deleteDoc(doc(db, "users", user.uid)),
          deleteUser(user),
        ]);

        setDeleteButtonText("Deleted!");
        router.push("/");
      } catch (error) {
        setError("An error occurred while deleting your account.");
        setDeleteButtonText("Delete Account");
      } finally {
        setIsDeleting(false);
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

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleHideClick = () => {
    setIsVisible(false);
    setError("");
  };

  return (
    <div className="main">
      <div className="nav-container w-full pt-4 h-auto flex justify-end pr-4 sm:pr-10">
        <nav className="flex">
          <button
            className="block h-10 w-10 sm:h-12 sm:w-12 focus:border-2 focus:border-gray-600 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none"
            onClick={toggleAccountDropdown}
          >
            <Image
              className="object-cover"
              src={profileImageUrl}
              alt="User Avatar"
              width={40}
              height={40}
            />
          </button>
          {accountDropdownVisible && (
            <div className="dropdown z-10 mr-2 mt-11 absolute right-0 py-2 w-48 sm:w-56 bg-white rounded-lg shadow-lg">
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
        <div className="bg-white p-8 rounded-lg shadow-lg mx-auto max-w-full sm:max-w-lg md:max-w-4xl">
          <div className="flex flex-col items-center">
            <h3 className="font-sans text-3xl sm:text-4xl pb-6 sm:pb-10">
              Hi, {user?.displayName}&nbsp;(*^_^*)
            </h3>
            <div className="border-black border-2 rounded-full text-white w-24 h-24 sm:w-32 sm:h-32">
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
          <div className="flex flex-col sm:flex-row justify-center sm:justify-around pt-12 sm:pt-20">
            <button
              onClick={handleSignOut}
              className="mb-4 sm:mb-0 transition ease-in-out hover:-translate-y-1 duration-300 w-36 sm:w-28 h-10 bg-black text-white font-bold py-2 rounded-lg hover:bg-transparent hover:text-black hover:border-black hover:border-2"
            >
              Sign Out
            </button>
            <button
              onClick={handleClick}
              className="transition ease-in-out hover:-translate-y-1 duration-300 w-44 sm:w-36 h-10 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-transparent hover:text-red-600 hover:border-red-600 hover:border-2"
            >
              Delete Account
            </button>
          </div>
          {isVisible && (
            <div className="fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center">
              <div className="bg-white p-4 rounded shadow-md w-11/12 sm:w-1/2 lg:w-1/3">
                <button onClick={handleHideClick} className="text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <p className="text-center p-4">
                  Are you sure you want to delete your account? This action is
                  irreversible.&nbsp;&nbsp;&nbsp;&nbsp;╯︿╰
                </p>
                <label className="pl-3 pb-1 text-sm text-red-400">
                  Please retype your email as verification
                </label>
                <input
                  className="placeholder-gray-500 shadow appearance-none border-2 border-black rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder={"-> " + user?.email + " <-"}
                />
                {error && (
                  <p className="text-red-500 text-xs italic py-2">{error}</p>
                )}
                <div className="flex justify-center">
                  <button
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className={`mt-5 transition ease-in-out hover:-translate-y-1 duration-300 w-48 h-10 ${
                      isDeleting
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-red-600"
                    } text-white font-bold py-2 rounded-lg hover:bg-transparent hover:text-red-600 hover:border-red-600 hover:border-2`}
                  >
                    {deleteButtonText}
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
