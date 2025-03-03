import { useState, useEffect, useRef } from "react";
import { useNavigate } from "@remix-run/react";
import { Navbar } from "components/navbar/Navbar";
import { Search, ChevronDown, Brain, LineChart, Users } from "lucide-react";
import { Footer } from "../components/ui/footer";

// Define region IDs as a union type for better type safety
type RegionId = "na" | "euw" | "eune" | "kr" | "jp" | "oce" | "las" | "lan" | "br" | "tr" | "ru";

type Region = {
  id: RegionId;
  name: string;
  full: string;
};

export default function Index() {
  const regions: Region[] = [
    { id: "na", name: "NA", full: "North America" },
    { id: "euw", name: "EUW", full: "Europe West" },
    { id: "eune", name: "EUNE", full: "Europe Nordic & East" },
    { id: "kr", name: "KR", full: "Korea" },
    { id: "jp", name: "JP", full: "Japan" },
    { id: "oce", name: "OCE", full: "Oceania" },
    { id: "las", name: "LAS", full: "Latin America South" },
    { id: "lan", name: "LAN", full: "Latin America North" },
    { id: "br", name: "BR", full: "Brazil" },
    { id: "tr", name: "TR", full: "Turkey" },
    { id: "ru", name: "RU", full: "Russia" },
  ];

  const [selectedRegion, setSelectedRegion] = useState<Region>(regions[0]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();


  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Get placeholder based on region
  const getPlaceholder = (region: Region): string => {
    const placeholders: Record<RegionId, string> = {
      na: "NA1",
      euw: "EUW1",
      eune: "EUN1",
      kr: "KR",
      jp: "JP1",
      oce: "OC1",
      las: "LA2",
      lan: "LA1",
      br: "BR1",
      tr: "TR1",
      ru: "RU",
    };
    return placeholders[region.id];
  };

  // Toggle dropdown
  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  // Focus the input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return;
    }

    let targetPath = "";
    //  assume it's in the format id#tag
    if (searchQuery.includes("#")) {
      const [id, tag] = searchQuery.split("#");
      // use encodeURI to change special characters to be URL friendly
      targetPath = `/profile/${encodeURIComponent(id.trim())}.${encodeURIComponent(tag.trim())}.${selectedRegion.id}`;
    } else {
      targetPath = `/profile/${encodeURIComponent(searchQuery.trim())}.${selectedRegion.id}`;
    }
    // Navigate to the target route
    navigate(targetPath);
  };

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

          <form 
            method="post" 
            action="http://localhost:5000/search" 
            className="relative max-w-2xl mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="flex rounded-xl shadow-2xl focus-within:shadow-blue-600/20 transition-shadow duration-300">
              <input 
                name="searchQuery"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={"Game Name + #" + getPlaceholder(selectedRegion)} 
                className="flex-1 rounded-l-xl border-0 bg-white/80 h-14 text-base px-4"
                aria-label="Search"
                type="text"
                ref={inputRef}
              />
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="h-14 bg-white/80 border-l border-gray-200 px-4 flex items-center"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  type="button"
                >
                  <div className="flex items-center">
                    <span className="ml-2 text-gray-600">{selectedRegion.name}</span>
                    <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
                  </div>
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg z-50">
                    <ul className="py-1 max-h-64 overflow-y-auto">
                      {regions.map((region) => (
                        <li key={region.id} >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRegion(region);
                              setDropdownOpen(false);
                            }}
                            className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                            type="button"
                          >
                            <span className="ml-2 font-medium">{region.name}</span>
                            <span className="ml-2 text-xs text-gray-500">- {region.full}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <input type="hidden" name="region" value={selectedRegion.id} />
              <button 
                className="rounded-r-xl bg-blue-500 hover:bg-blue-600 h-14 px-6 text-white"
                aria-label="Search"
                type="submit"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-4 text-sm text-white/80">
              Search for player stats, match history, and more
            </p>
          </form>

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