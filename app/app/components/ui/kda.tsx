import { cn } from "~/utils";

interface KDAProps {
  kills?: number;
  deaths?: number;
  assists?: number;
  className?: string;
}

export function KDA({ kills = 5, deaths = 2, assists = 7, className }: KDAProps) {
  const kdaRatio = deaths > 0 ? ((kills + assists) / deaths).toFixed(2) : "Perfect";

  return (
    <div className={cn("flex flex-col items-center justify-center h-full p-4", className)}>
      <div className="text-3xl font-bold tracking-tighter mb-1 bg-clip-text text-white">
        {kdaRatio}
      </div>
      <div className="text-sm text-blue-200/80 mb-3">KDA</div>
      <div className="flex items-center justify-center space-x-1">
        <span className="text-white font-medium">{kills}</span>
        <span className="text-white">/</span>
        <span className="text-white font-medium">{deaths}</span>
        <span className="text-white">/</span>
        <span className="text-white font-medium">{assists}</span>
      </div>
    </div>
  );
}