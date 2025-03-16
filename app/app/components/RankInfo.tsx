interface RankedStatsProps {
  queue?: string;
  tier?: string;
  division?: string;
  lp?: number;
  wins?: number;
  losses?: number;
  isLoading?: boolean;
}

export default function RankedInfo({
  queue = "Ranked Solo",
  tier = "Diamond",
  division = "4",
  lp = 19, 
  wins = 134,
  losses = 128,
}: RankedStatsProps){
  const winRate = Math.round((wins / (wins + losses)) * 100);

  return (
    <div className="w-[350px]">
      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-300/30 transform hover:scale-105 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h3 className="text-white font-medium">{queue}</h3>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16">
              <img 
                src="https://raw.githubusercontent.com/esports-bits/lol_images/master/role_lane_icons/roles/diamond.png" 
                alt="Diamond" 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-white">{tier} {division}</h4>
              <p className="text-white/80">{lp} LP</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-semibold text-white">{wins}W {losses}L</div>
            <div className="text-white/80">{winRate}% Win Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};