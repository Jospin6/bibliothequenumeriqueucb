"use client"
import { FacultyForm } from "@/components/forms/facultyForm";
import { AdminFacs } from "@/components/subComponents/adminFacs";
import { GestFacs } from "@/components/subComponents/gestFacs";
import { Button } from "@/components/ui/Button";
import { MainCard } from "@/components/ui/mainCard";
import Popup from "@/components/ui/popup";
import { fetchAllBooks, selectBooks } from "@/redux/book/bookSlice";
import { fetchFaculties } from "@/redux/faculty/facultySlice";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUsers, selectUsers } from "@/redux/user/userSlice";
import { Book, School, User, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { loading, faculties } = useSelector((state: RootState) => state.faculty)
    const dispatch = useDispatch<AppDispatch>()
    const books = useSelector(selectBooks)
    const users = useSelector(selectUsers)
    const etudients = users.filter(user => user.role === "USER")
    const gestionnaires = users.filter(user => user.role != "USER")
    const handleAddDocPopup = () => setIsOpen(!isOpen)

    useEffect(() => {
        dispatch(fetchFaculties())
        dispatch(fetchAllBooks())
        dispatch(fetchUsers())
    }, [dispatch])

    return <>
        <div className="mb-6 flex px-4 justify-between items-center border-dashed border-gray-600 border-y h-[60px]">
            <h1 className="text-2xl font-bold text-gray-300">Espace Admin</h1>
            <div className="flex">
                <Button onClick={handleAddDocPopup}>Nouveau Faculté</Button>
            </div>
        </div>

        <div className="w-full p-4">
            <div className="grid grid-cols-8 gap-4 text-gray-300">
                <MainCard title={"Livres"} subTitle={`${books.books.length}`} Icon={Book}/>
                <MainCard title={"Etudiants"} subTitle={`${etudients.length}`} Icon={Users}/>
                <MainCard title={"Gestionaires"} subTitle={`${gestionnaires.length}`} Icon={User}/>
                <MainCard title={"Facultés"} subTitle={`${faculties.length}`} Icon={School}/>
                
            </div>
            <div className="grid grid-cols-8 gap-4 mt-5">
                <GestFacs/>
            </div>

            <div className="grid grid-cols-8 gap-4 mt-5">
                <AdminFacs/>
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