import { cn } from "@/lib/utils";

type MaxWidthContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function MaxWidthContainer({
  children,
  className = "",
}: MaxWidthContainerProps) {
  return (
    <div className={cn("max-w-6xl mx-auto px-4 xl:px-0", className)}>
      {children}
    </div>
  );
}
