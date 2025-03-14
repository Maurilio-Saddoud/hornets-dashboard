'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { Player } from '@/types/player';
import { HornetsSpinner } from '@/components/ui/hornets-spinner';

// Components
import Header from '@/components/Header';
import TeamLeaders from '@/components/TeamLeaders';
import PlayerSelector from '@/components/PlayerSelector';
import PerformanceRadar from '@/components/PerformanceRadar';
import PlayerStatsChart from '@/components/PlayerStatsChart';
import ShootingPercentages from '@/components/ShootingPercentages';

export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <HornetsSpinner />
      </div>
    );
  }

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen honeycomb-bg">
      <Header />
      <main className="p-4 max-w-7xl mx-auto">
        <TeamLeaders />
        <div className="flex flex-col lg:flex-row gap-4 overflow-x-auto">
          <PlayerSelector onSelectPlayer={setSelectedPlayer} />
          <div className="flex flex-col md:flex-row gap-4 flex-1 overflow-x-auto">
            <PerformanceRadar player={selectedPlayer} />
            <PlayerStatsChart player={selectedPlayer} />
          </div>
        </div>
        <ShootingPercentages />
      </main>
    </div>
  );
}
