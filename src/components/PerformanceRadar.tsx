'use client';

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { Player } from '@/types/player';
import playerAttributes from '@/data/playerAttributes.json';
import Image from 'next/image';
import { HORNETS_COLORS } from '@/constants/dashboardConstants';
import { HornetsCard } from '@/components/ui/hornets-card';

interface PerformanceRadarProps {
  player: Player | null;
}

const PerformanceRadar = ({ player }: PerformanceRadarProps) => {
  const getPerformanceData = (player: Player | null) => {
    if (!player) return [];
    
    const playerName = player.name;
    const attributes = playerAttributes[playerName as keyof typeof playerAttributes];
    
    if (!attributes) {
      console.warn(`No attributes found for player: ${playerName}`);
      return [];
    }
    
    return [
      { subject: 'Outside Scoring', A: attributes.outside_scoring, fullMark: 100 },
      { subject: 'Inside Scoring', A: attributes.inside_scoring, fullMark: 100 },
      { subject: 'Defense', A: attributes.defense, fullMark: 100 },
      { subject: 'Athleticism', A: attributes.athleticism, fullMark: 100 },
      { subject: 'Playmaking', A: attributes.playmaking, fullMark: 100 },
      { subject: 'Rebounding', A: attributes.rebounding, fullMark: 100 }
    ];
  };

  return (
    <HornetsCard title="Performance Radar" className="w-full md:w-1/2">
      <div className="h-[300px] md:h-[400px]">
        {player ? (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={getPerformanceData(player)}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <Radar
                name="Performance"
                dataKey="A"
                stroke={HORNETS_COLORS.TEAL}
                fill={HORNETS_COLORS.TEAL}
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <p>Select a player to view performance metrics</p>
          </div>
        )}
      </div>
    </HornetsCard>
  );
};

export default PerformanceRadar; 