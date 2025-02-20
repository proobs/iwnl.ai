import { Navbar } from "components/navbar/Navbar";
import { Search, ChevronDown } from "lucide-react";

export default function Index() {

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-400 to-purple-400">
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

          <div className="relative max-w-2xl mx-auto">
            <div className="flex rounded-lg overflow-hidden shadow-lg">
              <input 
                placeholder="Search" 
                className="flex-1 rounded-none border-0 bg-white/95 h-12 text-base px-4"
              />
              <div className="bg-white/95 border-l border-gray-200 px-4 flex items-center">
                <span className="text-gray-600">Region</span>
                <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
              </div>
              <button 
                className="rounded-none bg-blue-500 hover:bg-blue-600 h-12 px-6 text-white"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
                
    </div>
  );
}