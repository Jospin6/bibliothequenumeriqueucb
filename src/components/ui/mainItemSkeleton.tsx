// components/mainItemSkeleton.tsx

import { Skeleton } from "@/components/ui/skeleton"

export const MainItemSkeleton = () => {
    return (
        <div className="flex h-auto animate-pulse">
            <div className="w-[75%] border-b-[1px] border-gray-200 pb-3 mt-2 h-auto pl-2">
                <div className="flex items-center text-gray-500 mb-1">
                    <Skeleton className="w-4 h-4 mr-2 rounded-full bg-teal-200" />
                    <Skeleton className="h-3 w-24 bg-gray-200 rounded" />
                </div>

                <Skeleton className="h-6 w-3/4 my-2 bg-gray-300 rounded" />

                <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-3 w-16 bg-gray-200 rounded" />
                        <Skeleton className="h-3 w-6 bg-gray-200 rounded" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-5 w-5 rounded-full bg-gray-200" />
                        <Skeleton className="h-3 w-4 bg-gray-200 rounded" />
                    </div>
                </div>
            </div>

            <div className="w-[25%] h-[90px] flex justify-center items-center">
                <Skeleton className="w-10 h-10 bg-gray-300 rounded" />
            </div>
        </div>
    )
}
