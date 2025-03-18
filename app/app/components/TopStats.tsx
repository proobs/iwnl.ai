import { cn } from "~/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "./ui/table";

interface ChampionStats {
  name: string;
  imageUrl: string;
  averageCS: number;
  kills: number;
  deaths: number;
  assists: number;
  winRate: number;
  games: number;
  averageGameDuration?: number; // Average game duration in minutes
}

interface TopChampionsProps {
  champions?: ChampionStats[];
  className?: string;
}

export function TopChampions({ 
  champions = [
    { 
      name: "Yasuo", 
      imageUrl: "",
      averageCS: 223,
      kills: 8,
      deaths: 5,
      assists: 9,
      winRate: 58,
      games: 47,
      averageGameDuration: 22
    },
    { 
      name: "Zed", 
      imageUrl: "",
      averageCS: 195,
      kills: 10,
      deaths: 6,
      assists: 7,
      winRate: 53,
      games: 39,
      averageGameDuration: 21
    },
    { 
      name: "Ahri", 
      imageUrl: "",
      averageCS: 210,
      kills: 7,
      deaths: 3,
      assists: 12,
      winRate: 62,
      games: 32,
      averageGameDuration: 25
    },

  ], 
  className 
}: TopChampionsProps) {
  // Calculate KDA for each champion
  const getKdaRatio = (kills: number, deaths: number, assists: number): string => {
    return deaths === 0 ? "Perfect" : ((kills + assists) / deaths).toFixed(2);
  };

  // Calculate CSPM (CS per minute)
  const getCspm = (cs: number, duration: number = 22): string => {
    return (cs / duration).toFixed(1);
  };

  return (
    <div className={cn("flex flex-col h-full w-[350px] bg-white/5 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-blue-300/30 transform hover:scale-105 transition-all duration-300", className)}>
      <h3 className="text-lg font-semibold bg-clip-text text-white mb-3 px-2">Champion Stats (Solo Only)</h3>
      
      <div className="overflow-hidden rounded-lg border border-blue-300/20 bg-blue-900/10 backdrop-blur-sm">
        <Table>
          <TableBody>
            {champions.map((champion, index) => (
              <TableRow key={index} className="border-b border-blue-300/10 last:border-0 hover:bg-blue-400/10">
                <TableCell className="py-2 pl-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={champion.imageUrl || "/api/placeholder/40/40"} 
                        alt={champion.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-blue-100">{champion.name}</span>
                      <span className="text-xs text-blue-200/60">
                        CS {champion.averageCS} ({getCspm(champion.averageCS, champion.averageGameDuration)})
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right pr-3">
                <div className="flex items-center items-end gap-8">
                      <span className="text-xs text-blue-100">{champion.winRate}% WR</span>
                      <span className="text-xs items-end text-blue-200/60">{champion.games} games</span>
                    </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="text-xs text-blue-200/80 flex items-center gap-1">
                      <span className="text-blue-200">{champion.kills}</span>
                      <span className="text-blue-200/50">/</span>
                      <span className="text-red-400">{champion.deaths}</span>
                      <span className="text-blue-200/50">/</span>
                      <span className="text-blue-200">{champion.assists}</span>
                      <span className="text-blue-300/60 ml-1">
                        ({getKdaRatio(champion.kills, champion.deaths, champion.assists)})
                      </span>
                    </div>

                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}