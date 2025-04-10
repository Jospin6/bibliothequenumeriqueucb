"use client"
import { FacultyForm } from "@/components/forms/facultyForm";
import { SubjectForm } from "@/components/forms/subjectForm";
import { Navbar } from "@/components/navigation/navbar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import BooksPerFacultyPieChart from "@/components/ui/BooksPerFacultyPieChart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Expansion from "@/components/ui/expansion";
import Popup from "@/components/ui/popup";
import ViewsPerFacultyBarChart from "@/components/ui/ViewsPerFacultyBarChart";
import { fetchAllBooks, fetchBooks, selectBooks } from "@/redux/book/bookSlice";
import { fetchFaculties } from "@/redux/faculty/facultySlice";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUsers, selectUsers } from "@/redux/user/userSlice";
import { Book, School, User, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [formName, setFormName] = useState<string>()
    const { loading, faculties } = useSelector((state: RootState) => state.faculty)
    const dispatch = useDispatch<AppDispatch>()
    const books = useSelector(selectBooks)
    const users = useSelector(selectUsers)
    const etudients = users.filter(user => user.role === "USER")
    const gestionnaires = users.filter(user => user.role != "USER")
    const handleAddDocPopup = (formName?: string) => {
        setFormName(formName)
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        dispatch(fetchFaculties())
        dispatch(fetchAllBooks())
        dispatch(fetchUsers())
    }, [dispatch])

    const MOCK_DATA = [
        ...faculties.map(faculty => ({ faculty: faculty.name, bookCount: faculty.books?.length! }))
    ];

    const VIEWS_DATA = [
        ...faculties.map(faculty => ({ faculty: faculty.name, viewCount: faculty.books?.reduce((acc, book) => acc + (book.View.length || 0), 0) || 0 }))
    ];

    const handleForms = (title: string = "etudiant") => {
        switch (title) {
            case "fac":
                return
            default:
                return
        }
    }

    return <>
        <div className="mb-6 flex px-4 justify-between items-center border-dashed border-gray-600 border-y h-[60px]">
            <h1 className="text-2xl font-bold text-gray-300">Espace Admin</h1>
            <div className="flex">
                <Button onClick={() => handleAddDocPopup("book")}>Nouveau Faculté</Button>
            </div>
        </div>

        <div className="w-full p-4">
            <div className="grid grid-cols-8 gap-4 text-gray-300">
                <Card className="flex items-center col-span-2">
                    <div className="mr-2">
                        <Book className="w-10 h-10" />
                    </div>
                    <div>
                        <div className="text-lg font-medium">Livres</div>
                        <div className="text-2xl font-bold">{books.books.length}</div>
                    </div>
                </Card>
                <Card className="flex items-center col-span-2">
                    <div className="mr-2">
                        <Users className=" w-10 h-10" />
                    </div>
                    <div>
                        <div className="text-lg font-medium">Etudiants</div>
                        <div className="text-2xl font-bold">{etudients.length}</div>
                    </div>
                </Card>
                <Card className="flex items-center col-span-2">
                    <div className="mr-2">
                        <User className="w-10 h-10" />
                    </div>
                    <div>
                        <div className="text-lg font-medium">Gestionaires</div>
                        <div className="text-2xl font-bold">{gestionnaires.length}</div>
                    </div>
                </Card>
                <Card className="flex items-center col-span-2">
                    <div className="mr-2">
                        <School className="w-10 h-10" />
                    </div>
                    <div>
                        <div className="text-lg font-medium">Facultés</div>
                        <div className="text-2xl font-bold">{faculties.length}</div>
                    </div>
                </Card>
            </div>
            <div className="grid grid-cols-8 gap-4 mt-5">
                <div className="col-span-5 h-auto rounded-2xl border">
                    <BooksPerFacultyPieChart data={MOCK_DATA} />
                </div>
                <div className="col-span-3 h-64 overflow-x-auto rounded-2xl border">
                    <div className="w-full px-3 flex text-gray-300 text-lg font-semibold items-center border-b h-[50px]">
                        Gestionnaires Facultés
                    </div>
                    <div className="px-3">
                        {gestionnaires.map(gest => (
                            <div className="flex items-center mt-2" key={gest.id}>
                                <Avatar className="size-[40px] mr-2">
                                    <AvatarFallback className="font-medium text-gray-300">{gest.name.charAt(0)}{gest.postnom.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="">
                                    <div className="text-gray-300 text-[16px]">{`${gest.name} ${gest.postnom}`}</div>
                                    <div className="text-gray-500 text-sm">{gest.faculty?.name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-8 gap-4 mt-5">
                <div className="col-span-3 h-64 overflow-x-auto rounded-2xl border">
                    <div className="w-full px-3 flex text-gray-300 text-lg font-semibold items-center border-b h-[50px]">
                        Facultés
                    </div>
                    <div className="px-3">
                        {faculties.map(fac => (
                            <div className="flex items-center mt-2">
                                <Avatar className="size-[40px] mr-2">
                                    <AvatarFallback className="font-medium text-gray-300">{fac.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="">
                                    <div className="text-gray-300 text-[16px]">{fac.name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-5 pb-4 h-auto rounded-2xl border">
                    <ViewsPerFacultyBarChart data={VIEWS_DATA} />
                </div>
            </div>
        </div>

        <div className="w-full border-t text-sm text-center text-gray-500 h-[50px] leading-[50px] border-dashed border-gray-600">
            Bibliotheque numerique de l'UCB
        </div>
        {
            isOpen && (<Popup isOpen={isOpen} onClose={handleAddDocPopup}>
                <FacultyForm />
            </Popup>)
        }
    </>
}