import { Gamebar } from "components/profile/Gamebar";
import type { GamebarProps } from "components/profile/types";

const dummyData: GamebarProps = {
  champIcon: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/Yasuo.png",
  id: "match123",
  level: 18,
  gameType: 1,
  stats: [15, 3, 12],
  creepScore: 289,
  visionScore: 35,
  gameTime: "35:42",
  gameMode: "Ranked Solo",
  timeAgo: "2 hours ago",
  runePrimary: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Conqueror/Conqueror.png",
  runeSecondary: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/Resolve.png",
  summonerSpells: [
    "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/spell/SummonerFlash.png",
    "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/spell/SummonerIgnite.png"
  ],
  items: [
    "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3153.png",
    "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/6673.png",
    "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3033.png",
    "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3006.png",
    "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/6676.png",
    "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3072.png"
  ],
  ward_type: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3364.png",
  kill_participation: 65,
  damage: {
    dealt: 32400,
    taken: 24800
  },
  sides: {
    blue: {
      top: {
        champIcon: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/Darius.png",
        role_icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top.png",
        summonerName: "TopDiff",
        stats: [8, 4, 6],
        items: [
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3153.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/6673.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3033.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3006.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/6676.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3072.png"
        ],
        ward_type: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3364.png",
        kill_participation: 45,
        damage: {
          dealt: 24500,
          taken: 18900
        },
        wards: {
          placed: 12,
          destroyed: 3
        },
        creepScore: 245,
        level: 16,
        rankTier: "PLATINUM",
        opScore: 8.5,
        opRank: "ACE"
      },
      jungle: {
        champIcon: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/LeeSin.png",
        role_icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-jungle.png",
        summonerName: "JungleDiff",
        stats: [10, 2, 15],
        items: [
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/6693.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3071.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3111.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3742.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3143.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3075.png"
        ],
        ward_type: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3364.png",
        kill_participation: 75,
        damage: {
          dealt: 18900,
          taken: 22400
        },
        wards: {
          placed: 15,
          destroyed: 4
        },
        creepScore: 189,
        level: 17,
        rankTier: "DIAMOND",
        opScore: 9.2,
        opRank: "MVP"
      },
      mid: {
        champIcon: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/Yasuo.png",
        role_icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle.png",
        summonerName: "MidGap",
        stats: [15, 3, 12],
        items: [
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3153.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/6673.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3033.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3006.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/6676.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3072.png"
        ],
        ward_type: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3364.png",
        kill_participation: 65,
        damage: {
          dealt: 32400,
          taken: 19800
        },
        wards: {
          placed: 10,
          destroyed: 2
        },
        creepScore: 289,
        level: 18,
        rankTier: "DIAMOND",
        opScore: 9.8,
        opRank: "MVP"
      },
      bot: {
        champIcon: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/Jinx.png",
        role_icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-bottom.png",
        summonerName: "ADCARRY",
        stats: [20, 5, 8],
        items: [
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3006.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3094.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3031.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3072.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3086.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3036.png"
        ],
        ward_type: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3364.png",
        kill_participation: 80,
        damage: {
          dealt: 42100,
          taken: 16700
        },
        wards: {
          placed: 8,
          destroyed: 1
        },
        creepScore: 320,
        level: 18,
        rankTier: "MASTER",
        opScore: 10.0,
        opRank: "MVP"
      },
      support: {
        champIcon: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/Leona.png",
        role_icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png",
        summonerName: "SuppGOD",
        stats: [3, 8, 22],
        items: [
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3069.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3190.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3107.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3096.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3158.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/2065.png"
        ],
        ward_type: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3364.png",
        kill_participation: 90,
        damage: {
          dealt: 8900,
          taken: 28700
        },
        wards: {
          placed: 25,
          destroyed: 10
        },
        creepScore: 50,
        level: 15,
        rankTier: "DIAMOND",
        opScore: 7.8,
        opRank: "ACE"
      }
    },
    red: {
      top: {
        champIcon: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/Garen.png",
        role_icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top.png",
        summonerName: "GarenOP",
        stats: [5, 6, 3],
        items: [
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/6035.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3071.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3065.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3026.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3053.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3102.png"
        ],
        ward_type: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3364.png",
        kill_participation: 30,
        damage: {
          dealt: 22100,
          taken: 21400
        },
        wards: {
          placed: 7,
          destroyed: 2
        },
        creepScore: 210,
        level: 15,
        rankTier: "GOLD",
        opScore: 6.9,
        opRank: ""
      },
      jungle: {
        champIcon: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/MasterYi.png",
        role_icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-jungle.png",
        summonerName: "YiJungle",
        stats: [7, 7, 5],
        items: [
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/1419.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3071.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3006.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3022.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3053.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3102.png"
        ],
        ward_type: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3364.png",
        kill_participation: 40,
        damage: {
          dealt: 25700,
          taken: 23600
        },
        wards: {
          placed: 9,
          destroyed: 3
        },
        creepScore: 190,
        level: 16,
        rankTier: "PLATINUM",
        opScore: 7.5,
        opRank: ""
      },
      mid: {
        champIcon: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/Zed.png",
        role_icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle.png",
        summonerName: "OnlyZed",
        stats: [9, 5, 4],
        items: [
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3153.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3071.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3147.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3006.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3036.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3102.png"
        ],
        ward_type: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3364.png",
        kill_participation: 50,
        damage: {
          dealt: 31200,
          taken: 19800
        },
        wards: {
          placed: 6,
          destroyed: 1
        },
        creepScore: 250,
        level: 17,
        rankTier: "DIAMOND",
        opScore: 8.2,
        opRank: "ACE"
      },
      bot: {
        champIcon: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/Vayne.png",
        role_icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-bottom.png",
        summonerName: "VayneADC",
        stats: [12, 6, 2],
        items: [
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3006.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3094.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3031.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3072.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3086.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3036.png"
        ],
        ward_type: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3364.png",
        kill_participation: 55,
        damage: {
          dealt: 38900,
          taken: 21100
        },
        wards: {
          placed: 5,
          destroyed: 0
        },
        creepScore: 290,
        level: 18,
        rankTier: "DIAMOND",
        opScore: 8.9,
        opRank: ""
      },
      support: {
        champIcon: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/Brand.png",
        role_icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png",
        summonerName: "BrandSup",
        stats: [4, 10, 8],
        items: [
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3158.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3006.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3107.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3116.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3152.png",
          "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/2055.png"
        ],
        ward_type: "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/3364.png",
        kill_participation: 60,
        damage: {
          dealt: 15600,
          taken: 25900
        },
        wards: {
          placed: 18,
          destroyed: 6
        },
        creepScore: 60,
        level: 14,
        rankTier: "GOLD",
        opScore: 6.5,
        opRank: ""
      }
    }
  },
  gameStats: {
    blue: {
      totalKills: 47,
      totalGold: 64500,
      objectives: {
        dragons: 3,
        barons: 1,
        towers: 8,
        inhibitors: 2
      }
    },
    red: {
      totalKills: 27,
      totalGold: 52300,
      objectives: {
        dragons: 1,
        barons: 0,
        towers: 3,
        inhibitors: 0
      }
    }
  },
  badges: ["MVP", "Double Kill", "Unstoppable"],
  opScore: 9.8,
  opRank: "MVP"
};