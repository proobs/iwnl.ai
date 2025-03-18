import { useState, useEffect, useRef } from "react";
import { useNavigate } from "@remix-run/react";
import { Search, ChevronDown } from "lucide-react";

// Define region IDs as a union type for better type safety
export type RegionId = "na" | "euw" | "eune" | "kr" | "jp" | "oce" | "las" | "lan" | "br" | "tr" | "ru";

export type Region = {
  id: RegionId;
  name: string;
  full: string;
};

type SearchFormProps = {
  className?: string;
  regions?: Region[];
  defaultRegion?: Region;
};

export function SearchForm({ className = "", regions, defaultRegion }: SearchFormProps) {
  // Define default regions if not provided
  const defaultRegions: Region[] = [
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

  const availableRegions = regions || defaultRegions;
  const initialRegion = defaultRegion || availableRegions[0];

  const [selectedRegion, setSelectedRegion] = useState<Region>(initialRegion);
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
      targetPath = `/profile/${encodeURIComponent(id.trim())}/${encodeURIComponent(tag.trim())}/${selectedRegion.id}`;
    } else {
      targetPath = `/profile/${encodeURIComponent(searchQuery.trim())}/${selectedRegion.id}`;
    }
    // Navigate to the target route
    navigate(targetPath);
  };

  return (
    <form 
      method="post" 
      action="/search" 
      className={`relative ${className}`}
      onSubmit={handleSubmit}
    >
      <div className="flex rounded-xl shadow-2xl focus-within:shadow-blue-600/20 transition-shadow duration-300">
        <input 
          name="searchQuery"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Game Name + #${getPlaceholder(selectedRegion)}`}
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
                {availableRegions.map((region) => (
                  <li key={region.id}>
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
  );
}