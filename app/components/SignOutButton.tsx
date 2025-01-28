"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";

export default function SignOutButton() {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <button
    //   onClick={handleSignOut}
    //   disabled={loading}
    //   className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50'
    // >
    //   {loading ? "Signing out..." : "Sign out"}
    // </button>

    <button
      onClick={handleSignOut}
      disabled={loading}
      className='group relative flex items-center justify-center w-full max-w-xs mx-auto 
    bg-gradient-to-r from-red-500 to-red-700 
    text-white font-semibold py-3 px-6 
    rounded-lg shadow-md hover:shadow-xl 
    transition-all duration-300 ease-in-out 
    transform hover:-translate-y-1 
    focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75
    disabled:cursor-not-allowed disabled:opacity-50'
    >
      {loading ? (
        <div className='flex items-center'>
          <svg
            className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
          Signing out...
        </div>
      ) : (
        "Sign out"
      )}
    </button>
  );
}
/**/
