"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "AccessDenied":
        return "You are not authorized to access this resource. Please make sure you are using an allowed email address.";
      case "OAuthSignin":
        return "Error occurred during sign-in attempt. Please try again.";
      default:
        return "An authentication error occurred. Please try again.";
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4'>
      <div className='bg-gray-800 shadow-2xl rounded-xl p-10 w-full max-w-md text-center border border-gray-700'>
        <h1 className='text-3xl font-bold text-red-500 mb-6'>
          Authentication Error
        </h1>
        <div className='bg-red-600/20 border border-red-600 text-red-400 p-4 rounded-lg'>
          {getErrorMessage(error)}
        </div>
      </div>
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthErrorContent />
    </Suspense>
  );
}
