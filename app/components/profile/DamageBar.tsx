import React from 'react';
import type { Player } from './types';

interface DamageBarProps {
  player: Player;
  maxDamage: number;
}

export const DamageBar: React.FC<DamageBarProps> = ({ player, maxDamage }) => {
  const damagePercent = (player.damage.dealt / maxDamage) * 100;
  const damageBarWidth = `${Math.min(damagePercent, 100)}%`;

  return (
    <div className="flex items-center space-x-4 w-[350px]">
      <div className="flex-1">
        <div className="relative h-2 bg-gray-200 rounded overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-red-500 transition-all duration-300"
            style={{ width: damageBarWidth }}
          />
        </div>
        
        <div className="flex justify-between text-xs mt-1">
          <span>{player.damage.dealt.toLocaleString()}</span>
        </div>
      </div>
     
    </div>
  );
};
