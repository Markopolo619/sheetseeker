"use client";
import "./styles.css";
import React from "react";
import Link from "next/link";
import { useState} from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import Button from "@/app/components/auth-button";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
} from "@/app/firebase/config";
const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const allowedDomain = '@tdmc.co.za';
  const router = useRouter();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    /* Signup auth function*/
    e.preventDefault();
    setError(null); // Clear previous errors

    if (name === "") {
      setError("Please enter your name");
      return;
    }
    if (!emailRegex.test(email)) {
      // Check if email is valid
      setError("Invalid email format. Please enter a valid email address.");
      return;
    }
 if (password === "") {
  setError("Please enter a password");
  return;
 }
 if (repeatPassword === "") {
      // Check if repeat password is empty
      setError("Please confirm your password");
      return;
    }

    if (password !== repeatPassword) {
      // Check if passwords match
      setError("Passwords don't match. Please try again.");
      return;
    }

    if (password.length < 6) {
      // Check if password is at least 6 characters long
      setError("Password must be at least 6 characters long.");
      return;
    }



    try {
      // Try signing up
      setShowLoader(true); // Show loading spinner
      const userCredential = await createUserWithEmailAndPassword(
        // Sign up user with email and password
        auth,
        email,
        password
      );
      const user = userCredential.user; // Get user object

      await updateProfile(user, {
        // Update user profile
        displayName: name,
      });

      await setDoc(doc(db, "users", user.uid), {
        // Create user document in Firestore
        name: name,
        email: email,
        createdAt: new Date(),
      });

      
      console.log("User signed up and profile update:", user); // Log user object
      setShowLoader(false); // Hides loading spinner

      router.push("/dashboard"); // Redirects to dashboard upon a successful login
    } catch (error) {
      // Catches errors if any
      setShowLoader(false); // Hides loading spinner
      if (error.code === "auth/email-already-in-use") {
        // Check if email is already in use
        setError(
          "Email already exists. Please try again with a different email."
        );
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
      });

      console.log("User info saved to Firestore:", user);
      setGoogleLoading(false);
      router.push("/dashboard");
    } catch (error) {
      setGoogleLoading(false);
      console.error("Error signing in with Google:", error);
    }
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
  };

  return (
    // Signup form
    <div className="body">
      <div className="form w-full max-w-xs">
        <form
          onSubmit={handleFormSubmit} /* Signup auth function */
          className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4"
        >
          <p>Register your account</p>
          &nbsp;
          <div className="mb-4">
            {" "}
            {/* Name Label and input */}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Name
            </label>
            <input
              autoComplete="new-password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              value={name}
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
              
            />
          </div>
          <div className="mb-4">
            {" "}
            {/* Email label and input */}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Email
            </label>
            <input
            autoComplete="new-password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              placeholder="example@provider.com"
              onChange={(e) => setEmail(e.target.value)}

            />
          </div>
          <div className="mb-6">
            {" "}
            {/* Password label and input */}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              autoComplete="new-password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              placeholder="******************"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            {" "}
            {/* Repeat Password label and input */}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Repeat Password
            </label>
            <input
              autoComplete="new-password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="repeatPassword"
              type="password"
              value={repeatPassword}
              placeholder="******************"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          {error /* Display error message */ && (
            <div className="text-center mb-4">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}
          <div className="flex items-center justify-around pb-2">
            {" "}
            {/* Submit button */} {/* Submit button */}
            <Button
              text="Sign Up"
              onSubmit={handleSubmit}
              loading={showLoader}
              disabled={showLoader}
            />
          </div>
          <div className="flex items-center justify-around">
            <button // Google Sign Up Button 
            /* Google sign in button */
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="flex items-center bg-white hover:bg-gray-100 text-black border-2 border-black font-bold py-2 px-4 rounded-lg"
            >
              {googleLoading ? (
                <svg
                aria-hidden="true"
                role="status"
                className="inline mr-3 w-5 h-5 text-black animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                Loading
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                ></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                ></path>
              </svg>
              ) : (
                <>
                <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg>
<p>Sign Up With Google</p>
                </>
              )}
            </button>
          </div>
          <div className="flex justify-center items-center">
            {" "}
            {/* Have an account? Sign In link */}
            <Link
              className="inline-block py-2 align-baseline font-bold text-sm text-red-700 hover:text-black"
              href="/"
            >
              Have an account? Sign In
            </Link>
          </div>
        </form>
        <p className="copyright text-center text-white text-xs">
          {" "}
          {/* Copyright message */}
          &copy;2024 TDMC. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Page;
