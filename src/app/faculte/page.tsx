"use client"
import { BookForm } from "@/components/forms/bookForm";
import { SubjectForm } from "@/components/forms/subjectForm";
import { FacBooks } from "@/components/subComponents/facBooks";
import { FacSubjects } from "@/components/subComponents/facSubjects";
import { Button } from "@/components/ui/Button";
import { MainCard } from "@/components/ui/mainCard";
import Popup from "@/components/ui/popup";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { fetchFaculty, selectFaculty } from "@/redux/faculty/facultySlice";
import { AppDispatch } from "@/redux/store";
import { fetchSubjects, selectSubject } from "@/redux/subject/subjectSlice";
import { fetchUser, selectUser } from "@/redux/user/userSlice";
import { Book, BookOpen, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
    const dispatch = useDispatch<AppDispatch>()
    const faculty = useSelector(selectFaculty)
    const user = useSelector(selectUser)
    const currentUser = useCurrentUser()
    const subjets = useSelector(selectSubject)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [formName, setFormName] = useState<string>()
    const handleAddDocPopup = (formName?: string) => {
        setFormName(formName)
        setIsOpen(!isOpen)
    }

    const handleForms = (title: string = "book") => {
        switch (title) {
            case "subject":
                return <SubjectForm id={faculty!.id!} />
            case "book":
                return <BookForm facId={faculty!.id!} />
            default:
                return
        }
    }

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchUser(currentUser.id!))
        }
    }, [dispatch, currentUser])

    useEffect(() => {
        if (faculty) {
            dispatch(fetchSubjects(faculty.id!))
        }
    }, [dispatch, faculty])

    useEffect(() => {
        if (user?.faculteId) {
            dispatch(fetchFaculty(user.faculteId))
        }
    }, [dispatch, user])

    return (
        <>
            <div className="mb-6 flex px-4 justify-between items-center border-dashed border-gray-600 border-y h-[60px]">
                <h1 className="text-2xl font-bold">{faculty?.name}</h1>
                <div className="flex">
                    <Button onClick={() => handleAddDocPopup("book")} className="mr-4">Nouveau Livre</Button>
                    <Button onClick={() => handleAddDocPopup("subject")} className="">Nouveau Matière</Button>
                </div>
            </div>
            <div className="w-full px-4 m-auto">
                <div className="grid grid-cols-6 gap-4">
                    <MainCard title={"Etudiants"} subTitle={`${faculty?.users && faculty?.users?.length}`} Icon={Users}/>
                    <MainCard title={"Livres"} subTitle={`${faculty?.books && faculty?.books?.length}`} Icon={Book}/>
                    <MainCard title={"Matières"} subTitle={`${faculty?.subjects && faculty?.subjects?.length}`} Icon={BookOpen}/>
                </div>

                {faculty && (<FacBooks faculty={faculty} subjets={subjets}/>)}
                {faculty && (<FacSubjects faculty={faculty}/>)}
            </div>
            {
                isOpen && (<Popup isOpen={isOpen} onClose={handleAddDocPopup}>
                    {handleForms(formName!)}
                </Popup>)
            }
            <div className="w-full border-t text-sm text-center mt-5 text-gray-500 h-[50px] leading-[50px] border-dashed border-gray-600">
                Bibliotheque numerique de l'UCB
            </div>
        </>
    );
}
