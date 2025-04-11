// components/subNavbarSkeleton.tsx

"use client"

import { Skeleton } from "@/components/ui/skeleton"

export const SubNavbarSkeleton = () => {
    return (
        <div className="relative mb-6 text-sm mx-6 md:mx-0">
            <div className="flex items-center relative">
                {/* Scroll Left Button */}
                <div className="absolute left-[-40px] z-10 ml-4">
                    <Skeleton className="w-6 h-6 rounded-full bg-gray-300" />
                </div>

                {/* Scrollable Tabs */}
                <div className="overflow-x-auto overflow-y-hidden w-full px-0 py-2">
                    <div className="flex space-x-4 animate-pulse">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton
                                key={i}
                                className="h-8 w-[80px] rounded-full bg-gray-200"
                            />
                        ))}
                    </div>
                </div>

                {/* Scroll Right Button */}
                <div className="absolute right-[-40px] z-10 mr-4">
                    <Skeleton className="w-6 h-6 rounded-full bg-gray-300" />
                </div>
            </div>
        </div>
    )
}
