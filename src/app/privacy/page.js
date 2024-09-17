"use client";
import React, { useState } from "react";
import "./styles.css";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const [accountDropdownVisible, setAccountDropdownVisible] = useState(false);

  const toggleAccountDropdown = () => {
    setAccountDropdownVisible(!accountDropdownVisible);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Sign Out Error:", error);
    }
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
                href="/terms"
                className="block text-sm px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
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
      <main className="mt-10">
        <h1 className="font-bold text-3xl text-center">Dear TDMC,</h1>
        <div className="bg-white content-center  p-8 rounded-lg shadow-lg max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy for Sheet Seeker</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
        <p className="text-gray-700">
          Welcome to Sheet Seeker. This privacy policy describes how we handle and protect your personal data when you use our web app. Sheet Seeker is an internal application designed exclusively for TDMC company users. Access is restricted to users with a `@tdmc.co.za` email domain. By using Sheet Seeker, you consent to the data practices described in this policy.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>

        <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
        <p className="text-gray-700 mb-4">
          <strong>Email Address</strong>: To verify your identity and grant access to the app, we collect and store your `@tdmc.co.za` email address.
        </p>

        <h3 className="text-xl font-semibold mb-2">Google Drive Files</h3>
        <p className="text-gray-700">
          <strong>File Access</strong>: Sheet Seeker requires access to your Google Drive to function correctly. The application will read through folders of your Google Drive in order to find and select spreadsheets, which will then be used for look for search parameters.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">How We Use Your Information</h2>
        <p className="text-gray-700 mb-4">
          <strong>Email Address</strong>: Your email address is used solely for authentication purposes to ensure that only authorized TDMC users can access Sheet Seeker.
        </p>
        <p className="text-gray-700">
          <strong>Google Drive Files</strong>: The app accesses and processes your spreadsheet files to allow you to search for specific text within them. This data is used only to provide the functionality of the app and is not stored or used for any other purposes.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Data Sharing and Disclosure</h2>
        <p className="text-gray-700">
          Sheet Seeker does not share, sell, rent, or disclose your personal information or Google Drive data to third parties. Your data is used exclusively for the purposes described in this policy.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
        <p className="text-gray-700">
          We implement appropriate technical and organizational measures to protect your data from unauthorized access, disclosure, alteration, and destruction. These measures include:
        </p>
        <ul className="list-disc list-inside text-gray-700">
          <li><strong>Authentication</strong>: Restricting access to the app to users with a verified `@tdmc.co.za` email domain.</li>
          <li><strong>Encryption</strong>: Ensuring that data transmitted between your device and our servers is encrypted.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">User Rights</h2>
        <p className="text-gray-700 mb-4">
          As a user of Sheet Seeker, you have the following rights regarding your data:
        </p>
        <ul className="list-disc list-inside text-gray-700">
          <li><strong>Access</strong>: You can request access to the personal information we hold about you.</li>
          <li><strong>Correction</strong>: You can request correction of any inaccurate or incomplete information.</li>
          <li><strong>Deletion</strong>: You can request the deletion of your personal data, subject to certain legal constraints.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Changes to This Privacy Policy</h2>
        <p className="text-gray-700">
          We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any significant changes by posting the new policy on our website and updating the date at the top of this document.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions or concerns about this privacy policy or our data practices, please contact us at:
        </p>
        <ul className="list-none text-gray-700">
          <li><strong>Email</strong>: markmadi232@gmail.com</li>
          <li><strong>Address</strong>: TDMC, 144 Adelaide Tambo Drive, Durban North, 4051</li>
        </ul>
      </section>
    </div>
      </main>
    </div>
  );
};

export default Page;
