import { Skeleton } from '@/src/shared/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="w-full m-4 grid grid-cols-3 md:grid-cols-5 gap-4">
      {[...Array(30)].map((_, i) => (
        <Skeleton key={i} className="h-16" />
      ))}
    </div>
  );
}
