'use client';

import React from 'react';
import playerAttributes from "@/data/playerAttributes.json";
import Image from 'next/image';
import { HORNETS_COLORS } from '@/constants/dashboardConstants';
import { HornetsCard } from '@/components/ui/hornets-card';

interface LeaderCardProps {
  category: string;
  value: number;
  playerName: string;
  photoUrl?: string;
}

const LeaderCard = ({ category, value, playerName, photoUrl }: LeaderCardProps) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-2" style={{ backgroundColor: HORNETS_COLORS.TEAL }}>
      <h3 className="text-white text-sm font-semibold uppercase tracking-wider text-center">{category}</h3>
    </div>
    <div className="p-4 flex items-center">
      <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 relative" 
           style={{ borderColor: HORNETS_COLORS.TEAL }}>
        {photoUrl ? (
          <Image 
            src={photoUrl} 
            alt={playerName} 
            fill
            sizes="64px"
            className="object-cover" 
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">No Photo</div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value.toFixed(1)}</p>
        <p className="text-sm text-gray-600">{playerName}</p>
      </div>
    </div>
  </div>
);

const TeamLeaders = () => {
  // Calculate team leaders from playerAttributes
  const getTeamLeaders = () => {
    const leaders = {
      points: { name: '', value: 0, photo: '' },
      rebounds: { name: '', value: 0, photo: '' },
      assists: { name: '', value: 0, photo: '' },
      fieldGoal: { name: '', value: 0, photo: '' },
      threePoint: { name: '', value: 0, photo: '' }
    };

    Object.entries(playerAttributes).forEach(([name, attributes]) => {
      // Points leader
      if (attributes.season_averages.ppg > leaders.points.value) {
        leaders.points = { 
          name, 
          value: attributes.season_averages.ppg,
          photo: attributes.photo_url || ''
        };
      }
      
      // Rebounds leader
      if (attributes.season_averages.rpg > leaders.rebounds.value) {
        leaders.rebounds = { 
          name, 
          value: attributes.season_averages.rpg,
          photo: attributes.photo_url || ''
        };
      }
      
      // Assists leader
      if (attributes.season_averages.apg > leaders.assists.value) {
        leaders.assists = { 
          name, 
          value: attributes.season_averages.apg,
          photo: attributes.photo_url || ''
        };
      }
      
      // Field goal percentage leader
      if (attributes.shooting_percentages.field_goal > leaders.fieldGoal.value) {
        leaders.fieldGoal = { 
          name, 
          value: attributes.shooting_percentages.field_goal,
          photo: attributes.photo_url || ''
        };
      }
      
      // Three point percentage leader
      if (attributes.shooting_percentages.three_point > leaders.threePoint.value) {
        leaders.threePoint = { 
          name, 
          value: attributes.shooting_percentages.three_point,
          photo: attributes.photo_url || ''
        };
      }
    });

    return leaders;
  };

  const leaders = getTeamLeaders();

  return (
    <HornetsCard title="Team Leaders" className="w-full mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <LeaderCard 
          category="Points" 
          value={leaders.points.value} 
          playerName={leaders.points.name}
          photoUrl={leaders.points.photo}
        />
        <LeaderCard 
          category="Rebounds" 
          value={leaders.rebounds.value} 
          playerName={leaders.rebounds.name}
          photoUrl={leaders.rebounds.photo}
        />
        <LeaderCard 
          category="Assists" 
          value={leaders.assists.value} 
          playerName={leaders.assists.name}
          photoUrl={leaders.assists.photo}
        />
        <LeaderCard 
          category="FG%" 
          value={leaders.fieldGoal.value} 
          playerName={leaders.fieldGoal.name}
          photoUrl={leaders.fieldGoal.photo}
        />
        <LeaderCard 
          category="3PT%" 
          value={leaders.threePoint.value} 
          playerName={leaders.threePoint.name}
          photoUrl={leaders.threePoint.photo}
        />
      </div>
    </HornetsCard>
  );
};

export default TeamLeaders; 