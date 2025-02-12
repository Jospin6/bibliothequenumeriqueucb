import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as z from "zod";

// Matière Schema
const subjectSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    description: z.string().optional(),
});

type SubjectFormValues = z.infer<typeof subjectSchema>;

export const SubjectForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SubjectFormValues>({
        resolver: zodResolver(subjectSchema),
    });

    const onSubmit = async (data: SubjectFormValues) => {
        //   await addDoc(collection(db, "matieres"), data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name")} placeholder="Nom de la matière" />
            <textarea {...register("description")} placeholder="Description" />
            <button type="submit">Ajouter</button>
        </form>
    );
};