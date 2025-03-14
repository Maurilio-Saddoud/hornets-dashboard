'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import Image from 'next/image';

export default function UserProfile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex items-center">
      {user ? (
        <div className="flex items-center space-x-4">
          <div className="text-sm text-white">
            <span>Welcome, {user.name}</span>
          </div>
          {user.picture && (
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image 
                src={user.picture} 
                alt={user.name || 'User'} 
                width={32} 
                height={32} 
                className="object-cover"
              />
            </div>
          )}
          <Link 
            href="/api/auth/logout"
            className="text-sm text-gray-700 hover:text-gray-900"
          >
            Logout
          </Link>
        </div>
      ) : (
        <Link 
          href="/login"
          className="text-sm bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded"
        >
          Login
        </Link>
      )}
    </div>
  );
} 