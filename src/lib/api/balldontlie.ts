import playerAttributes from '@/data/playerAttributes.json';

const BASE_URL = 'https://api.balldontlie.io/v1';
const HORNETS_TEAM_ID = 4; // Charlotte Hornets team ID
const API_KEY = process.env.NEXT_PUBLIC_BALLDONTLIE_API_KEY;
const CURRENT_SEASON = 2024; // NBA uses the year the season started

interface BallDontLiePlayer {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  height_feet: number | null;
  height_inches: number | null;
  weight_pounds: number | null;
  team: {
    id: number;
    name: string;
    full_name: string;
    abbreviation: string;
  };
}

interface ApiResponse {
  data: BallDontLiePlayer[];
  meta: {
    total_pages: number;
    current_page: number;
    next_page: number | null;
    per_page: number;
    total_count: number;
  };
}

export async function getHornetsPlayers(): Promise<BallDontLiePlayer[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/players?team_ids[]=${HORNETS_TEAM_ID}&per_page=100&season=${CURRENT_SEASON}&start_date=2023-10-24`,
      {
        headers: {
          'Authorization': `${API_KEY}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    
    // Get list of player names from playerAttributes
    const playerNames = Object.keys(playerAttributes);
    
    // Filter API players to only include those in playerAttributes
    const currentPlayers = data.data.filter(player => {
      const fullName = `${player.first_name} ${player.last_name}`;
      return playerNames.includes(fullName);
    });

    console.log('Current Hornets Players in playerAttributes:', currentPlayers);
    return currentPlayers;

  } catch (error) {
    console.error('Failed to fetch current Hornets players:', error);
    return [];
  }
} 