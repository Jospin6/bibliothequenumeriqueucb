"use client"
import { FacultyForm } from "@/components/forms/facultyForm";
import { SubjectForm } from "@/components/forms/subjectForm";
import { Navbar } from "@/components/navigation/navbar";
import { Button } from "@/components/ui/Button";
import Expansion from "@/components/ui/expansion";
import Popup from "@/components/ui/popup";
import { fetchFaculties } from "@/redux/faculty/facultySlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [formName, setFormName] = useState<string>()
    const {loading, faculties} = useSelector((state: RootState) => state.faculty)
    const dispatch = useDispatch<AppDispatch>()
    const handleAddDocPopup = (formName?: string) => {
        setFormName(formName)
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        dispatch(fetchFaculties())
    }, [])

    const handleForms = (title: string = "etudiant") => {
        switch (title) {
            case "fac":
                return <FacultyForm />
            default:
                return
        }
    }

    return <>
        <Navbar />
        <div className="w-8/12 mx-auto">
            <div className="flex justify-end my-6">
                <Button onClick={() => handleAddDocPopup("fac")} className="mr-4">Nouvelle Faculté</Button>
            </div>
            <div>
                {loading ? "Chargement..." : faculties.map((fac) => (<Expansion faculty={fac} key={fac.id} />))}
            </div>
        </div>
        {
            isOpen && (<Popup isOpen={isOpen} onClose={handleAddDocPopup}>
                {handleForms(formName!)}
            </Popup>)
        }
    </>
}