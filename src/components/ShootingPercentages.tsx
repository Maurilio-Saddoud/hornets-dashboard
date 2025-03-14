'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import playerAttributes from '@/data/playerAttributes.json';
import { HORNETS_COLORS } from '@/constants/dashboardConstants';
import { HornetsCard } from '@/components/ui/hornets-card';

interface TooltipProps {
  active?: boolean;
  payload?: {
    name: string;
    value: number;
    color: string;
    payload: {
      fullName: string;
    };
  }[];
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    const fullName = payload[0]?.payload?.fullName;
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow">
        <p className="font-bold">{fullName}</p>
        {payload.map((entry) => (
          <p key={entry.name} style={{ color: entry.color }}>
            {entry.name}: {entry.value.toFixed(1)}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ShootingPercentages = () => {
  const getTeamShootingData = () => {
    return Object.entries(playerAttributes)
      .map(([name, stats]) => {
        const [firstName, lastName] = name.split(' ');
        const initial = firstName[0];
        return {
          name: `${initial}. ${lastName}`,
          'Field Goal %': stats.shooting_percentages?.field_goal || 0,
          'Three Point %': stats.shooting_percentages?.three_point || 0,
          fullName: name,
        };
      })
      .sort((a, b) => b['Field Goal %'] - a['Field Goal %']);
  };

  return (
    <HornetsCard title="Shooting Percentages" className="w-full mt-4">
      <div className="w-full h-[300px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={getTeamShootingData()}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
            />
            <YAxis domain={[0, 70]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="Field Goal %" fill={HORNETS_COLORS.TEAL} />
            <Bar dataKey="Three Point %" fill={HORNETS_COLORS.PURPLE} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </HornetsCard>
  );
};

export default ShootingPercentages; 