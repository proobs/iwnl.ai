import { WinLossRatio } from "./ui/piechart";


export default function RecentStats() {
    // pass in wins and losses
    return (
        <div className="bg-white/5 backdrop-blur-sm p-[-6px] rounded-xl shadow-lg border border-blue-300/30 transform hover:scale-105 transition-all duration-300">
            <WinLossRatio />
        </div>
    )
}