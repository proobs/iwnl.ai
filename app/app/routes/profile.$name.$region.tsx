import { useState, useEffect, useMemo } from 'react';
import { useParams } from '@remix-run/react';
import { json } from '@remix-run/node';
import { ChevronLeft, Search, Users, Filter, SortDesc } from 'lucide-react';
import { nanoid } from 'nanoid';
import PlayerCard from '~/components/PlayerCard';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Skeleton } from '~/components/ui/skeleton';
import { Navbar } from 'components/navbar/Navbar';
import { Footer } from '~/components/ui/footer';

type Player = {
  id: number;
  username: string;
  tag?: string;
  region: string;
  rank: string;
  level: number;
  similarity: number;
};

const MOCK_SIMILAR_PLAYERS: Player[] = [
  { id: 1, username: "SummonerKing", tag: "NA1", region: "na", rank: "Diamond II", level: 234, similarity: 98 },
  { id: 2, username: "SummonerQueen", tag: "123", region: "na", rank: "Platinum I", level: 187, similarity: 95 },
  { id: 3, username: "SummonerAce", tag: "456", region: "na", rank: "Gold III", level: 152, similarity: 91 },
  { id: 4, username: "SummonerElite", tag: "789", region: "na", rank: "Silver II", level: 112, similarity: 88 },
  { id: 5, username: "SummonerPro", tag: "ABC", region: "euw", rank: "Platinum IV", level: 204, similarity: 87 },
  { id: 6, username: "SummonerMaster", tag: "DEF", region: "euw", rank: "Diamond IV", level: 221, similarity: 85 },
  { id: 7, username: "SummonerChamp", tag: "GHI", region: "euw", rank: "Gold I", level: 178, similarity: 82 },
  { id: 8, username: "SummonerLegend", tag: "JKL", region: "kr", rank: "Master", level: 305, similarity: 80 },
  { id: 9, username: "SummonerHero", tag: "MNO", region: "kr", rank: "Challenger", level: 412, similarity: 78 },
  { id: 10, username: "SummonerNova", tag: "PQR", region: "kr", rank: "Diamond I", level: 276, similarity: 75 },
];

type ProfileParams = {
  uuid: string;
  NAME: string;
  region: string;
  [key: string]: string;
};

// loader function, fetches data for this route
export const loader = async ({ params }: { params: ProfileParams }) => {
  // return data as JSON
  return json({ message: "Hello, world!" });
};

export default function Profile() {
  // Destructure params with a default value for region
  const { name, region = "na" } = useParams<ProfileParams>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>(MOCK_SIMILAR_PLAYERS);

  // Generate stable keys for skeleton items using nanoid
  const skeletonKeys = useMemo(() => {
    return Array.from({ length: 5 }).map(() => nanoid());
  }, []);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Compute content to render to avoid nested ternaries
  let content;
  if (isLoading) {
    content = skeletonKeys.map((key) => (
      <Skeleton key={key} className="h-24 w-full rounded-xl" />
    ));
  } else if (filteredPlayers.length > 0) {
    content = filteredPlayers.map((player) => (
      <PlayerCard
        key={player.id}
        username={player.username}
        tag={player.tag}
        region={player.region}
        rank={player.rank}
        level={player.level}
        similarity={player.similarity}
        className={`animate-fade-in delay-${player.id * 50}`}
      />
    ));
  } else {
    content = (
      <div className="text-center py-12">
        <p className="text-lg font-medium text-white">No players found</p>
        <p className="text-white mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-br from-blue-300 via-blue-400 to-purple-500 overflow-auto">
      <header className="sticky top-0 z-50 bg-transparent">
        <Navbar />
      </header>
      <main className="flex-1 container mx-auto px-4 py-8 animate-fade-up">
        <div className="max-w-6xl mx-auto">
          {/* Profile header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-white mb-2">
              <a href="/" className="text-white">Player Search</a>
              <ChevronLeft className="h-4 w-4 text-white" />
              <span className="font-medium text-white">Similar Usernames</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {isLoading ? (
                <Skeleton className="h-10 w-64 rounded-md" />
              ) : (
                <span>
                  Players Similar to <span className="text-white">{name}</span>
                </span>
              )}
            </h1>

            <p className="mt-3 text-white max-w-2xl">
              {isLoading ? (
                <>
                  <Skeleton className="h-4 w-full rounded-md mb-2" />
                  <Skeleton className="h-4 w-3/4 rounded-md" />
                </>
              ) : (
                <>
                  Showing players with similar usernames to {name} in {region.toUpperCase()}.
                  Click on a player to view their detailed profile and stats.
                </>
              )}
            </p>
          </div>

          {/* Player list */}
          <div className="space-y-4 bg-white/15 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-300/30">
            {content}
          </div>
        </div>
      </main>

      <div className="mt-auto" />
      <footer className="mt-auto w-full bg-white/5 backdrop-blur-sm border-t border-white/10">
        <Footer
          companyName="IWNL"
          copyright={`© ${new Date().getFullYear()} All rights reserved.`}
        />
      </footer>
    </div>
  );
}
