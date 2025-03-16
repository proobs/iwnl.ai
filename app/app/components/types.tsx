export type Gametype = 1 | 0 | -1; // win | loss | remake

export interface Player {
  champIcon: string;
  role_icon: string;
  summonerName: string;
  stats: [number, number, number]; // [kills, deaths, assists]
  items: [string, string, string, string, string, string];
  ward_type: string;
  kill_participation: number;
  damage: {
    dealt: number;
    taken: number;
  };
  wards: {
    placed: number;
    destroyed: number;
  };
  creepScore: number;
  level: number;
  rankTier: string;
  opScore: number;
  opRank: string; // "MVP", "ACE", etc.
}

export interface Side {
  top: Player;
  jungle: Player;
  mid: Player;
  bot: Player;
  support: Player;
}

export interface GameStats {
  totalKills: number;
  totalGold: number;
  objectives: {
    dragons: number;
    barons: number;
    towers: number;
    inhibitors: number;
  };
}

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
  damage: {
    dealt: number;
    taken: number;
  };
  sides: {
    blue: Side;
    red: Side;
  };
  gameStats: {
    blue: GameStats;
    red: GameStats;
  };
  badges: string[]; // ["Double Kill", "MVP", "Unstoppable"]
  opScore: number;
  opRank: string;
}