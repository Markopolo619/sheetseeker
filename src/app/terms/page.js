"use client";
import React, { useState } from "react";
import "./styles.css";
import { auth } from "@/app/firebase/config";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const user = auth.currentUser;
  const [accountDropdownVisible, setAccountDropdownVisible] = useState(false);

  const toggleAccountDropdown = () => {
    setAccountDropdownVisible(!accountDropdownVisible);
  };

  const modifyImageUrlSize = (url, newSize) =>
    url.replace(/s(\d+)-c/, `s${newSize}-c`);

  const profileImageUrl = user
    ? modifyImageUrlSize(user.photoURL, 999)
    : "/default-avatar.svg";

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Sign Out Error", error);
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
              src={profileImageUrl}
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
        <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 mx-auto my-8">
          <h1 className="text-3xl font-bold mb-6">
            Terms and Conditions for Sheet Seeker
          </h1>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
            <p className="text-gray-700">
              Welcome to Sheet Seeker. By accessing and using our web app, you
              agree to comply with and be bound by the following terms and
              conditions. If you do not agree to these terms, please do not use
              our service.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Eligibility</h2>
            <p className="text-gray-700">
              Sheet Seeker is an internal application designed exclusively for
              TDMC company users. Access is restricted to individuals with a
              verified `@tdmc.co.za` email domain.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Account Requirements
            </h2>
            <p className="text-gray-700">
              To use Sheet Seeker, you must create an account with a valid
              `@tdmc.co.za` email address. You are responsible for maintaining
              the confidentiality of your account information and for all
              activities that occur under your account.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">User Conduct</h2>
            <p className="text-gray-700">
              You agree to use Sheet Seeker only for lawful purposes. You are
              prohibited from using the app to:
            </p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Upload or share any illegal or unauthorized content.</li>
              <li>
                Engage in any activity that disrupts or interferes with the
                app&app;s functionality.
              </li>
              <li>
                Impersonate any person or entity or misrepresent your
                affiliation with a person or entity.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Intellectual Property
            </h2>
            <p className="text-gray-700">
              All content and materials available on Sheet Seeker, including but
              not limited to text, graphics, website name, code, images, and
              logos are the intellectual property of TDMC and are protected by
              applicable copyright and trademark law. Unauthorized use of any
              materials may violate copyright, trademark, and other laws.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Service Availability
            </h2>
            <p className="text-gray-700">
              We strive to ensure that Sheet Seeker is available at all times.
              However, we do not guarantee that the app will be uninterrupted or
              error-free. We reserve the right to modify or discontinue the app
              at any time without notice.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Termination</h2>
            <p className="text-gray-700">
              We reserve the right to terminate your access to Sheet Seeker,
              without any advance notice, for conduct that we believe violates
              these Terms and Conditions or is harmful to other users of the
              app, us, or third parties, or for any other reason.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Limitation of Liability
            </h2>
            <p className="text-gray-700">
              Sheet Seeker and all content, materials, information, products,
              and services provided on the app are provided on an &quot;as
              is&quot; and &quot;as available&quot; basis. In no event shall
              TDMC be liable for any direct, indirect, incidental, special, or
              consequential damages arising out of or in any way connected with
              the use of or inability to use the app.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Dispute Resolution</h2>
            <p className="text-gray-700">
              Any disputes arising out of or relating to these terms and
              conditions shall be resolved through binding arbitration in
              accordance with the rules of the relevant jurisdiction.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to modify these terms and conditions at any
              time. Any changes will be effective immediately upon posting on
              our website. Your continued use of Sheet Seeker following the
              posting of changes constitutes your acceptance of such changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions or concerns about these terms and
              conditions, please contact us at:
            </p>
            <ul className="list-none text-gray-700">
              <li>
                <strong>Email</strong>: support@tdmc.co.za
              </li>
              <li>
                <strong>Address</strong>: TDMC, 144 Adelaide Tambo Drive, Durban
                North, 4051
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
    // <div className="body">
    //   <div className="nav-container w-full pt-4 h-auto flex flex-row justify-end pr-10">
    //     <nav className="flex flex-col  pr-10">
    //       <button
    //         className="block focus:border-2 focus:border-gray-600 h-10 w-10 absolute rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none "
    //         onClick={toggleAccountDropdown}
    //       >
    //         <Image
    //           className="h-full w-full object-cover"
    //           src={"/userAccount.svg"}
    //           alt="User Avatar"
    //           width={40}
    //           height={40}
    //         />
    //       </button>
    //       {accountDropdownVisible && (
    //         <div className="dropdown z-10 mr-2 mt-11 absolute right-0 py-2 w-48 bg-white rounded-lg shadow-lg">
    //           <Link
    //             href="/settings"
    //             className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
    //           >
    //             Account Settings
    //           </Link>
    //           <Link
    //             href="/dashboard"
    //             className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
    //           >
    //             Dashboard
    //           </Link>
    //           <Link
    //             href="/privacy"
    //             className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
    //           >
    //             Privacy Policy
    //           </Link>
    //           <button
    //             className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white"
    //             onClick={handleSignOut}
    //           >
    //             Sign Out
    //           </button>
    //         </div>
    //       )}
    //     </nav>
    //   </div>
    //   <main className="mt-10">
    //     <h1 className="font-bold text-3xl text-center">Dear TDMC,</h1>
    //     <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 mx-auto my-8">
    //       <h1 className="text-3xl font-bold mb-6">
    //         Terms and Conditions for Sheet Seeker
    //       </h1>

    //       <section className="mb-10">
    //         <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
    //         <p className="text-gray-700">
    //           Welcome to Sheet Seeker. By accessing and using our web app, you
    //           agree to comply with and be bound by the following terms and
    //           conditions. If you do not agree to these terms, please do not use
    //           our service.
    //         </p>
    //       </section>

    //       <section className="mb-6">
    //         <h2 className="text-2xl font-semibold mb-2">Eligibility</h2>
    //         <p className="text-gray-700">
    //           Sheet Seeker is an internal application designed exclusively for
    //           TDMC company users. Access is restricted to individuals with a
    //           verified `@tdmc.co.za` email domain.
    //         </p>
    //       </section>

    //       <section className="mb-6">
    //         <h2 className="text-2xl font-semibold mb-2">
    //           Account Requirements
    //         </h2>
    //         <p className="text-gray-700">
    //           To use Sheet Seeker, you must create an account with a valid
    //           `@tdmc.co.za` email address. You are responsible for maintaining
    //           the confidentiality of your account information and for all
    //           activities that occur under your account.
    //         </p>
    //       </section>

    //       <section className="mb-6">
    //         <h2 className="text-2xl font-semibold mb-2">User Conduct</h2>
    //         <p className="text-gray-700">
    //           You agree to use Sheet Seeker only for lawful purposes. You are
    //           prohibited from using the app to:
    //         </p>
    //         <ul className="list-disc list-inside text-gray-700">
    //           <li>Upload or share any illegal or unauthorized content.</li>
    //           <li>
    //             Engage in any activity that disrupts or interferes with the
    //             app&app;s functionality.
    //           </li>
    //           <li>
    //             Impersonate any person or entity or misrepresent your
    //             affiliation with a person or entity.
    //           </li>
    //         </ul>
    //       </section>

    //       <section className="mb-6">
    //         <h2 className="text-2xl font-semibold mb-2">
    //           Intellectual Property
    //         </h2>
    //         <p className="text-gray-700">
    //           All content and materials available on Sheet Seeker, including
    //           but not limited to text, graphics, website name, code, images, and
    //           logos are the intellectual property of TDMC and are protected by
    //           applicable copyright and trademark law. Unauthorized use of any
    //           materials may violate copyright, trademark, and other laws.
    //         </p>
    //       </section>

    //       <section className="mb-6">
    //         <h2 className="text-2xl font-semibold mb-2">
    //           Service Availability
    //         </h2>
    //         <p className="text-gray-700">
    //           We strive to ensure that Sheet Seeker is available at all times.
    //           However, we do not guarantee that the app will be uninterrupted or
    //           error-free. We reserve the right to modify or discontinue the app
    //           at any time without notice.
    //         </p>
    //       </section>

    //       <section className="mb-6">
    //         <h2 className="text-2xl font-semibold mb-2">Termination</h2>
    //         <p className="text-gray-700">
    //           We reserve the right to terminate your access to Sheet Seeker,
    //           without any advance notice, for conduct that we believe violates
    //           these Terms and Conditions or is harmful to other users of the
    //           app, us, or third parties, or for any other reason.
    //         </p>
    //       </section>

    //       <section className="mb-6">
    //         <h2 className="text-2xl font-semibold mb-2">
    //           Limitation of Liability
    //         </h2>
    //         <p className="text-gray-700">
    //           Sheet Seeker and all content, materials, information, products,
    //           and services provided on the app are provided on an &quot;as
    //           is&quot; and &quot;as available&quot; basis. In no event shall
    //           TDMC be liable for any direct, indirect, incidental, special, or
    //           consequential damages arising out of or in any way connected with
    //           the use of or inability to use the app.
    //         </p>
    //       </section>

    //       <section className="mb-6">
    //         <h2 className="text-2xl font-semibold mb-2">Dispute Resolution</h2>
    //         <p className="text-gray-700">
    //           Any disputes arising out of or relating to these terms and
    //           conditions shall be resolved through binding arbitration in
    //           accordance with the rules of the relevant jurisdiction.
    //         </p>
    //       </section>

    //       <section className="mb-6">
    //         <h2 className="text-2xl font-semibold mb-2">Changes to Terms</h2>
    //         <p className="text-gray-700">
    //           We reserve the right to modify these terms and conditions at any
    //           time. Any changes will be effective immediately upon posting on
    //           our website. Your continued use of Sheet Seeker following the
    //           posting of changes constitutes your acceptance of such changes.
    //         </p>
    //       </section>

    //       <section>
    //         <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
    //         <p className="text-gray-700">
    //           If you have any questions or concerns about these terms and
    //           conditions, please contact us at:
    //         </p>
    //         <ul className="list-none text-gray-700">
    //           <li>
    //             <strong>Email</strong>: support@tdmc.co.za
    //           </li>
    //           <li>
    //             <strong>Address</strong>: TDMC, 144 Adelaide Tambo Drive, Durban North, 4051
    //           </li>
    //         </ul>
    //       </section>
    //     </div>
    //   </main>
    // </div>
  );
};

export default Page;
