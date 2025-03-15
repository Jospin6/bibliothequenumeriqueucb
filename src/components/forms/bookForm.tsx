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
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("auteurId", data.auteurId);
    if (data.faculteId) formData.append("faculteId", data.faculteId);
    if (data.subjectId) formData.append("subjectId", data.subjectId);
    if (data.categoryId) formData.append("categoryId", data.categoryId);
    formData.append("file", data.file[0]);

    const res = await fetch("/api/books", { method: "POST", body: formData });

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

          <input {...register("file")} type="file" accept=".pdf,.docx" className="w-full p-2 border rounded" />
          {errors.file && <p className="text-red-500">{String(errors.file.message)}</p>}

          <button type="submit" disabled={loading} className="w-full p-2 bg-blue-600 text-white rounded">
            {loading ? "Uploading..." : "Add Book"}
          </button>
        </form>
      </div>
  );
};
