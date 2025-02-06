import type { MetaFunction } from "@remix-run/node";
import { Gamebar } from "../components/profile/Gamebar";
import { GamebarProps } from "~/components/profile/types";
// Dummy data matching the GamebarProps interface

const dummyData: GamebarProps = {
  champIcon:
    "https://i.pinimg.com/736x/0f/85/3e/0f853ec14887af0e28022e9cc7aa94c6.jpg",
  id: "match123",
  level: 20,
  gameType: -1, // 1 = win, 0 = loss, -1 = remake (literal 1 is acceptable)
  stats: [12, 4, 9],
  creepScore: 200,
  visionScore: 35,
  gameTime: "32:15",
  gameMode: "Ranked Solo",
  timeAgo: "1 hour ago",
  runePrimary: "https://via.placeholder.com/40?text=Rune+Primary",
  runeSecondary: "https://via.placeholder.com/40?text=Rune+Secondary",
  summonerSpells: [
    "https://via.placeholder.com/30?text=Flash",
    "https://via.placeholder.com/30?text=Ignite",
  ],
  items: [
    "https://via.placeholder.com/20?text=Item1",
    "https://via.placeholder.com/20?text=Item2",
    "https://via.placeholder.com/20?text=Item3",
    "https://via.placeholder.com/20?text=Item4",
    "https://via.placeholder.com/20?text=Item5",
    "https://via.placeholder.com/20?text=Item6",
  ],
  ward_type: "Control Ward",
  kill_participation: 80,
  sides: {
    blue: {
      top: {
        champIcon: "https://via.placeholder.com/40?text=Blue+Top",
        summonerName: "BlueTop",
        stats: [10, 3, 7],
        items: [
          "https://via.placeholder.com/20?text=ItemA",
          "https://via.placeholder.com/20?text=ItemA",
          "https://via.placeholder.com/20?text=ItemA",
          "https://via.placeholder.com/20?text=ItemA",
          "https://via.placeholder.com/20?text=ItemA",
          "https://via.placeholder.com/20?text=ItemA",
        ],
        kill_participation: 75,
        damage: 25000,
        wards: 10,
      },
      jungle: {
        champIcon:
          "https://i.pinimg.com/736x/0f/85/3e/0f853ec14887af0e28022e9cc7aa94c6.jpg",
        summonerName: "BlueJungle",
        stats: [8, 4, 10],
        items: ["https://via.placeholder.com/20?text=ItemB"],
        kill_participation: 70,
        damage: 23000,
        wards: 12,
      },
      mid: {
        champIcon: "https://via.placeholder.com/40?text=Blue+Mid",
        summonerName: "BlueMid",
        stats: [12, 2, 11],
        items: ["https://via.placeholder.com/20?text=ItemC"],
        kill_participation: 85,
        damage: 27000,
        wards: 8,
      },
      bot: {
        champIcon: "https://via.placeholder.com/40?text=Blue+Bot",
        summonerName: "BlueBot",
        stats: [7, 5, 6],
        items: ["https://via.placeholder.com/20?text=ItemD"],
        kill_participation: 65,
        damage: 22000,
        wards: 9,
      },
      support: {
        champIcon: "https://via.placeholder.com/40?text=Blue+Support",
        summonerName: "BlueSupport",
        stats: [2, 6, 14],
        items: ["https://via.placeholder.com/20?text=ItemE"],
        kill_participation: 90,
        damage: 12000,
        wards: 20,
      },
    },
    red: {
      top: {
        champIcon: "https://via.placeholder.com/40?text=Red+Top",
        summonerName: "RedTop",
        stats: [9, 4, 8],
        items: ["https://via.placeholder.com/20?text=ItemF"],
        kill_participation: 70,
        damage: 24000,
        wards: 11,
      },
      jungle: {
        champIcon: "https://via.placeholder.com/40?text=Red+Jungle",
        summonerName: "RedJungle",
        stats: [6, 8, 7],
        items: ["https://via.placeholder.com/20?text=ItemG"],
        kill_participation: 68,
        damage: 21000,
        wards: 14,
      },
      mid: {
        champIcon: "https://via.placeholder.com/40?text=Red+Mid",
        summonerName: "RedMid",
        stats: [11, 3, 10],
        items: ["https://via.placeholder.com/20?text=ItemH"],
        kill_participation: 82,
        damage: 26000,
        wards: 10,
      },
      bot: {
        champIcon: "https://via.placeholder.com/40?text=Red+Bot",
        summonerName: "RedBot",
        stats: [8, 7, 5],
        items: ["https://via.placeholder.com/20?text=ItemI"],
        kill_participation: 60,
        damage: 23000,
        wards: 8,
      },
      support: {
        champIcon: "https://via.placeholder.com/40?text=Red+Support",
        summonerName: "RedSupport",
        stats: [3, 9, 12],
        items: ["https://via.placeholder.com/20?text=ItemJ"],
        kill_participation: 88,
        damage: 13000,
        wards: 18,
      },
    },
  },
};

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return <>{/* <Gamebar {...dummyData} />{" "} */}</>;
}
