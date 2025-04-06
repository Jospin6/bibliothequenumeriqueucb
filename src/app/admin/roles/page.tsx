"use client"
import { ChangeUserRole } from "@/components/forms/changeUserRole";
import { Navbar } from "@/components/navigation/navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/Button";
import Popup from "@/components/ui/popup";
import { fetchFaculties, selectFaculties } from "@/redux/faculty/facultySlice";
import { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Roles() {
    const dispatch = useDispatch<AppDispatch>()
    const faculties = useSelector(selectFaculties)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [formName, setFormName] = useState<string>()
    const handleAddDocPopup = (id?: number, formName?: string) => {
        setFormName(formName)
        setFacId(id)
        setIsOpen(!isOpen)
    }
    const [facId, setFacId] = useState<number>()

    const handleForms = (title: string = "changeUserRole") => {
        switch (title) {
            case "changeUserRole":
                return <ChangeUserRole facId={facId!} />
            default:
                return
        }
    }

    useEffect(() => {
        dispatch(fetchFaculties())
    }, [dispatch])

    return <>
        <Navbar />
        <div className="w-8/12 m-auto">
            <div className="mt-4 mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Roles</h1>
            </div>
            {faculties.map(fac => (
                <Accordion type="single" key={fac.id} collapsible className="text-gray-800 w-full border-b border-gray-700">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-xl"> {fac.name} </AccordionTrigger>
                        <AccordionContent>
                            <div>
                                <div className="flex justify-between">
                                    <div className="text-[20px]">Gestionnaires de la faculté</div>
                                    <div>
                                        <Button onClick={() => handleAddDocPopup(fac.id, "geschangeUserRoletRole")} label={"Add Gestionnaire"} />
                                    </div>
                                </div>
                                {fac.users!.filter(user => user.role === "ADMIN").length > 0 ? (
                                    fac.users?.filter(user => user.role === "ADMIN")
                                        .map(user => (
                                            <div key={user.id} className="p-2 border rounded mt-2">
                                                <p className="text-lg font-medium">{user.name} {user.postnom}</p>
                                                <p className="text-sm text-gray-600">{user.email}</p>
                                            </div>
                                        )) ?? null
                                ) : (
                                    <div className="h-[200px] flex justify-center items-center text-gray-500">
                                        Pas de gestionnaire
                                    </div>
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ))}
        </div>
        {
            isOpen && (<Popup isOpen={isOpen} onClose={handleAddDocPopup}>
                {/* {handleForms(formName!)} */}
                <ChangeUserRole facId={facId!} />
            </Popup>)
        }
    </>
}