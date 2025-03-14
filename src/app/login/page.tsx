'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { HORNETS_COLORS } from '@/constants/dashboardConstants';

export default function LoginPage() {
  const [error, setError] = useState('');
  const { user, isLoading } = useUser();
  const router = useRouter();
  
  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen honeycomb-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold" 
            style={{ color: HORNETS_COLORS.PURPLE }}>
          Hornets Dashboard
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to access your dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border-t-4" 
             style={{ borderColor: HORNETS_COLORS.TEAL }}>
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4 text-red-700">
              <p>{error}</p>
            </div>
          )}
          
          <div className="space-y-6">
            <a 
              href="/api/auth/login"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white"
              style={{ backgroundColor: HORNETS_COLORS.TEAL }}
            >
              Sign in with Auth0
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 