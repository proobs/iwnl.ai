import React from "react";

// Type for individual player details
interface Player {
  champIcon: string; // URL or path to the champion's icon
  role_icon: string; // Path to role icon
  summonerName: string; // Player's summoner name
  stats: [number, number, number]; // [kills, deaths, assists]
  items: [string, string, string, string, string, string]; // Array of item icons
  ward_type: string;
  kill_participation: number;
  damage: number;
  wards: number;
}

// Props for each PlayerCard
export interface PlayerCardProps {
  player: Player;
  role: string;
  teamColor: "red" | "blue"; // Determines styling
}

// Type for a team side (blue or red)
export interface Side {
  top: Player;
  jungle: Player;
  mid: Player;
  bot: Player;
  support: Player;
}

// win | loss | remake
export type Gametype = 1 | 0 | -1;

// Main match summary props
export interface GamebarProps {
  champIcon: string;
  level: number;
  id: string;
  gameType: Gametype;
  stats: [number, number, number]; // KDA
  creepScore: number;
  visionScore: number;
  gameTime: string;
  gameMode: string;
  timeAgo: string;
  runePrimary: string;
  runeSecondary: string;
  summonerSpells: [string, string];
  items: [string, string, string, string, string, string];
  ward_type: string;
  kill_participation: number;
  sides: {
    blue: Side;
    red: Side;
  };
}
