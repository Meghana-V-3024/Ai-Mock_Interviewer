
"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-gray-900 h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold text-white mb-8">Naukri Prep</h1>
      <div className="space-x-4">
        <button 
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          onClick={() => router.push('/auth/sign-in')}
        >
          Login
        </button>
        <button 
          className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          onClick={() => router.push('/auth/sign-up')}
        >
          Signup
        </button>
      </div>
    </div>
  );
}
