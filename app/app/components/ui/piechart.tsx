import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
} from "./card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart"

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
} satisfies ChartConfig

export function WinLossRatio({ wins = 2, losses = 1 }) {
  const games = wins + losses;
  
  const chartData = [
    { segment: "wins", value: wins, fill: "hsl(212, 100%, 50%)" },
    { segment: "losses", value: losses, fill: "hsl(350, 100%, 66%)" },
  ]

  const winRate = wins > 0 ? Math.round((wins / games) * 100) : 0;

  return (
    <div>
      <div>
        <ChartContainer
          config={chartConfig}
          className="aspect-square min-h-[100px] max-h-[150px]"
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
              strokeWidth={10}
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
                        style={{fill:'white'}}
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy - 12}
                          className="fill-foreground text-3xl text-white font-bold"
                        >
                          {games}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 12}
                          className="fill-muted-foreground text-sm"
                        >
                          Games
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 30}
                          className="fill-foreground text-white font-medium"
                        >
                          {winRate}% WR
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
    </div>
    </div>
  )
}