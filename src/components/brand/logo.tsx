import Image from "next/image";
import { cn } from "@/lib/utils";

const logoSizes = {
  sm: 24,
  md: 32,
  lg: 40,
} as const;

export function Logo({
  className,
  imageClassName,
  labelClassName,
  priority = false,
  showLabel = true,
  size = "md",
}: {
  className?: string;
  imageClassName?: string;
  labelClassName?: string;
  priority?: boolean;
  showLabel?: boolean;
  size?: keyof typeof logoSizes;
}) {
  const pixels = logoSizes[size];

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        alt=""
        aria-hidden="true"
        className={cn("shrink-0 rounded-[28%]", imageClassName)}
        height={pixels}
        priority={priority}
        src="/logo.svg"
        width={pixels}
      />
      {showLabel ? <span className={cn("font-semibold tracking-tight", labelClassName)}>McCaigs</span> : <span className="sr-only">McCaigs</span>}
    </span>
  );
}
