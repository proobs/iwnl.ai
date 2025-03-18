import React, { FC, useState } from "react";
import type { GamebarProps, Side, Player, GameStats } from "./types";
import { DamageBar } from "./DamageBar";
import { Award, Crown, Shield, Swords } from "lucide-react";
export interface PlayerCardProps {
  player: Player;
  role: string;
  teamColor: "red" | "blue";
  maxDamage: number;
}

function truncate(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
function truncate2(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + " " : text;
}

const PlayerCard: FC<PlayerCardProps> = ({ player, role, teamColor, maxDamage }) => {
  return (
    <div className={`player-card ${teamColor} p-2 rounded-md mb-1 hover:bg-opacity-80 transition-all duration-200`}>
      <div className="flex flex-row items-center space-x-5">
        <img src={player.role_icon} className="w-4 h-4" alt={role} />
        <img src={player.champIcon} alt={`${role} champion`} className="w-5 h-5" />
        <p className="font-medium">{
        truncate2(player.summonerName, 8)} </p>
        <p className="text-sm opacity-90">{player.stats.join("/")}</p>
        <DamageBar key={role} player={player} maxDamage={maxDamage} />
        <div className="flex space-x-1 ml-auto">
          {player.items?.slice(0, 6).map((item, index) => (
            <div key={index} className="w-5 h-5 border rounded overflow-hidden">
              <img src={item} alt={`Item ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
          <img src={player.ward_type} alt="Ward" className="w-5 h-5 object-cover rounded" />
        </div>
      </div>
    </div>
  );
};

const Players: FC<PlayerCardProps> = ({ player, role, teamColor }) => {
  return (
    <div className={`player-card ${teamColor} flex items-center space-x-2 p-.5 rounded hover:bg-opacity-90 transition-all duration-200`}>
      <img src={player.champIcon} alt={`${role} champion`} className="w-5 h-5" />
      <p className="text-xs font-medium">{truncate(player.summonerName, 8)}</p>
    </div>
  );
};

const renderPlayers = (side: Side, teamColor: "red" | "blue", maxDamage: number) => (
  <div className="flex flex-col space-y-1">
    <PlayerCard player={side.top} role="top" teamColor={teamColor} maxDamage={maxDamage} />
    <PlayerCard player={side.jungle} role="jungle" teamColor={teamColor} maxDamage={maxDamage}/>
    <PlayerCard player={side.mid} role="mid" teamColor={teamColor} maxDamage={maxDamage}/>
    <PlayerCard player={side.bot} role="bot" teamColor={teamColor} maxDamage={maxDamage} />
    <PlayerCard player={side.support} role="support" teamColor={teamColor} maxDamage={maxDamage}/>
  </div>
);

const renderPlayers2 = (side: Side, teamColor: "red" | "blue", maxDamage: number) => (
  <div className="flex flex-col space-y-0.5">
    <Players player={side.top} role="top" teamColor={teamColor}  maxDamage={maxDamage} />
    <Players player={side.jungle} role="jungle" teamColor={teamColor}  maxDamage={maxDamage} />
    <Players player={side.mid} role="mid" teamColor={teamColor}  maxDamage={maxDamage} />
    <Players player={side.bot} role="bot" teamColor={teamColor}  maxDamage={maxDamage} />
    <Players player={side.support} role="support" teamColor={teamColor}  maxDamage={maxDamage} />
  </div>
);

const renderObjectives = (stats: GameStats) => (
  <div className="flex items-center space-x-3">
    <h1 className="mr-[200px]"> KDA</h1>
    <div className="flex items-center space-x-1">
      <Swords className="w-4 h-4" />
      <span>{stats.objectives.dragons}</span>
    </div>
    <div className="flex items-center space-x-1">
      <Award className="w-4 h-4" />
      <span>{stats.objectives.barons}</span>
    </div>
    <div className="flex items-center space-x-1">
      <Shield className="w-4 h-4" />
      <span>{stats.objectives.towers}</span>
    </div>

  </div>
);

export const Gamebar: FC<GamebarProps> = ({
  champIcon,
  gameType,
  gameTime,
  gameMode,
  stats,
  creepScore,
  visionScore,
  timeAgo,
  runePrimary,
  runeSecondary,
  summonerSpells = ["", ""],
  items = ["", "", "", "", "", ""],
  level,
  sides,
  kill_participation,
  ward_type,
  damage,
  badges = [],
  opScore,
  opRank,
  gameStats,
}) => {
  const [expanded, setExpanded] = useState(false);

  const parseTimeToMinutes = (time: string): number => {
    const parts = time.split(":").map(Number);
    if (parts.length === 2) {
      const [minutes, seconds] = parts;
      return minutes + seconds / 60;
    }
    return 0;
  };

  const minutes = parseTimeToMinutes(gameTime);
  const csPerMin = minutes > 0 ? creepScore / minutes : 0;

  const getGameResult = (gameType: number): "REMAKE" | "LOSS" | "WIN" => {
    if (gameType === -1) return "REMAKE";
    if (gameType === 0) return "LOSS";
    return "WIN";
  };
  
  const bgColorMap: Record<"REMAKE" | "LOSS" | "WIN", string> = {
    WIN: "bg-green-500",
    LOSS: "bg-red-500",
    REMAKE: "bg-gray-500",
  };
  
  const gameResult = getGameResult(gameType);
  const bgColor = bgColorMap[gameResult];

  const maxDamage = Math.max(
    ...Object.values(sides.blue).map((player) => player.damage.dealt),
    ...Object.values(sides.red).map((player) => player.damage.dealt)
  );

  return (
    <div className="flex flex-col items-center w-[800px] mx-auto">
      <div
        className={`w-full ${bgColor} rounded-lg ${
          expanded ? "rounded-b-none" : ""
        } shadow-lg transition-all duration-300`}
      >
        <div
          className="h-[120px] flex items-center p-4 cursor-pointer hover:brightness-105 transition-all duration-200"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="ml-2 text-white">
            <h3 className="text-lg font-bold">{gameMode}</h3>
            <p className="text-xs opacity-90">{timeAgo}</p>
            <p className="text-md mt-2">
              <span className="font-bold">{gameResult}</span> {gameTime}
            </p>
          </div>

          <div className="relative w-16 h-16 ml-4">
            <img
              src={champIcon}
              alt="Champion Icon"
              className="w-full h-full rounded-full border-2 border-white/30"
            />
            <div className="absolute -bottom-1 -right-1 bg-black/80 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {level}
            </div>
          </div>

          <div className="flex flex-col mr-4 space-y-1">
            <div className="flex space-x-1">
              <div className="w-5 h-5 rounded overflow-hidden border border-white/30">
                <img
                  src={runePrimary}
                  alt="Rune Primary"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-5 h-5 rounded overflow-hidden border border-white/30">
                <img
                  src={summonerSpells[0]}
                  alt="Summoner Spell 1"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex space-x-1">
              <div className="w-5 h-5 rounded overflow-hidden border border-white/30">
                <img
                  src={runeSecondary}
                  alt="Rune Secondary"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-5 h-5 rounded overflow-hidden border border-white/30">
                <img
                  src={summonerSpells[1]}
                  alt="Summoner Spell 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="ml-4 text-white">
            <h3 className="text-2xl font-bold">
              {stats[0]}/{stats[1]}/{stats[2]}
            </h3>
            <p className="text-sm opacity-90">P/Kill {kill_participation}%</p>
            <p className="text-sm opacity-90">
              CS {creepScore} ({csPerMin.toFixed(1)})
            </p>
            <p className="text-sm opacity-90">Vision {visionScore}</p>
          </div>

          <div className="ml-4 grid grid-cols-[auto_auto] gap-x-4 items-center">
            <div className="space-y-1">
              <div className="flex space-x-1">
                {items?.slice(0, 3).map((item, index) => (
                  <div key={index} className="w-5 h-5 rounded overflow-hidden border border-white/30">
                    <img
                      src={item}
                      alt={`Item ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {ward_type && (
                  <div className="w-5 h-5 rounded overflow-hidden border border-white/30">
                    <img
                      src={ward_type}
                      alt="Ward Choice"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="flex space-x-1">
                {items?.slice(3, 6).map((item, index) => (
                  <div key={index + 3} className="w-5 h-5 rounded overflow-hidden border border-white/30">
                    <img
                      src={item}
                      alt={`Item ${index + 4}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-4 text-white ml-6">
              <div className="flex flex-col">
                {renderPlayers2(sides.blue, "blue", maxDamage)}
              </div>
              <div className="flex flex-col">
                {renderPlayers2(sides.red, "red", maxDamage)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 bg-transparent">
          {badges?.map((badge, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                badge === "MVP"
                  ? "bg-yellow-400 text-black"
                  : badge === "ACE"
                  ? "bg-purple-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {badge}
            </span>
          ))}

          <div className="flex items-center space-x-2">
            <span className="text-white/80">AI Score</span>
            <span className="text-lg font-bold text-white">
              {opScore.toFixed(1)}
            </span>
            <span className="px-2 py-1 bg-white/10 rounded text-sm text-white">
              {opRank}
            </span>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="w-full text-black animate-accordion-down shadow-lg">
          <div className="flex flex-col">
            <div className="bg-blue-100 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold">Blue Team</h4>
                <div className="flex items-center space-x-4">
                  {renderObjectives(gameStats.blue)}
                  <div className="text-sm">
                    <span className="ml-4">
                      Total Kills: {gameStats.blue.totalKills}
                    </span>
                    <span className="ml-4">
                      Total Gold: {gameStats.blue.totalGold.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                {renderPlayers(sides.blue, "blue", maxDamage)}
              </div>
            </div>

            <div className="bg-red-100 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold"> Red Team </h4>
                <div className="flex items-center space-x-4">
                  
                  {renderObjectives(gameStats.red)}
                  <div className="text-sm">
                    <span className="ml-4">
                      Total Kills: {gameStats.red.totalKills}
                    </span>
                    <span className="ml-4">
                      Total Gold: {gameStats.red.totalGold.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                {renderPlayers(sides.red, "red", maxDamage)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};