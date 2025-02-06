import React, { FC, useState } from "react";
import { PlayerCardProps, GamebarProps, Side } from "./types";

const PlayerCard: FC<PlayerCardProps> = ({ player, role, teamColor }) => {
  return (
    <div className={`player-card ${teamColor}`}>
      <div className="flex flex-row ml-2">
        <img src={player.role_icon} className="w-3 h-3 mr-2" />
        <img
          src={player.champIcon}
          alt={`${role} champion`}
          className="w-4 h-4 mr-2"
        />
        <p>{player.summonerName}</p>
        <p>KDA: {player.stats.join("/")}</p>
        {/* Render damage */}

        {/* Render player items */}
        <div className="flex space-x-1">
          {player.items.slice(0, 6).map((item, index) => (
            <div key={index} className="w-4 h-4 border overflow-hidden ml-2">
              <img
                src={item}
                alt={`Item ${index + 1}`}
                className="w-4 h-4 object-cover"
              />
            </div>
          ))}
          <img
            src={player.ward_type}
            alt={`Ward`}
            className="w-4 h-4 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

function truncate(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

// The PlayerCard component renders individual player stats.
const Players: FC<PlayerCardProps> = ({ player, role, teamColor }) => {
  return (
    <div className={`player-card ${teamColor} flex flex-row`}>
      <img
        src={player.champIcon}
        alt={`${role} champion`}
        className="w-5 h-5 mr-2"
      />
      <p className="text-xs">{truncate(player.summonerName, 8)}</p>
    </div>
  );
};

// The Gamebar component renders a summary of the match.
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
  summonerSpells,
  items,
  level,
  sides,
  kill_participation,
  ward_type,
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
  // Compute game result as a string based on the gameType
  const gameResult =
    gameType === -1 ? "REMAKE" : gameType === 0 ? "LOSS" : "WIN";

  // Set background color based on gameResult
  const bgColor =
    gameResult === "WIN"
      ? "bg-green-500"
      : gameResult === "LOSS"
      ? "bg-red-500"
      : "bg-gray-500";

  // Helper function to render players for a given side
  const renderPlayers = (side: Side, teamColor: "red" | "blue") => (
    <div className="flex flex-col">
      <PlayerCard player={side.top} role="top" teamColor={teamColor} />
      <PlayerCard player={side.jungle} role="jungle" teamColor={teamColor} />
      <PlayerCard player={side.mid} role="mid" teamColor={teamColor} />
      <PlayerCard player={side.bot} role="bot" teamColor={teamColor} />
      <PlayerCard player={side.support} role="support" teamColor={teamColor} />
    </div>
  );

  const renderPlayers2 = (side: Side, teamColor: "red" | "blue") => (
    <div>
      <Players player={side.top} role="top" teamColor={teamColor} />
      <Players player={side.jungle} role="jungle" teamColor={teamColor} />
      <Players player={side.mid} role="mid" teamColor={teamColor} />
      <Players player={side.bot} role="bot" teamColor={teamColor} />
      <Players player={side.support} role="support" teamColor={teamColor} />
    </div>
  );

  return (
    <div className="flex flex-col items-center w-[700px] mx-auto">
      <div
        className={`w-full h-[120px] ${bgColor} rounded-lg flex items-center p-4 cursor-pointer`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="ml-2 text-white">
          <h3 className="text-lg font-bold">{gameMode}</h3>
          <p className="text-xs">{timeAgo}</p>
          <br />
          <p className="text-md">
            <b>{gameResult}</b> {gameTime}
          </p>
        </div>
        <div className="relative w-16 h-16 mr-2">
          <img
            src={champIcon}
            alt="Champion Icon"
            className="w-19 h-19 rounded-full"
          />
          <div className="absolute bottom-0 right-0 bg-black text-white text-xs font-bold px-1 py-0.5 rounded">
            {level}
          </div>
        </div>
        {/* Runes and Summoner Spells */}
        <div className="flex flex-col mr-4">
          {/* Runes Row */}
          <div className="flex space-x-1">
            <div className="w-4 h-4 border border-white rounded overflow-hidden">
              <img
                src={runePrimary}
                alt="Rune Primary"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-4 h-4 border border-white rounded overflow-hidden">
              <img
                src={runeSecondary}
                alt="Rune Secondary"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Summoner Spells Row */}
          <div className="flex space-x-1 mt-1">
            <div className="w-4 h-4 border border-white rounded overflow-hidden">
              <img
                src={summonerSpells[0]}
                alt="Summoner Spell 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-4 h-4 border border-white rounded overflow-hidden">
              <img
                src={summonerSpells[1]}
                alt="Summoner Spell 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Text Information */}
        <div className="ml-4 text-white">
          <p className="text-sm">
            {/* KDA */}
            <h3 className="text-xl font-bold">
              {stats[0]}/{stats[1]}/{stats[2]}
            </h3>
            {/* Kill Participation */}
            <p className="text-xs">P/Kill {kill_participation}%</p>

            {/* CS and CS per Minute */}
            <p className="text-xs">
              CS {creepScore} ({csPerMin.toFixed(1)})
            </p>

            {/* Vision Score */}
            <p className="text-xs">Vision {visionScore}</p>
          </p>
        </div>

        {/* Items and Ward Choice */}
        <div className="ml-4 grid grid-cols-[auto_auto] gap-x-2 items-center">
          {/* Items and Ward */}
          <div>
            {/* Items 1-3 + Ward */}
            <div className="flex space-x-1">
              {items.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="w-4 h-4 border border-white overflow-hidden"
                >
                  <img
                    src={item}
                    alt={`Item ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {/* Ward Choice */}
              <div className="w-4 h-4 border border-white rounded overflow-hidden">
                <img
                  src={ward_type}
                  alt="Ward Choice"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Items 4-6 */}
            <div className="flex space-x-1 mt-1">
              {items.slice(3, 6).map((item, index) => (
                <div
                  key={index + 3}
                  className="w-4 h-4 border border-white rounded overflow-hidden"
                >
                  <img
                    src={item}
                    alt={`Item ${index + 4}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* blue team vs red team names, in the future cut off the teamnames for mobile view */}
          <div className="flex flex-row justify-center text-white space-x-1 ml-6">
            <div className="flex flex-col ">
              {renderPlayers2(sides.blue, "blue")}
            </div>
            <div className="flex flex-col">
              {renderPlayers2(sides.red, "red")}
            </div>
          </div>
        </div>
      </div>
      {/* Expanded view for detailed player stats */}
      {expanded && (
        <div className="w-full text-black">
          <div className="bg-blue-200">
            <h4 className="text-lg font-bold">Blue Team</h4>
            {renderPlayers(sides.blue, "blue")}
          </div>
          <div className="bg-red-200">
            <h4 className="text-lg font-bold mt-2">Red Team</h4>
            {renderPlayers(sides.red, "red")}
          </div>
        </div>
      )}
    </div>
  );
};
