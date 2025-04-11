// components/navbarSkeleton.tsx

"use client"

import { Skeleton } from "@/components/ui/skeleton"

export const NavbarSkeleton = () => {
    return (
        <div className="w-full md:px-[5%] px-2 h-[50px] border-b border-gray-200 flex items-center justify-between animate-pulse">
            {/* Logo + Search */}
            <div className="flex items-center h-[50px] space-x-3">
                <Skeleton className="md:h-[40px] md:w-[40px] w-[35px] h-[35px] rounded bg-gray-300" />
                <Skeleton className="hidden md:block h-[35px] w-[300px] rounded bg-gray-200" />
            </div>

            {/* Navigation */}
            <div className="flex space-x-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-16 rounded bg-gray-200" />
                ))}
            </div>
        </div>
    )
}
