"use client"
import { BookForm } from "@/components/forms/bookForm";
import { SubjectForm } from "@/components/forms/subjectForm";
import { Navbar } from "@/components/navigation/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/iaInput";
import Popup from "@/components/ui/popup";
import { fetchFaculty, selectFaculty } from "@/redux/faculty/facultySlice";
import { AppDispatch } from "@/redux/store";
import { Delete, Edit } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Subjects () {
    const params = useParams();
    const id = params?.id
    const dispatch = useDispatch<AppDispatch>()
    const faculty = useSelector(selectFaculty)

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [formName, setFormName] = useState<string>()
    const handleAddDocPopup = (formName?: string) => {
        setFormName(formName)
        setIsOpen(!isOpen)
    }

    const handleForms = (title: string = "subject") => {
        switch (title) {
            case "subject":
                return <SubjectForm id={+id!} />
            default:
                return
        }
    }

    useEffect(() => {
        dispatch(fetchFaculty(+id!))
    }, [dispatch])

    return (
        <>
            <div className="mb-6 flex px-4 justify-between items-center border-dashed border-gray-600 border-y h-[60px]">
                <h1 className="text-2xl font-bold">{faculty?.name}</h1>
                <div className="flex">
                    <Button onClick={() => handleAddDocPopup("subject")}>Nouvelle Matière</Button>
                </div>
            </div>

            <div className="grid grid-cols-8 gap-4 mt-5 px-4">
                <div className="col-span-5 h-64 rounded-2xl border">
                    <div className="w-full px-3 flex text-gray-300 text-lg font-semibold items-center border-b h-[50px]">
                        Matières
                    </div>
                    <div>
                        <table className="w-full text-center text-sm">
                            <thead>
                                <tr className="border-b h-[35px]">
                                    <th>Title</th>
                                    <th>nombre des documents</th>
                                    <th>Mail</th>
                                    <th>Docs Consultés</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    faculty?.users?.map((student, index) => (
                                        <tr key={index} className="border-b">
                                            <td>{student.name}</td>
                                            <td>{student.postnom}</td>
                                            <td>{student.email}</td>
                                            <td></td>
                                            <td className="flex justify-center">
                                                <Edit size={17} className="text-blue-700" />
                                                <Delete size={17} className="text-red-600 ml-2" />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {
                isOpen && (<Popup isOpen={isOpen} className="text-gray-950" onClose={handleAddDocPopup}>
                    {handleForms(formName!)}
                </Popup>)
            }
        </>
    );
}