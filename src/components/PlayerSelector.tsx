'use client';

import * as React from "react"
import { HORNETS_COLORS } from '@/constants/dashboardConstants';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel"
import { Player, StatDisplayProps } from "@/types/player"
import { getHornetsPlayers } from "@/lib/api/balldontlie"
import playerAttributes from "@/data/playerAttributes.json"
import Image from 'next/image'
import { HornetsCard } from "@/components/ui/hornets-card"

const StatDisplay = ({ label, value, hasBorder }: StatDisplayProps) => (
  <div className={`text-center ${hasBorder ? 'border-x border-gray-200' : ''}`}>
    <div className="text-2xl font-bold text-gray-800">{value}</div>
    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</div>
  </div>
);

const PlayerCard = ({ player }: { player: Player }) => (
  <Card className="relative overflow-hidden bg-gradient-to-br from-slate-300 to-slate-100 border-8 border-white shadow-xl">
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-30 pointer-events-none" />
    <CardContent className="flex flex-col p-6">
      {/* Header Section */}
      <div className="text-white p-4 -mx-6 -mt-6 mb-4 flex items-center justify-between relative"
           style={{ background: `linear-gradient(to right, ${HORNETS_COLORS.TEAL}, ${HORNETS_COLORS.PURPLE})` }}>
        <div>
          <span className="text-xs uppercase tracking-wider opacity-75">Charlotte Hornets</span>
          <h3 className="font-bold text-xl">{player.name}</h3>
        </div>
        <span className="rounded-full bg-white/90 text-teal-600 w-10 h-10 flex items-center justify-center font-bold text-xl shadow-md">
          {player.number}
        </span>
      </div>

      {/* Player Image */}
      <div className="flex-1 flex items-center justify-center py-6 relative">
        {player.photo ? (
          <div className="w-36 h-36 rounded-full overflow-hidden shadow-inner relative">
            <Image 
              src={player.photo} 
              alt={player.name}
              fill
              sizes="144px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-36 h-36 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-gray-400 font-bold shadow-inner">
            Player Image
          </div>
        )}
        <span className="absolute bottom-2 right-0 text-xs font-semibold bg-gray-800 text-white px-2 py-1 rounded-full">
          {player.position}
        </span>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-b from-gray-100 to-white p-4 rounded-lg shadow-inner">
        <div className="grid grid-cols-3 gap-4">
          <StatDisplay label="PPG" value={player.stats.ppg} />
          <StatDisplay label="RPG" value={player.stats.rpg} hasBorder />
          <StatDisplay label="APG" value={player.stats.apg} />
        </div>
      </div>
    </CardContent>
  </Card>
);

interface PlayerSelectorProps {
  onSelectPlayer: (player: Player | null) => void;
}

// Add type for playerAttributes
type PlayerAttribute = {
  outside_scoring: number;
  inside_scoring: number;
  defense: number;
  athleticism: number;
  playmaking: number;
  rebounding: number;
  points: number[];
  rebounds: number[];
  assists: number[];
  jersey_number?: number; // Make it optional
  shooting_percentages: {
    field_goal: number;
    three_point: number;
  };
  season_averages: {
    ppg: number;
    rpg: number;
    apg: number;
  };
  photo_url?: string; // Add optional photo URL
};

// Define a proper type for API players
interface ApiPlayer {
  id: number;
  first_name: string;
  last_name: string;
  position?: string;
  jersey_number?: string;
  team?: {
    id: number;
    name: string;
  };
}

const PlayerSelector = ({ onSelectPlayer }: PlayerSelectorProps) => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [apiPlayers, setApiPlayers] = React.useState<ApiPlayer[]>([])
  
  // Fetch API players
  React.useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const players = await getHornetsPlayers();
        setApiPlayers(players);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);
  
  // Convert playerAttributes to Player array
  const players: Player[] = React.useMemo(() => {
    return Object.entries(playerAttributes).map(([name, attributes]: [string, PlayerAttribute], index) => {
      // Try to find matching player in API data
      const apiPlayer = apiPlayers.find(p => 
        `${p.first_name} ${p.last_name}` === name
      );
      
      // Use jersey number from API if available, otherwise from playerAttributes
      const jerseyNumber = apiPlayer?.jersey_number 
        ? `#${apiPlayer.jersey_number}` 
        : attributes.jersey_number 
          ? `#${attributes.jersey_number}` 
          : "N/A";
        
      return {
        id: index + 1,
        name: name,
        position: attributes.outside_scoring > 80 ? "SG" : 
                 attributes.playmaking > 80 ? "PG" : 
                 attributes.rebounding > 80 ? "C" : "F",
        number: jerseyNumber,
        photo: attributes.photo_url, // Add the photo URL
        stats: {
          ppg: attributes.season_averages.ppg,
          rpg: attributes.season_averages.rpg,
          apg: attributes.season_averages.apg
        }
      };
    });
  }, [apiPlayers]); // Depend on apiPlayers

  // Handle player selection
  React.useEffect(() => {
    if (!api || players.length === 0) return;
 
    // Set initial player
    const initialIndex = api.selectedScrollSnap();
    onSelectPlayer(players[initialIndex]);
 
    // Listen for selection changes
    api.on("select", () => {
      const index = api.selectedScrollSnap();
      onSelectPlayer(players[index]);
    });
    
    // Cleanup listener on unmount
    return () => {
      api.off("select");
    };
  }, [api, onSelectPlayer, players]);

  return (
    <HornetsCard title="Player Cards" className="w-full lg:w-1/4 min-w-[300px]">
      <div className="relative">
        <Carousel 
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent>
            {players.map((player) => (
              <CarouselItem key={player.id}>
                <div className="p-1">
                  <PlayerCard player={player} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 -translate-x-1/4 hidden sm:flex" />
          <CarouselNext className="absolute right-0 translate-x-1/4 hidden sm:flex" />
        </Carousel>
      </div>
    </HornetsCard>
  );
};

export default PlayerSelector; 