"use client"
import { useDispatch, useSelector } from "react-redux"
import { Combobox } from "./combobox"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import { fetchFaculties } from "@/redux/faculty/facultySlice"

export const FaculteCombobox = ({ className }: { className?: string }) => {
    const dispatch = useDispatch<AppDispatch>()
    const { loading, faculties } = useSelector((state: RootState) => state.faculty)
    useEffect(() => {
        dispatch(fetchFaculties())
    }, [])
    const frameworks = [
        ...faculties.map((fac) => ({ value: `${fac.id}`, label: `${fac.name}`, url: `/faculte/${fac.id}` }))
    ]
    return <div className={`${className}`}><Combobox items={frameworks} placeholder="Facultés" /></div>
}