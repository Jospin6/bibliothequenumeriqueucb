import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBook } from "@/redux/book/bookSlice";
import { bookSchema } from "@/lib/validationSchema"
import { BookFormValues } from "@/types/validation"
import { InputField } from "@/components/ui/inputField"
import { ImageField } from "@/components/ui/imageField"
import { SelectField } from "../ui/selectField";
import { Button } from "../ui/Button";
import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(3, "Title is required"),
  auteurId: z.string().min(1, "Author ID is required"),
  faculteId: z.string().optional(),
  subjectId: z.string().optional(),
  categoryId: z.string().optional(),
  file: z.instanceof(File),
});


export const BookForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  // dispatch(addBook(formData))

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>()

  const onSubmit = async (data: any) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("auteurId", data.auteurId);
    if (data.faculteId) formData.append("faculteId", data.faculteId);
    if (data.subjectId) formData.append("subjectId", data.subjectId);
    if (data.categoryId) formData.append("categoryId", data.categoryId);

    if (data.file) {
      formData.append("file", data.file); // Assurez-vous qu'on envoie bien un fichier
      console.log("file: ", data.file)
    } else {
      console.error("Aucun fichier sélectionné !");
      alert("Veuillez sélectionner un fichier.");
      return;
    }

    // Vérifier le contenu de formData
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const res = await fetch("/api/books", {
      method: "POST",
      body: formData,
    });

    setLoading(false);
    if (!res.ok) alert("Error while adding book!");
    else alert("Book added successfully!");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-5">Add a New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("title")} placeholder="Title" className="w-full p-2 border rounded" />
        {errors.title && <p className="text-red-500">{String(errors.title.message)}</p>}

        <input {...register("auteurId")} placeholder="Author ID" className="w-full p-2 border rounded" />
        {errors.auteurId && <p className="text-red-500">{String(errors.auteurId.message)}</p>}

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

        <button type="submit" disabled={loading} className="w-full p-2 bg-blue-600 text-white rounded">
          {loading ? "Uploading..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};
