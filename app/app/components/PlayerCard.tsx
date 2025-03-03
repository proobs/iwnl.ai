
import React from 'react';
import { Link } from '@remix-run/react';
import { CircleUser, Award, Shield, ArrowRight } from 'lucide-react';
import { cn } from "~/lib/utils"
interface PlayerCardProps {
    username: string;
    tag?: string;
    region: string;
    rank?: string;
    level?: number;
    similarity?: number;
    avatarUrl?: string;
    className?: string;
  }
  
  const PlayerCard: React.FC<PlayerCardProps> = ({
    username,
    tag,
    region,
    rank = "Unranked",
    level = 1,
    similarity = 100,
    avatarUrl,
    className,
  }) => {
    const displayName = tag ? `${username}#${tag}` : username;
    const profileUrl = tag
      ? `/profile/${encodeURIComponent(username)}.${encodeURIComponent(tag)}.${region}`
      : `/profile/${encodeURIComponent(username)}.${region}`;
  
    return (
      <div
        className={cn(
          "rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md",
          className
        )}
      >
        <div className="flex items-center p-4 gap-4">
          <div className="flex-shrink-0 relative">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={username}
                className="h-14 w-14 rounded-full object-cover border-2 border-blue-100 shadow-sm"
              />
            ) : (
              <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center border border-blue-200 shadow-sm">
                <CircleUser className="h-8 w-8 text-blue-400" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs font-medium px-1.5 py-0.5 rounded-full shadow-sm">
              {region.toUpperCase()}
            </div>
          </div>
  
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate text-blue-800" title={displayName}>
              {displayName}
            </h3>
  
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-blue-500">
              <div className="flex items-center gap-1">
                <Shield className="h-3.5 w-3.5" />
                <span>{rank}</span>
              </div>
  
              <div className="flex items-center gap-1">
                <Award className="h-3.5 w-3.5" />
                <span>Level {level}</span>
              </div>
  
              {similarity < 100 && (
                <div className="flex items-center gap-1">
                  <span className="text-blue-600 font-medium">{similarity}% Match</span>
                </div>
              )}
            </div>
          </div>
  
          <Link
            to={profileUrl}
            className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors border border-blue-200"
          >
            <ArrowRight className="h-4 w-4 text-blue-600" />
          </Link>
        </div>
      </div>
    );
  };
  
  export default PlayerCard;
  