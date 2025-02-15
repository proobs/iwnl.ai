import { Navbar } from "../navbar/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown } from "lucide-react";

const Index = () => {
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
              <Input 
                placeholder="Search" 
                className="flex-1 rounded-none border-0 bg-white/95 h-12 text-base"
              />
              <div className="bg-white/95 border-l border-gray-200 px-4 flex items-center">
                <span className="text-gray-600">Region</span>
                <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
              </div>
              <Button 
                className="rounded-none bg-blue-500 hover:bg-blue-600 h-12 px-6"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 w-[45%] h-[600px] pointer-events-none">
          <img
            src="/lovable-uploads/93b1486e-3ae4-4158-bdae-0df4942614c2.png"
            alt="Professor Ryze"
            className="object-contain object-bottom w-full h-full"
          />
        </div>
      </main>
    </div>
  );
};

export default Index;