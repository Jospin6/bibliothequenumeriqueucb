"use client"
import { BookForm } from "@/components/forms/bookForm";
import { SubjectForm } from "@/components/forms/subjectForm";
import { FacBooks } from "@/components/subComponents/facBooks";
import { FacSubjects } from "@/components/subComponents/facSubjects";
import { Button } from "@/components/ui/Button";
import { MainCard } from "@/components/ui/mainCard";
import Popup from "@/components/ui/popup";
import { fetchFaculty, selectFaculty } from "@/redux/faculty/facultySlice";
import { AppDispatch } from "@/redux/store";
import { fetchSubjects, selectSubject } from "@/redux/subject/subjectSlice";
import { Book, BookOpen, Users } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
    const params = useParams();
    const id = params?.id
    const dispatch = useDispatch<AppDispatch>()
    const faculty = useSelector(selectFaculty)
    const subjets = useSelector(selectSubject)

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [formName, setFormName] = useState<string>()
    const handleAddDocPopup = (formName?: string) => {
        setFormName(formName)
        setIsOpen(!isOpen)
    }

    console.log("faculte", id)

    const handleForms = (title: string = "subject") => {
        switch (title) {
            case "subject":
                return <SubjectForm id={+id!} />
            case "book":
                return <BookForm facId={+id!} />
            default:
                return
        }
    }

    useEffect(() => {
        if (faculty) {
            dispatch(fetchSubjects(faculty.id!))
        }
    }, [dispatch, faculty])

    useEffect(() => {
        dispatch(fetchFaculty(+id!))
    }, [dispatch])

    return (
        <>
            <div className="mb-6 flex px-4 justify-between items-center border-dashed border-gray-600 border-y h-[60px]">
                <h1 className="text-2xl font-bold">{faculty?.name ? faculty?.name : ''}</h1>
                <div className="flex">
                    <Button onClick={() => handleAddDocPopup("book")} className="mr-4">Nouveau Livre</Button>
                    <Button onClick={() => handleAddDocPopup("subject")} className="">Nouveau Matière</Button>
                </div>
            </div>
            <div className="w-full px-4 m-auto">
                <div className="grid grid-cols-6 gap-4">
                    <MainCard title={"Etudiants"} subTitle={`${faculty?.users ? faculty?.users?.length: '0'}`} Icon={Users} />
                    <MainCard title={"Livres"} subTitle={`${faculty?.books ? faculty?.books?.length: '0'}`} Icon={Book} />
                    <MainCard title={"Matières"} subTitle={`${faculty?.subjects ? faculty?.subjects?.length: '0'}`} Icon={BookOpen} />
                </div>
                {faculty ? (<FacBooks faculty={faculty} subjets={subjets} />): (<span></span>)}
                {faculty ? (<FacSubjects faculty={faculty} />): (<span></span>)}
            </div>
            {
                isOpen && (<Popup isOpen={isOpen} className="text-gray-950" onClose={handleAddDocPopup}>
                    {handleForms(formName!)}
                </Popup>)
            }
            <div className="w-full border-t text-sm text-center mt-5 text-gray-500 h-[50px] leading-[50px] border-dashed border-gray-600">
                Bibliotheque numerique de l'UCB
            </div>
        </>
    );
}