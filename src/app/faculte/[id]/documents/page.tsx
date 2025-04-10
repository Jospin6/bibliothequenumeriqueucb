"use client"
import { BookForm } from "@/components/forms/bookForm";
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
import { getBook, selectBook, updateBook } from "@/redux/book/bookSlice";
import { fetchSubjects, selectSubject } from "@/redux/subject/subjectSlice";

// ✅ Schéma Zod
const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    subjectId: z.number().min(1, "Subject is required"),
    file: z
        .any()
        .refine((file) => file?.length === 1, "File is required")
        .refine(
            (file) =>
                ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(
                    file?.[0]?.type
                ),
            "Only PDF or DOCX files are allowed"
        ),
});

type FormData = z.infer<typeof formSchema>;

export default function Documents() {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            subjectId: 0,
            file: null,
        },
    });

    const params = useParams();
    const id = params?.id
    const dispatch = useDispatch<AppDispatch>()
    const faculty = useSelector(selectFaculty)
    const [bookId, setBookId] = useState<number | null>(null)
    const book = useSelector(selectBook)
    const subjects = useSelector(selectSubject)

    useEffect(() => {
        if (book) {
            reset({
                title: book.title,
                subjectId: book.subject.id,
                file: null,
            });
        }
    }, [book, reset]);

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

    useEffect(() => {
        if (bookId) {
            dispatch(getBook(bookId))
        }

    }, [bookId])

      const onSubmit = async (data: any) => {
        setLoading(true);
    
        const formData = new FormData();
        formData.append("title", data.title);
        if (data.subjectId) formData.append("subjectId", data.subjectId);
    
        if (data.file) {
          formData.append("file", data.file);
        } else {
          console.error("Aucun fichier sélectionné !");
          alert("Veuillez sélectionner un fichier.");
          return;
        }
        if (bookId) {
            dispatch(updateBook({bookId, formData}))
            reset()
        
            setLoading(false); 
        }
        
      };
    

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
                                            <td>{book.subject.name}</td>
                                            <td>{book.View.length} fois</td>
                                            <td className="flex justify-center">
                                                <Edit onClick={() => setBookId(book.id!)} size={17} className="text-blue-700 cursor-pointer" />
                                                <Delete size={17} className="text-red-600 ml-2 cursor-pointer" />
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
                        Mofifier un document
                    </div>
                    <div className="text-gray-900 px-3">
                        {/* <div className="border-b h-[50px] px-3 flex items-center">
                            <Input className="h-[35px] bg-transparent border text-gray-300" placeholder="Chercher un email" />
                        </div> */}

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mt-4">
                                <label className="block text-gray-300 text-sm font-medium">Title</label>
                                <input
                                    type="text"
                                    {...register("title")}
                                    placeholder="Titre du livre"
                                    className="w-full border text-gray-300 bg-transparent h-[40px] rounded p-2 mt-1"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm">{errors.title.message}</p>
                                )}
                            </div>

                            <div className="mt-4">
                                <label htmlFor="mat" className="block text-gray-300 text-sm font-medium">Matière</label>
                                <select {...register("subjectId")} className="bg-transparent border text-gray-300 h-[40px] w-full" id="mat">
                                    <option value="">Choix de la matière</option>
                                    {subjects.map(subject => (
                                        <option key={subject.id} value={subject.id}>{subject.name}</option>
                                    ))}
                                </select>
                                {errors.subjectId && (
                                    <p className="text-red-500 text-sm">{errors.subjectId.message}</p>
                                )}
                            </div>

                            <div className="mt-4 text-gray-300">
                                <input
                                    type="file"
                                    accept=".pdf,.docx"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setValue("file", file);
                                        }
                                    }}
                                />
                                {errors.file && <p className="text-red-500">{String(errors.file.message)}</p>}
                            </div>

                            <button type="submit" disabled={loading} className="w-full mt-4 p-2 bg-blue-600 text-white rounded">
                                {loading ? "Uploading..." : "Add Book"}
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