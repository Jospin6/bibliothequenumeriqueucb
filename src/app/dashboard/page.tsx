"use client"
import { FacultyForm } from "@/components/forms/facultyForm";
import { SubjectForm } from "@/components/forms/subjectForm";
import { Navbar } from "@/components/navigation/navbar";
import { Button } from "@/components/ui/Button";
import Popup from "@/components/ui/popup";
import { useState } from "react";

export default function Dashboard() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [formName, setFormName] = useState<string>()
    const handleAddDocPopup = (formName?: string) => {
        setFormName(formName)
        setIsOpen(!isOpen)
    }

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
        <div className="w-8/12 mx-auto bg-red-500">
            <div className="flex justify-end my-6">
                <Button label={"Nouvelle Faculté"} onClick={() => handleAddDocPopup("fac")} className="mr-4" />
            </div>
        </div>
        {
            isOpen && (<Popup isOpen={isOpen} onClose={handleAddDocPopup}>
                {handleForms(formName!)}
            </Popup>)
        }
    </>
}