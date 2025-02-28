import { Menu } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="font-bold  text-white">
            <a href="/" className="hover:text-white/90 text-2xl">IWNL</a>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="/login" className="text-white hover:text-white/90">Login</a>
          <a href="/register"className="inline-flex items-center justify-center rounded-full px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white  text-primary-foreground hover:bg-primary/400">
            Become a member →
          </a>
        </div>

        <button className="md:hidden text-white p-2 hover:bg-white/10 rounded-md">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};