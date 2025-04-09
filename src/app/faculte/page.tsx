"use client"
import { BookForm } from "@/components/forms/bookForm";
import { SubjectForm } from "@/components/forms/subjectForm";
import { Navbar } from "@/components/navigation/navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import Popup from "@/components/ui/popup";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { fetchFaculty, selectFaculty } from "@/redux/faculty/facultySlice";
import { AppDispatch } from "@/redux/store";
import { fetchUser, selectUser } from "@/redux/user/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
    const dispatch = useDispatch<AppDispatch>()
    const faculty = useSelector(selectFaculty)
    const user = useSelector(selectUser)
    const currentUser = useCurrentUser()
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
        if (user?.faculteId) {
            dispatch(fetchFaculty(user.faculteId))
        }
    }, [dispatch, user])

    return (
        <>
            <Navbar />
            <div className="w-8/12 m-auto">
                <div className="mt-4 mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">{faculty?.name}</h1>
                    <div className="flex">
                        <Button onClick={() => handleAddDocPopup("book")} className="mr-4">Nouveau Livre</Button>
                        <Button onClick={() => handleAddDocPopup("subject")} className="">Nouveau Matière</Button>
                    </div>
                </div>
                <div className="grid grid-cols-6 gap-4">
                    <Card className="col-span-2">
                        <div className="text-2xl font-bold">{faculty?.users?.length}</div>
                        <div className="text-gray-700">Etudients</div>
                    </Card>
                    <Card className="col-span-2">
                        <div className="text-2xl font-bold">{faculty?.books?.length}</div>
                        <div className="text-gray-700">Livres</div>
                    </Card>
                    <Card className="col-span-2">
                        <div className="text-2xl font-bold">{faculty?.subjects?.length}</div>
                        <div className="text-gray-700">Matières</div>
                    </Card>
                </div>
                <div className="grid grid-cols-6 gap-4 mt-8 mb-4">
                    <div className="col-span-3 border p-3 min-h-[300px] shadow rounded-md">
                        <h1 className="text-xl font-semibold mb-3">Matières</h1>
                        <div>
                            {faculty?.subjects?.map(subject => (<div className="py-2 border-b" key={subject.id}>{subject.name}</div>))}
                        </div>
                    </div>
                    <div className="col-span-3 border p-3 shadow rounded-md">
                        <h1 className="text-xl font-semibold mb-3">Livres</h1>
                        <div>
                            {faculty?.books?.map(book => (<div className="py-2 border-b" key={book.id}>{book.title}</div>))}
                        </div>
                    </div>
                </div>
            </div>
            {
                isOpen && (<Popup isOpen={isOpen} onClose={handleAddDocPopup}>
                    {handleForms(formName!)}
                </Popup>)
            }
        </>
    );
}
