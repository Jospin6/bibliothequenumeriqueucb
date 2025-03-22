"use client"
import { Navbar } from "@/components/navigation/navbar";
import { fetchFaculty, selectFaculty } from "@/redux/faculty/facultySlice";
import { AppDispatch } from "@/redux/store";
import { Delete, Edit } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
    const params = useParams();
    const id = params?.id
    const dispatch = useDispatch<AppDispatch>()
    const faculty = useSelector(selectFaculty)

    useEffect(() => {
        dispatch(fetchFaculty(+id!))
    }, [dispatch])

    return (
        <>
            <Navbar />
            <div className="w-8/12 m-auto">
                <div className="text-2xl py-4">Faculté de {faculty?.name}</div>
                <div>Etudiants</div>
                <table className="w-full text-center text-sm">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th>Nom</th>
                                <th>Postnom</th>
                                <th>Mail</th>
                                <th>Nombre de favoris</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                faculty?.users?.map((student, index) => (
                                    <tr key={index} className="border-b border-gray-300">
                                        <td>{student.name}</td>
                                        <td>{student.postnom}</td>
                                        <td>{student.email}</td>
                                        <td></td>
                                        <td>
                                            <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                                                <Edit size={20}/>
                                            </button>
                                            <button className="bg-red-500 text-white px-2 py-1 rounded-md ml-2">
                                                <Delete size={20}/>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                </table>
            </div>
        </>
    );
}