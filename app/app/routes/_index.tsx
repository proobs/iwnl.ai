// Index.tsx
import { Navbar } from "~/components/Navbar";
import { Brain, LineChart, Users } from "lucide-react";
import { Footer } from "../components/ui/footer";
import { SearchForm } from "~/components/Search";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-br from-blue-300 via-blue-400 to-purple-500 overflow">
      <header className="sticky top-0 z-50 bg-transparent">
        <Navbar />
      </header>

      <main className="flex-1 container mx-auto px-4 pt-12 md:pt-24 relative">
        <div className="max-w-6xl mx-auto text-center">
          <div className="space-y-6 text-white mb-12">
            <h1 className="text-5xl md:text-6xl font-bold">
              Learn to never lose.
            </h1>
            <p className="text-xl md:text-2xl opacity-90 italic">
              knowledge is a real weapon
            </p>
          </div>

          <SearchForm className="max-w-2xl mx-auto" />

        </div>
        <div className="mt-20 md:mt-32 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            <div className="bg-white/15 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-300/30 transform hover:scale-105 transition-all duration-300">
              <LineChart className="h-10 w-10 mb-4 text-blue-200" />
              <h3 className="text-xl font-bold mb-2">Detailed Stats</h3>
              <p className="text-white/80">Get comprehensive stats and analysis of your gameplay performance.</p>
            </div>

            <div className="bg-white/15 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-300/30 transform hover:scale-105 transition-all duration-300">
              <Brain className="h-12 w-12 mb-4 text-blue-100" />
              <h3 className="text-xl font-bold mb-2 text-blue-100">AI Coach</h3>
              <p className="text-white/90">Get personalized advice and strategies from our advanced AI that learns your gameplay style.</p>
              <div className="mt-4 text-xs bg-blue-500/20 py-1 px-2 rounded-md inline-block">NEW</div>
            </div>
            
            <div className="bg-white/15 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-300/30 transform hover:scale-105 transition-all duration-300">
              <Users className="h-10 w-10 mb-4 text-blue-200" />
              <h3 className="text-xl font-bold mb-2">Community Insights</h3>
              <p className="text-white/80">Learn from the community and share strategies with other players.</p>
              <div className="mt-4 text-xs bg-blue-500/20 py-1 px-2 rounded-md inline-block">COMING SOON</div>
            </div>
          </div>
        </div>
      </main>
      <div className="w-full mt-16 md:mt-24">
        <Footer
          companyName="IWNL" 
          copyright={`© ${new Date().getFullYear()} All rights reserved.`}
          className="bg-white/5 backdrop-blur-sm border-t border-white/10"
        />
      </div>
    </div>
  );
}