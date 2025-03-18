import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart";
import { cn } from "~/utils";

const chartConfig = {
  games: {
    label: "Games",
  },
  wins: {
    label: "Wins",
    color: "hsl(212, 100%, 50%)",
  },
  losses: {
    label: "Losses",
    color: "hsl(350, 100%, 66%)",
  },
} satisfies ChartConfig;

interface WinLossRatioProps {
  wins?: number;
  losses?: number;
  className?: string;
}

export function WinLossRatio({ wins = 12, losses = 6, className }: WinLossRatioProps) {
  const games = wins + losses;
  
  const chartData = [
    { segment: "wins", value: wins, fill: "hsl(212, 100%, 50%)" },
    { segment: "losses", value: losses, fill: "hsl(350, 100%, 66%)" },
  ];

  const winRate = wins > 0 ? Math.round((wins / games) * 100) : 0;

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <ChartContainer
        config={chartConfig}
        className="aspect-square h-[150px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="segment"
            innerRadius={50}
            strokeWidth={4}
            stroke="transparent"
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy - 12}
                        className="text-3xl font-bold fill-white"
                      >
                        {games}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 12}
                        className="text-sm fill-blue-300/80"
                      >
                        Games
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 30}
                        className="text-white font-medium fill-white"
                      >
                        {winRate}% WR
                      </tspan>
                    </text>
                  );
                }
                return null;
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}