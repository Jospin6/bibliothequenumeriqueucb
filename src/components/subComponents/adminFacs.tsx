"use client"

import { useEffect } from "react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import ViewsPerFacultyBarChart from "../ui/ViewsPerFacultyBarChart"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { fetchFaculties } from "@/redux/faculty/facultySlice"

export const AdminFacs = () => {
    const { loading, faculties } = useSelector((state: RootState) => state.faculty)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchFaculties())
    }, [dispatch])

    const VIEWS_DATA = [
        ...faculties.map(faculty => ({ faculty: faculty.name, viewCount: faculty.books?.reduce((acc, book) => acc + (book.View.length || 0), 0) || 0 }))
    ];
    return <>
        <div className="col-span-3 h-64 overflow-x-auto rounded-2xl border">
            <div className="w-full px-3 flex text-gray-300 text-lg font-semibold items-center border-b h-[50px]">
                Facultés
            </div>
            <div className="px-3">
                {faculties.map(fac => (
                    <div className="flex items-center mt-2" key={fac.id}>
                        <Avatar className="size-[40px] mr-2">
                            <AvatarFallback className="font-medium text-gray-300">{fac.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="">
                            <div className="text-gray-300 text-[16px]">{fac.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="col-span-5 pb-4 h-auto rounded-2xl border">
            <ViewsPerFacultyBarChart data={VIEWS_DATA} />
        </div>
    </>
}