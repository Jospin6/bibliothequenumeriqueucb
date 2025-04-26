"use client"
import { BookForm } from "@/components/forms/bookForm";
import { FacultyForm } from "@/components/forms/facultyForm";
import { SubjectForm } from "@/components/forms/subjectForm";
import { Navbar } from "@/components/navigation/navbar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import BooksPerSubjectChart from "@/components/ui/BooksPerSubjectChart";
import BooksViewsPieChart from "@/components/ui/BooksViewsPieChart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Popup from "@/components/ui/popup";
import { fetchFaculty, selectFaculty } from "@/redux/faculty/facultySlice";
import { AppDispatch } from "@/redux/store";
import { fetchSubjects, selectSubject } from "@/redux/subject/subjectSlice";
import { Book, BookOpen, Paperclip, Star, User, Users } from "lucide-react";
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
    const subjets = useSelector(selectSubject)

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

    const mockData = [
        ...subjets.map(subject => ({ subject: subject.name, bookCount: subject.books!.length! }))
    ];
    const MOCK_DATA = [
        ...faculty?.books?.map(book => ({ bookTitle: book.title, viewCount: book.View.length! })) ?? [],
    ];

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
                <h1 className="text-2xl font-bold">{faculty?.name}</h1>
                <div className="flex">
                    <Button onClick={() => handleAddDocPopup("book")} className="mr-4">Nouveau Livre</Button>
                    <Button onClick={() => handleAddDocPopup("subject")} className="">Nouveau Matière</Button>
                </div>
            </div>
            <div className="w-full px-4 m-auto">
                <div className="grid grid-cols-6 gap-4">
                    <Card className="col-span-2 flex items-center">
                        <div className="mr-2">
                            <Users className=" w-10 h-10" />
                        </div>
                        <div>
                            <div className="text-lg font-medium">Etudiants</div>
                            <div className="text-2xl font-bold">{faculty?.users && faculty?.users?.length}</div>
                        </div>
                    </Card>
                    <Card className="col-span-2 flex items-center">
                        <div className="mr-2">
                            <Book className="w-10 h-10" />
                        </div>
                        <div>
                            <div className="text-lg font-medium">Livres</div>
                            <div className="text-2xl font-bold">{faculty?.books && faculty?.books?.length}</div>
                        </div>
                    </Card>
                    <Card className="col-span-2 flex items-center">
                        <div className="mr-2">
                            <BookOpen className="w-10 h-10" />
                        </div>
                        <div>
                            <div className="text-lg font-medium">Matières</div>
                            <div className="text-2xl font-bold">{faculty?.subjects && faculty?.subjects?.length}</div>
                        </div>
                    </Card>
                </div>


                <div className="grid grid-cols-8 h-auto gap-4 mt-5">
                    <div className="col-span-5 h-auto pb-3 rounded-2xl border">
                        <BooksPerSubjectChart data={mockData} />
                    </div>
                    <div className="col-span-3 h-auto pb-3 rounded-2xl border">
                        <div className="w-full px-3 flex text-gray-300 text-lg font-semibold items-center border-b h-[50px]">
                            Livres
                        </div>
                        <div className="px-3">
                            {faculty?.books?.map(book => (
                                <div className="flex items-center mt-2" key={book.id}>
                                    <Avatar className="size-[40px] mr-2">
                                        <AvatarFallback className="font-medium text-gray-300">{book.title.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="">
                                        <div className="text-gray-300 text-[16px]">{book.title}</div>
                                        <div className="text-gray-500 text-sm">{book.subject.name}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-8 gap-4 mt-5">
                    <div className="col-span-3 h-auto rounded-2xl border">
                        <div className="w-full px-3 flex text-gray-300 text-lg font-semibold items-center border-b h-[50px]">
                            Matières
                        </div>
                        <div className="px-3">
                            {faculty?.subjects?.map(subject => (
                                <div className="flex items-center mt-2" key={subject.id}>
                                    <Avatar className="size-[40px] mr-2">
                                        <AvatarFallback className="font-medium text-gray-300">{subject.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="">
                                        <div className="text-gray-300 text-[16px]">{subject.name}</div>
                                        {/* <div className="text-gray-500 text-sm">{subject.name}</div> */}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                    <div className="col-span-5 h-auto rounded-2xl border">
                        <BooksViewsPieChart data={MOCK_DATA} />
                    </div>
                </div>
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