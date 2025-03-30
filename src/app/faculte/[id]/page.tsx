"use client"
import { BookForm } from "@/components/forms/bookForm";
import { FacultyForm } from "@/components/forms/facultyForm";
import { SubjectForm } from "@/components/forms/subjectForm";
import { Navbar } from "@/components/navigation/navbar";
import Popup from "@/components/ui/popup";
import { fetchFaculty, selectFaculty } from "@/redux/faculty/facultySlice";
import { AppDispatch } from "@/redux/store";
import { Book, Paperclip, Star, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdPaper } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
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
            case "book":
                return <BookForm facId={+id!} />
            default:
                return
        }
    }

    useEffect(() => {
        dispatch(fetchFaculty(+id!))
    }, [dispatch])

    return (
        <>
            <Navbar />
            <div className="w-8/12 m-auto">
                <div className="text-2xl py-4 flex justify-between">
                    <span>Faculté de {faculty?.name}</span>
                    <div onClick={() => handleAddDocPopup("book")}>Add Book</div>
                </div>
                <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-2 flex items-center p-3 rounded-xl shadow-md">
                        <Book size={30} className="text-green-500" />
                        <div className="ml-4">
                            <div className="font-semibold">{faculty?.books?.length}</div>
                            <div className="text-md">Nombre de livres</div>
                        </div>
                    </div>
                    <div className="col-span-2 flex items-center p-3 rounded-xl shadow-md">
                        <IoMdPaper size={30} className="text-blue-500" />
                        <div className="ml-4">
                            <div className="font-semibold">{faculty?.subjects?.length}</div>
                            <div className="text-md">Nombre de Matières</div>
                        </div>
                    </div>
                    <div className="col-span-2 flex items-center p-3 rounded-xl shadow-md">
                        <User size={30} className="text-yellow-500" />
                        <div className="ml-4">
                            <div className="font-semibold">{faculty?.users?.length}</div>
                            <div className="text-md">Nombre d'Etudiants</div>
                        </div>
                    </div>
                </div>
                <div className="py-3 flex justify-end">
                    <Link href={""} className="text-blue-600 ml-3" onClick={() => handleAddDocPopup("subject")}>cours</Link>
                    <Link href={""} className="text-blue-600 ml-3">users</Link>
                    <Link href={""} className="text-blue-600 ml-3">auth</Link>
                </div>

                <div>
                    <div className="text-lg my-4 font-verdana">Livres disponible dans la bibliotheque</div>
                    <table className="w-full text-center text-sm">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th>Titre</th>
                                <th>Matière</th>
                                <th>Nombre de vues</th>
                                <th>Nombre de favoris</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faculty?.books?.map((book, index) => (
                                <tr key={index} className="border-b border-gray-300">
                                    <td>{book.title}</td>
                                    <td>{book.subject.name}</td>
                                    <td>{book.View.length}</td>
                                    <td>{book.FavoriteBook.length}</td>
                                    <td>
                                        <Link href={`/books/${book.id}`} className="text-blue-600 hover:underline">
                                            Voir
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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