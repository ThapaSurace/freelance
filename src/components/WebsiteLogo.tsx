import { cn } from "@/lib/utils";
import Link from "next/link";

interface WebsiteLogoProps {
  containerClass?: string;
  linkClass?: string;
  iconClass?: string;
}

export default function WebsiteLogo({
  containerClass,
  linkClass,
  iconClass,
}: WebsiteLogoProps) {
  return (
    <div className={cn("flex items-center gap-2", containerClass)}>
      <div className={cn("size-6 bg-slate-900 rounded-md", iconClass)} />
      <Link
        href="/"
        className={cn("font-bold text-2xl text-slate-800", linkClass)}
      >
        Freelancer
      </Link>
    </div>
  );
}
