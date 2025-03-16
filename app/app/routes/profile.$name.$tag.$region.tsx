import { useParams } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Footer } from "~/components/ui/footer";
import { Navbar } from "~/components/Navbar";
import RandbackDrop from "~/components/RandbackDrop";
import PlayerHeader from "~/components/PlayerHeader";
import { useState } from "react";
import PlayerNav from "~/components/PlayerNav";
import RankedInfo from "~/components/RankInfo";
import RecentStats from "~/components/RecentStats";

export const loader = async ({params}: LoaderFunctionArgs) => {
    const { name, region, tag} = params; 
    return ""
}


export default function Profile() {
    const {name, region, tag} = useParams();
    const [tab, setTab] = useState("overview");
    
  return (
  <div className="min-h-screen flex flex-col relative bg-gradient-to-br from-blue-300 via-blue-400 to-purple-500 overflow">
    <header className="sticky top-0 z-50 bg-transparent">
      <Navbar />
    </header>
    {/* Random Champ Backdrop */}
    {/* <RandbackDrop /> */}

    {/* Lvl / Profile Pic /  Ladder rank / Region */}
    <PlayerHeader />
    
    {/* tab bar switch between sub pages*/}
    <PlayerNav activeTab={tab} setActiveTab={setTab}  />
    {tab === "overview" && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="md:col-span-2">
          <RankedInfo/>
        </div>
        <div className="md:col-span-1">
          <RecentStats />
        </div>
      </div>
    )}

    <footer className="mt-auto w-full bg-white/5 backdrop-blur-sm border-t border-white/10">
        <Footer
      companyName="IWNL" 
      copyright={`© ${new Date().getFullYear()} All rights reserved.`}
        />
    </footer>
   </div> 
  )
}