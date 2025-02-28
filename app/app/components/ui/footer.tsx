import { cn } from "../../lib/utils";

interface FooterProps {
  companyName: string;
  copyright: string;
  className?: string;
}

export function Footer({
  companyName,
  copyright,
  className,
}: FooterProps) {
  return (
    <footer className={cn("w-full py-6 px-4", className)}>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center">
            <span className="font-bold text-white text-xl tracking-tight">{companyName}</span>
          </div>
          
          <div className="text-sm text-white/70">
            {copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}