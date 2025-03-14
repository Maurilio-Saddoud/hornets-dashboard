export interface PlayerStats {
  ppg: number;
  rpg: number;
  apg: number;
}

export interface Player {
  id: number;
  name: string;
  position: string;
  number: string;
  photo?: string;
  stats: PlayerStats;
}

export interface StatDisplayProps {
  label: string;
  value: number;
  hasBorder?: boolean;
} 