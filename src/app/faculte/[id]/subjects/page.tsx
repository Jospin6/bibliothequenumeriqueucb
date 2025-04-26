"use client"
import { BookForm } from "@/components/forms/bookForm";
import { SubjectForm } from "@/components/forms/subjectForm";
import { Navbar } from "@/components/navigation/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/iaInput";
import Popup from "@/components/ui/popup";
import { fetchFaculty, selectFaculty } from "@/redux/faculty/facultySlice";
import { AppDispatch } from "@/redux/store";
import { Delete, Edit } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { deleteSubject, getSubject, selectOneSubject, selectSubject, updateSubject } from "@/redux/subject/subjectSlice";

const formSchema = z.object({
    name: z.string().min(1, "Title is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function Subjects() {
    const params = useParams();
    const id = params?.id
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>()
    const faculty = useSelector(selectFaculty)
    const subject = useSelector(selectOneSubject)
    const [subjectId, setSubjectId] = useState<number | null>(null)

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [formName, setFormName] = useState<string>()
    const handleAddDocPopup = (formName?: string) => {
        setFormName(formName)
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        if (subjectId) {
            reset({
                name: subject?.name,
            });
        }
    }, [subjectId, reset]);

    const handleForms = (title: string = "subject") => {
        switch (title) {
            case "subject":
                return <SubjectForm id={+id!} />
            default:
                return
        }
    }

    const handleSubjectDelection = (id: number) => dispatch(deleteSubject(id))

    const onSubmit = async (data: {name: string}) => {
        setLoading(true);
        if (subjectId) {
            dispatch(updateSubject({ id: subjectId, name: data.name  }))
            reset()
            setLoading(false);
        }
    };

    useEffect(() => {
        if (subjectId) {
            dispatch(getSubject(subjectId))
        }

    }, [subjectId])

    useEffect(() => {
        dispatch(fetchFaculty(+id!))
    }, [dispatch])

    return (
        <>
            <div className="mb-6 flex px-4 justify-between items-center border-dashed border-gray-600 border-y h-[60px]">
                <h1 className="text-2xl font-bold">{faculty?.name}</h1>
                <div className="flex">
                    <Button onClick={() => handleAddDocPopup("subject")}>Nouvelle Matière</Button>
                </div>
            </div>

            <div className="grid grid-cols-8 gap-4 mt-5 px-4">
                <div className="col-span-5 h-64 rounded-2xl border">
                    <div className="w-full px-3 flex text-gray-300 text-lg font-semibold items-center border-b h-[50px]">
                        Matières
                    </div>
                    <div>
                        <table className="w-full text-center text-sm">
                            <thead>
                                <tr className="border-b h-[35px]">
                                    <th>Title</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    faculty?.subjects?.map((subject, index) => (
                                        <tr key={index} className="border-b">
                                            <td>{subject.name}</td>
                                            <td className="flex justify-center">
                                                <Edit onClick={() => setSubjectId(subject.id!)} size={17} className="text-blue-700 cursor-pointer" />
                                                <Delete size={17} onClick={() => handleSubjectDelection(subject.id!)} className="text-red-600 ml-2 cursor-pointer" />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-3 min-h-64 h-auto pb-4 rounded-2xl border">
                    <div className="w-full px-3 flex text-gray-300 text-lg font-semibold items-center border-b h-[50px]">
                        Mofifier une Matière
                    </div>
                    <div className="text-gray-900 px-3">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mt-4">
                                <label className="block text-gray-300 text-sm font-medium">Nom</label>
                                <input
                                    type="text"
                                    {...register("name")}
                                    placeholder="Nom de la Matière"
                                    className="w-full border text-gray-300 bg-transparent h-[40px] rounded p-2 mt-1"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}
                            </div>
                            <button type="submit" disabled={loading} className="w-full mt-4 p-2 bg-blue-600 text-white rounded">
                                {loading ? "Uploading..." : "Valider"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {
                isOpen && (<Popup isOpen={isOpen} className="text-gray-950" onClose={handleAddDocPopup}>
                    {handleForms(formName!)}
                </Popup>)
            }
        </>
    );
}