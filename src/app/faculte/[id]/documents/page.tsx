"use client"
import { BookForm } from "@/components/forms/bookForm";
import { Button } from "@/components/ui/Button";
import Popup from "@/components/ui/popup";
import { fetchFaculty, selectFaculty } from "@/redux/faculty/facultySlice";
import { AppDispatch } from "@/redux/store";
import { Delete, Edit } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook } from "@/redux/book/bookSlice";
import { fetchSubjects } from "@/redux/subject/subjectSlice";
import { EditBookForm } from "@/components/forms/editBookForm";

export default function Documents() {
    const params = useParams();
    const id = params?.id
    const dispatch = useDispatch<AppDispatch>()
    const faculty = useSelector(selectFaculty)
    const [bookId, setBookId] = useState<number | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [formName, setFormName] = useState<string>()
    const handleAddDocPopup = (formName?: string) => {
        setFormName(formName)
        setIsOpen(!isOpen)
    }

    const handleForms = (title: string = "book") => {
        switch (title) {
            case "book":
                return <BookForm facId={+id!} />
            default:
                return
        }
    }

    useEffect(() => {
        dispatch(fetchFaculty(+id!))
        dispatch(fetchSubjects())
    }, [dispatch])
    const handleBookDeletion = (id: number) => dispatch(deleteBook(id))

    return (
        <>
            <div className="mb-6 flex px-4 justify-between items-center border-dashed border-gray-600 border-y h-[60px]">
                <h1 className="text-2xl font-bold">{faculty?.name}</h1>
                <div className="flex">
                    <Button onClick={() => handleAddDocPopup("book")}>Nouveau Livre</Button>
                </div>
            </div>
            <div className="grid grid-cols-8 min-h-64 h-auto gap-4 mt-5 px-4">
                <div className="col-span-5 h-64 rounded-2xl border">
                    <div className="w-full px-3 flex text-gray-300 text-lg font-semibold items-center border-b h-[50px]">
                        Documents
                    </div>
                    <div>
                        <table className="w-full text-center text-sm">
                            <thead>
                                <tr className="border-b h-[35px]">
                                    <th>Titre</th>
                                    <th>Matière</th>
                                    <th>Consuté</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    faculty?.books?.map((book, index) => (
                                        <tr key={index} className="border-b">
                                            <td>{book.title}</td>
                                            <td>{book.subject && book.subject.name}</td>
                                            <td>{book.View.length} fois</td>
                                            <td className="flex justify-center">
                                                <Edit onClick={() => setBookId(book.id!)} size={17} className="text-blue-700 cursor-pointer" />
                                                <Delete size={17} onClick={() => handleBookDeletion(book.id!)} className="text-red-600 ml-2 cursor-pointer" />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {bookId && (<EditBookForm bookId={bookId}/>)}
            </div>
            {
                isOpen && (<Popup isOpen={isOpen} className="text-gray-950" onClose={handleAddDocPopup}>
                    {handleForms(formName!)}
                </Popup>)
            }
        </>
    );
}