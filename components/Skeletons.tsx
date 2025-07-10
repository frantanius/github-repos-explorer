import { Skeleton } from "@/components/ui/skeleton";

export function UserSkeleton() {
  return (
    <div className="rounded border border-gray-200 p-3 bg-gray-50 space-y-2">
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-10" />
      </div>
      <Skeleton className="h-3 w-full" />
    </div>
  );
}

export function RepoSkeleton() {
  return (
    <div className="border p-3 rounded bg-white space-y-2">
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-10" />
      </div>
      <Skeleton className="h-3 w-full" />
    </div>
  );
}
