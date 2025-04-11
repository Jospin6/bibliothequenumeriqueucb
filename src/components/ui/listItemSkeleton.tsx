// components/listItemSkeleton.tsx

"use client"

import { Skeleton } from "@/components/ui/skeleton"

export const ListItemSkeleton = () => {
    return (
        <div className="flex items-center mt-2 animate-pulse">
            <Skeleton className="size-[40px] rounded-full mr-2 bg-gray-300" />
            <div className="space-y-1">
                <Skeleton className="h-4 w-[120px] bg-gray-200 rounded" />
                <Skeleton className="h-3 w-[80px] bg-gray-200 rounded" />
            </div>
        </div>
    )
}
