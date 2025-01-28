"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signIn("google", {
        callbackUrl,
        redirect: false,
      });

      if (result?.error) {
        setError("Authentication failed. Please try again.");
      } else if (result?.url) {
        router.replace(result.url);
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4'>
      <div className='bg-gray-800 shadow-2xl rounded-xl p-10 w-full max-w-md text-center border border-gray-700'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-white mb-4'>Welcome Back</h1>
          <p className='text-gray-400'>Sign in to access your dashboard</p>
        </div>

        {error && (
          <div className='bg-red-600/20 border border-red-600 text-red-400 p-3 rounded-lg mb-6'>
            {error}
          </div>
        )}

        <button
          onClick={handleSignIn}
          disabled={loading}
          className='w-full py-3 px-4 
           bg-gradient-to-r from-blue-600 to-purple-600 
           text-white font-semibold 
           rounded-lg 
           hover:from-blue-700 hover:to-purple-700 
           transition-all duration-300 
           flex items-center justify-center 
           space-x-2
           disabled:opacity-50'
        >
          {loading ? (
            <svg
              className='animate-spin h-5 w-5 text-white'
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
          ) : (
            <span>Sign in with Google</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
