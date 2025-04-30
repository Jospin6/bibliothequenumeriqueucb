"use client"
import { BookForm } from "@/components/forms/bookForm";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/iaInput";
import Popup from "@/components/ui/popup";
import { fetchFaculty, selectFaculty } from "@/redux/faculty/facultySlice";
import { AppDispatch } from "@/redux/store";
import { Delete, Edit, Import } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createAuthorisation, deleteAuthorisation, fetchAuthorizedFacultyUsers, selectAuthorizedFacultyUsers } from "@/redux/user/authorisedUserSlice";
import { deleteUser } from "@/redux/user/userSlice";

const formSchema = z.object({
    email: z.string().min(1, "Title is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function App() {
    const params = useParams();
    const id = params?.id
    const dispatch = useDispatch<AppDispatch>()
    const faculty = useSelector(selectFaculty)
    const authorisedUsers = useSelector(selectAuthorizedFacultyUsers)
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    
    const filteredEmails = authorisedUsers.filter((email) =>
        email.email.toLowerCase().includes(search.toLowerCase())
      );

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const handleAddDocPopup = () => setIsOpen(!isOpen)

    const handleUserDeletion = (id: number) => dispatch(deleteUser(id))
    const handleAutorizedEmailDeletion = (id: number) => dispatch(deleteAuthorisation(id))

    useEffect(() => {
        dispatch(fetchFaculty(+id!))
        dispatch(fetchAuthorizedFacultyUsers(+id!))
    }, [dispatch])

    const onSubmit = async (data: {email: string}) => {
        setLoading(true);
        dispatch(createAuthorisation({
            email: data.email,
            faculteId: +id!
        }))
        reset()
    };

    return (
        <>
            <div className="mb-6 flex px-4 justify-between items-center border-dashed border-gray-600 border-y h-[60px]">
                <h1 className="text-2xl font-bold">{faculty?.name}</h1>
                <div className="flex">
                    <Button onClick={handleAddDocPopup}>Nouveau Email</Button>
                </div>
            </div>

            <div className="grid grid-cols-8 gap-4 mt-5 px-4">
                <div className="col-span-5 h-64 rounded-2xl border">
                    <div className="w-full px-3 flex text-gray-300 text-lg font-semibold items-center border-b h-[50px]">
                        Etudiants
                    </div>
                    <div>
                        <table className="w-full text-center text-sm">
                            <thead>
                                <tr className="border-b h-[35px]">
                                    <th>Nom</th>
                                    <th>Postnom</th>
                                    <th>Mail</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    faculty?.users?.map((student, index) => (
                                        <tr key={index} className="border-b">
                                            <td>{student.name}</td>
                                            <td>{student.postnom}</td>
                                            <td>{student.email}</td>
                                            <td className="flex justify-center">
                                                <Delete size={17} onClick={() => handleUserDeletion(student.id!)} className="text-red-600 ml-2" />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-3 h-64 rounded-2xl border">
                    <div className="w-full px-3 flex text-gray-300 text-lg font-semibold items-center border-b h-[50px]">
                        Les Emails Authorisés
                    </div>
                    <div className="">
                        <div className="border-b h-[50px] px-3 flex items-center">
                            <Input 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-[35px] bg-transparent border text-gray-300" 
                                placeholder="Chercher un email" 
                            />
                        </div>
                        <table className="w-full text-center text-sm">
                            <thead>
                                <tr className="border-b h-[35px]">
                                    <th>Emails</th>
                                    <th>Statut</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredEmails.map((student, index) => (
                                        <tr key={index} className="border-b">
                                            <td>{student.email}</td>
                                            <td>{student.isActive ? (<span className="text-green-500 px-3 py-[2px] rounded-2xl">
                                                Active
                                            </span>) : (<span className="text-yellow-500 rounded-2xl px-3 py-[2px]">
                                                Suspendu
                                            </span>)}</td>
                                            <td className="flex justify-center">
                                                <Delete size={17} onClick={() => handleAutorizedEmailDeletion(student.id!)} className="text-red-600 ml-2" />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {
                isOpen && (<Popup isOpen={isOpen} className="text-gray-950" onClose={handleAddDocPopup}>
                    <div className="text-gray-900">
                        <div className="flex justify-between">
                            <div className="font-medium text-black">Ajouter des Emails</div>
                            <div className="text-sm cursor-pointer flex items-center text-blue-700">
                                <Import size={15} className="mr-[3px]" />
                                <span>{"importer (csv ou excel)"}</span>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mt-4">
                                <label className="block text-sm font-medium">Title</label>
                                <input
                                    type="text"
                                    {...register("email")}
                                    placeholder="Titre du livre"
                                    className="w-full border bg-transparent h-[40px] rounded p-2 mt-1"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>

                            <button type="submit" disabled={loading} className="w-full mt-4 p-2 bg-blue-600 text-white rounded">
                                {loading ? "Uploading..." : "Add Book"}
                            </button>
                        </form>
                    </div>
                </Popup>)
            }
        </>
    );
}