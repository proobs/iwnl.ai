import { Menu } from "lucide-react";
import { SearchForm } from "./Search";
// Use proper props destructuring with default values
export function Navbar({ loggedIn = false, homepage = true }) {
  return (
    <nav className="py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center">
          <div className="font-bold text-white">
            <a href="/" className="hover:text-white/90 text-2xl">IWNL</a>
          </div>
        </div>
        
        {/* Middle section - Search */}
        {!homepage && (
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <SearchForm className="w" />
          </div>
        )}
        
        {/* Right section */}
        <div className="flex items-center">
          {!loggedIn ? (
            <div className="hidden md:flex items-center space-x-8">
              <a href="/login" className="text-white hover:text-white/90">Login</a>
              <a href="/register" className="inline-flex items-center justify-center rounded-full px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white text-primary-foreground hover:bg-primary/400">
                Become a member →
              </a>
            </div>
          ) : (
            <a href="/signout" className="hidden md:inline-flex items-center justify-center rounded-full px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white text-primary-foreground hover:bg-primary/400">
              Sign Out →
            </a>
          )}
          <button className="md:hidden text-white p-2 hover:bg-white/10 rounded-md ml-4">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}