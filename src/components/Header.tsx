'use client';

import UserProfile from './UserProfile';
import { HORNETS_COLORS } from '@/constants/dashboardConstants';

const Header = () => {
  return (
    <header className="text-white p-4" style={{ backgroundColor: HORNETS_COLORS.TEAL }}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-bold">Charlotte Hornets Dashboard</h1>
        </div>
        <UserProfile />
      </div>
    </header>
  );
};

export default Header; 