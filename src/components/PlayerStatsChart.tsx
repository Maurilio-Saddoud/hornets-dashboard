'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Player } from '@/types/player';
import playerAttributes from '@/data/playerAttributes.json';

interface PlayerStatsChartProps {
  player: Player | null;
}

const PlayerStatsChart = ({ player }: PlayerStatsChartProps) => {
  const getStatsData = (player: Player | null) => {
    if (!player) return [];
    
    const playerStats = playerAttributes[player.name as keyof typeof playerAttributes];
    if (!playerStats) return [];

    // Convert the arrays into an array of objects for the line chart
    return playerStats.points.map((points, index) => ({
      game: `Game ${index + 1}`,
      points: points,
      rebounds: playerStats.rebounds[index],
      assists: playerStats.assists[index],
    }));
  };

  return (
    <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Player Stats</h2>
      <div className="h-[300px] md:h-[400px]">
        {player ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={getStatsData(player)}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="game" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="points" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="rebounds" stroke="#82ca9d" />
              <Line type="monotone" dataKey="assists" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a player to view stats
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerStatsChart; 