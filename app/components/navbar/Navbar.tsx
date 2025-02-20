import { Link } from "@remix-run/react";
import { Menu } from "lucide-react";
import { cn } from "~/utils";

// NavItem component inline since we're in Remix
const NavItem = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => {
  return (
    <Link
      to={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        className
      )}
    >
      {children}
    </Link>
  );
};

const NavButton = ({
  variant = "default",
  children,
  className,
  ...props
}: {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-2",
        variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/90",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const Navbar = () => {
  return (
    <nav className="py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="font-bold text-2xl text-white">
            <NavItem href="/" className="hover:text-white/90">IWNL</NavItem>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <NavItem href="/login" className="text-white hover:text-white/90">Login</NavItem>
          <NavButton variant="default" className="bg-blue-500 hover:bg-blue-600 text-white">
            Become a member →
          </NavButton>
        </div>

        <button className="md:hidden text-white p-2 hover:bg-white/10 rounded-md">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};