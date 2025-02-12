import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as z from "zod";


// Faculté Schema
const facultySchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().optional(),
});

type FacultyFormValues = z.infer<typeof facultySchema>;

export const FacultyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FacultyFormValues>({
    resolver: zodResolver(facultySchema),
  });

  const onSubmit = async (data: FacultyFormValues) => {
    //   await addDoc(collection(db, "facultes"), data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Nom de la faculté" />
      {errors.name && <p>{errors.name.message}</p>}
      <textarea {...register("description")} placeholder="Description" />
      <button type="submit">Ajouter</button>
    </form>
  );
};