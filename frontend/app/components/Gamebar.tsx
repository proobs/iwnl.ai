import { FC, useState } from "react";

// Type for individual player details
interface Player {
  champIcon: string; // URL or path to the champion's icon
  summonerName: string; // Player's summoner name
  stats: [number, number, number]; // [kills, deaths, assists]
  items: string[]; // Array of item icons (URLs or paths)
  kill_participation: number;
  damage: number;
  wards: number;
}

interface PlayerCardProps {
  player: Player;
  role: string;
  teamColor: "red" | "blue"; // Determines styling
}
// Type for a team side (blue or red)
interface Side {
  top: Player;
  jungle: Player;
  mid: Player;
  bot: Player;
  support: Player;
}
// remake = -1, loss = 0, 1 = win
type Gametype = 1 | 0 | -1;

// Main match summary props
interface GamebarProps {
  champIcon: string;
  id: string;
  gameType: Gametype;
  stats: [number, number, number]; //kda
  creepScore: number;
  visionScore: number;
  gameTime: string;
  gameMode: string;
  timeAgo: string;
  runePrimary: string;
  runeSecondary: string;
  summonerSpells: [string, string];
  items: string[];
  ward_type: string;
  kill_participation: number;
  sides: {
    blue: Side;
    red: Side;
  };
}

const Gamebar:FC<GamebarProps> = ({
    champIcon,
    id,
    gameType,
    stats,
    creepScore,
    visionScore,
    gameTime,
    gameMode,
    timeAgo,
    runePrimary,
    runeSecondary,
    summonerSpells,
    items,
    ward_type,
    kill_participation,
    sides,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [gameResult, setGameResult] = useState("");

  if (gameType === -1) {
    setGameResult("REMAKE");
  } else if (gameType === 0) {
    setGameResult("LOSS");
  } else {
    setGameResult("WIN");
  }
  return <></>
}

// expanded information list
const PlayerCard: FC<PlayerCardProps>  = ({player, role, teamColor})=> {
  return <></>
} 

export default Gamebar;
