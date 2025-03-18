import { WinLossRatio } from "./ui/piechart";
import { KDA } from "./ui/kda";
import { RecentChampions } from "./ui/recents";


export default function RecentStats() {
    // pass in wins and losses
    return (
        <div className="bg-white/5 flex flex-row backdrop-blur-sm p-[-6px] rounded-xl shadow-lg border border-blue-300/30 transform hover:scale-105 transition-all duration-300 w-[600px] ml-[-290px]">
            <WinLossRatio className="ml-10" />
            <KDA kills={5} deaths={2} assists={8} className="ml-10" />
            <RecentChampions className="ml-auto"/>
        </div>
    )
}