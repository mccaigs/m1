import Image from "next/image";
import { cn } from "@/lib/utils";

// SVG intrinsic dimensions (viewBox: 0 0 433.5 89.7)
const SVG_WIDTH = 434;
const SVG_HEIGHT = 90;

const sizeClass = {
  sm: "h-8 w-auto",
  md: "h-10 w-auto",
  lg: "h-12 w-auto",
} as const;

export function Logo({
  className,
  imageClassName,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  labelClassName: _labelClassName,
  priority = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showLabel: _showLabel,
  size = "md",
}: {
  className?: string;
  imageClassName?: string;
  /** @deprecated Text label removed; prop retained for backward compatibility */
  labelClassName?: string;
  priority?: boolean;
  /** @deprecated Text label removed; prop retained for backward compatibility */
  showLabel?: boolean;
  size?: keyof typeof sizeClass;
}) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        alt="McCaigs"
        className={cn(sizeClass[size], "shrink-0", imageClassName)}
        height={SVG_HEIGHT}
        priority={priority}
        src="/logo.svg"
        width={SVG_WIDTH}
      />
    </span>
  );
}
