import { Skeleton } from "@/components/ui/skeleton";

export function ExpeditionDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-3/4" />
      <Skeleton className="aspect-video w-full" />
      <div className="flex flex-wrap gap-4">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-8 w-32" />
      </div>
      <Skeleton className="h-20 w-full" />
      <div>
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="space-y-2">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-4 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
