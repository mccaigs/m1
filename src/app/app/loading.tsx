import { Skeleton } from "@/components/ui/skeleton";
import { Logo } from "@/components/brand/logo";

export default function DashboardLoading() {
  return (
    <div>
      <Logo className="text-muted-foreground" size="sm" />
      <div className="mt-5 grid gap-3 sm:grid-cols-3">{[0, 1, 2].map((item) => <Skeleton className="h-36 bg-white/8" key={item} />)}</div>
    </div>
  );
}
