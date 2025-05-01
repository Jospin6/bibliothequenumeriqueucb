import { getBook, selectBook, updateBook } from "@/redux/book/bookSlice";
import { selectSubject } from "@/redux/subject/subjectSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AppDispatch } from "@/redux/store";

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


export const EditBookForm = ({ bookId }: { bookId: number }) => {
    const subjects = useSelector(selectSubject)
    const dispatch = useDispatch<AppDispatch>()
    const [loading, setLoading] = useState(false);
    const [flashMesage, setFlashMessage] = useState<string>('')
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

    const book = useSelector(selectBook)


    useEffect(() => {
        if (book) {
            reset({
                title: book.title,
                subjectId: book.subject.id,
                file: null,
            });
        }
    }, [book, reset]);

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
            dispatch(updateBook({ bookId, formData }))
            reset()

            setLoading(false);
            setFlashMessage("Document modifié avec success") 
        }

    };

    return <div className="col-span-3 min-h-64 h-auto pb-4 rounded-2xl border">
        <div className="w-full px-3 flex text-gray-300 text-lg font-semibold items-center border-b h-[50px]">
            Mofifier un document
        </div>
        {flashMesage && (<div className="py-2 rounded-xl bg-green-800 text-green-300">{flashMesage}</div>)}
        <div className="text-gray-900 px-3">

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
}