import { cn } from "~/utils";

interface ChampionData {
  name: string;
  winRate: number;
  kda: string;
  imageUrl: string;
}

interface RecentChampionsProps {
  champions?: ChampionData[];
  className?: string;
}

export function RecentChampions({ 
  champions = [
    { 
      name: "Champion 1", 
      winRate: 67, 
      kda: "3.5", 
      imageUrl: "https://www.leagueoflegends.com/en-us/champions/cassiopeia/" 
    },
    { 
      name: "Champion 2", 
      winRate: 54, 
      kda: "2.8", 
      imageUrl: "https://www.leagueoflegends.com/en-us/champions/cassiopeia/" 
    }
  ], 
  className 
}: RecentChampionsProps) {
  return (
    <div className={cn("flex flex-col space-y-4 p-4 h-full justify-center", className)}>
      {champions.map((champion, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-900/40 backdrop-blur-sm border border-blue-300/20 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
              <img 
                src={champion.imageUrl} 
                alt={champion.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="text-blue-100 font-medium">{champion.winRate}% WR</span>
              <span className="text-xs text-blue-300/50">(XW, YL)</span>
            </div>
            <div className="text-blue-200/80 text-sm">
              {champion.kda} KDA
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}