import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { AlertTriangle } from "lucide-react";

interface ProfileHeaderProps {
  summonerName?: string;
  level?: number;
  rank?: string;
  lp?: number;
  tier?: string;
  server?: string;
  ladderRank?: number;
  ladderTop?: number;
}

export default function ProfileHeader({
  summonerName,
  level,
  rank,
  lp,
  tier,
  server,
  ladderRank,
  ladderTop, 
}: ProfileHeaderProps){
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`w-full max-w-5xl mx-auto transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="flex items-center gap-6 px-2 py-4">
        <div className="relative">
          <div className="w-28 h-28 rounded-lg border-2 border-lol-blue/70 bg-lol-blue/20">
            {/* <img
              src="public/lovable-uploads/d8c71ac0-abae-461f-9a77-cae9678a9079.png"
              alt="Champion"
              className="w-full h-full object-cover"
            /> */}
            <div className="absolute bottom-0 left-0 w-full bg-black/50 text-center py-1 text-white text-sm font-bold">
              {level}
            </div>
          </div>
        </div>
        
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-white">{summonerName}</h1>
            <Badge className="ml-2 px-3 py-1 bg-blue-500/60 hover:bg-blue-600 text-white border-none">
              #{server}
            </Badge>
          </div>
          
          <div className="text-white/80 text-sm">
            Ladder Rank {ladderRank} (top {ladderTop}%)
          </div>
          
          <div className="pt-2">
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium"
              variant="default"
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};