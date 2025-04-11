// components/sideItemSkeleton.tsx

import { Skeleton } from "@/components/ui/skeleton"

export const SideItemSkeleton = () => {
    return (
        <div className="mt-2 flex items-center space-x-2 animate-pulse">
            <Skeleton className="w-[25px] h-[25px] rounded bg-teal-200" />
            <div className="flex flex-col space-y-1">
                <Skeleton className="h-4 w-40 bg-gray-300 rounded" />
                <Skeleton className="h-3 w-24 bg-gray-200 rounded" />
            </div>
        </div>
    )
}
