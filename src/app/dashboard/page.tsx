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
            case "subject":
                return <SubjectForm />
            default:
                return
        }
    }

    return <>
        <Navbar />
        <div className="mx-[5%]">
            <div className="flex justify-between my-6">
                <span></span>
                {/* <Button label={"Add Etudiants"} onClick={handleAddDocPopup} /> */}
            </div>
            <div className="min-h-80 h-auto">

            </div>
            <div className="flex justify-end my-6">
                <Button label={"Nouvelle Faculté"} onClick={() => handleAddDocPopup("fac")} className="mr-4" />
                <Button label={"Nouvelle Matière"} onClick={() => handleAddDocPopup("subject")} />
            </div>
        </div>
        {
            isOpen && (<Popup isOpen={isOpen} onClose={handleAddDocPopup}>
                {handleForms(formName!)}
            </Popup>)
        }
    </>
}