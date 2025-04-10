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
import { fetchFaculties } from "@/redux/faculty/facultySlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Book, School, User, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [formName, setFormName] = useState<string>()
    const { loading, faculties } = useSelector((state: RootState) => state.faculty)
    const dispatch = useDispatch<AppDispatch>()
    const handleAddDocPopup = (formName?: string) => {
        setFormName(formName)
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        dispatch(fetchFaculties())
    }, [])

    const MOCK_DATA = [
        ...faculties.map(faculty => ({ faculty: faculty.name, bookCount: faculty.books?.length! }))
    ];

    const VIEWS_DATA = [
        ...faculties.map(faculty => ({ faculty: faculty.name, viewCount: faculty.books?.reduce((acc, book) => acc + (book.View.length || 0), 0) || 0 }))
    ];

    const handleForms = (title: string = "etudiant") => {
        switch (title) {
            case "fac":
                return <FacultyForm />
            default:
                return
        }
    }

    return <>
        <div className="w-full border-t border-dashed border-gray-600"></div>

        <div className="w-full p-4">
            <div className="grid grid-cols-8 gap-4 text-gray-300">
                <Card className="flex items-center col-span-2">
                    <div className="mr-2">
                        <Book className="w-10 h-10" />
                    </div>
                    <div>
                        <div className="text-lg font-medium">Livres</div>
                        <div className="text-2xl font-bold">140</div>
                    </div>
                </Card>
                <Card className="flex items-center col-span-2">
                    <div className="mr-2">
                        <Users className=" w-10 h-10" />
                    </div>
                    <div>
                        <div className="text-lg font-medium">Etudiants</div>
                        <div className="text-2xl font-bold">140</div>
                    </div>
                </Card>
                <Card className="flex items-center col-span-2">
                    <div className="mr-2">
                        <User className="w-10 h-10" />
                    </div>
                    <div>
                        <div className="text-lg font-medium">Gestionaires</div>
                        <div className="text-2xl font-bold">140</div>
                    </div>
                </Card>
                <Card className="flex items-center col-span-2">
                    <div className="mr-2">
                        <School className="w-10 h-10" />
                    </div>
                    <div>
                        <div className="text-lg font-medium">Facultés</div>
                        <div className="text-2xl font-bold">140</div>
                    </div>
                </Card>
            </div>
            <div className="grid grid-cols-8 gap-4 mt-5">
                <div className="col-span-5 h-auto rounded-2xl border">
                    <BooksPerFacultyPieChart data={MOCK_DATA} />
                </div>
                <div className="col-span-3 h-64 rounded-2xl border">
                    <div className="w-full px-3 flex text-gray-300 text-lg font-semibold items-center border-b h-[50px]">
                        Gestionnaires Facultés
                    </div>
                    <div className="px-3">
                        <div className="flex items-center mt-2">
                            <Avatar className="size-[40px] mr-2">
                                <AvatarFallback className="font-medium text-gray-300">Av</AvatarFallback>
                            </Avatar>
                            <div className="">
                                <div className="text-gray-300 text-[16px]">Jospin ndagano</div>
                                <div className="text-gray-500 text-sm">sciences</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-8 gap-4 mt-5">
                <div className="col-span-3 h-64 rounded-2xl border">
                    <div className="w-full px-3 flex text-gray-300 text-lg font-semibold items-center border-b h-[50px]">
                        Documents les plus conculté
                    </div>
                    <div className="px-3">
                        <div className="flex items-center mt-2">
                            <Avatar className="size-[40px] mr-2">
                                <AvatarFallback className="font-medium text-gray-300">Av</AvatarFallback>
                            </Avatar>
                            <div className="">
                                <div className="text-gray-300 text-[16px]">Jospin ndagano</div>
                                <div className="text-gray-500 text-sm">sciences</div>
                            </div>
                        </div>
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


        {/* <div className=" ">
            <div className="flex justify-end pb-3 mt-2">
                <Button onClick={() => handleAddDocPopup("fac")} className="mr-4">Nouvelle Faculté</Button>
            </div>
            <div>
                {loading ? "Chargement..." : faculties.map((fac) => (<Expansion faculty={fac} key={fac.id} />))}
            </div>
        </div> */}
        {
            isOpen && (<Popup isOpen={isOpen} onClose={handleAddDocPopup}>
                {handleForms(formName!)}
            </Popup>)
        }
    </>
}