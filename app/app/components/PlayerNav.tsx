import { cn } from "~/utils";

const navItems = [
  { label: "Overview", value: "overview" },
  { label: "Live Game", value: "live" },
  { label: "AI Coach", value: "coach", isNew: true },
];

interface PlayerNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function PlayerNav({ activeTab, setActiveTab }: PlayerNavProps) {
  return (
     <div className="w-full max-w-5xl mx-auto">
      <nav className="flex mb-6 border-b border-white/10">
        <div 
        className="absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"
        style={{
        left: `${navItems.findIndex(item => item.value === activeTab) * (100 / navItems.length)}%`,
        width: `${100 / navItems.length}%`}}>
        </div>
        {navItems.map((item) => (
          <button
            key={item.value}
            onClick={() => setActiveTab(item.value)}
            className={cn(
              "relative flex items-center px-6 py-4 text-base font-medium transition-all duration-300 flex-1 justify-center",
              activeTab === item.value
              ? "text-white border-b-2 border-blue-500 -mb-[1px]"
              : "text-white/70 hover:text-white"
            )}
          >
            <span className="relative z-10">{item.label}</span>
            {item.isNew && (
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-blue-500 text-white rounded">
                NEW
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};