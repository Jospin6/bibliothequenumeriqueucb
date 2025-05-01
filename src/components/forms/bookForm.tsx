import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBook } from "@/redux/book/bookSlice";
import { useEffect, useState } from "react";
import { z } from "zod";
import { fetchSubjects, selectSubject } from "@/redux/subject/subjectSlice";
import { fetchFaculties, selectFaculties } from "@/redux/faculty/facultySlice";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const schema = z.object({
  title: z.string().min(3, "Title is required"),
  auteurId: z.string().optional(),
  faculteId: z.string().optional(),
  subjectId: z.string().optional(),
  categoryId: z.string().optional(),
  file: z.instanceof(File),
});


export const BookForm = ({ facId }: { facId?: number }) => {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const subjects = useSelector(selectSubject)
  const faculties = useSelector(selectFaculties)
  const user = useCurrentUser()
  const [flashMesage, setFlashMessage] = useState<string>('')

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchSubjects(facId))
    dispatch(fetchFaculties())
  }, [dispatch]);

  const onSubmit = async (data: any) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("auteurId", `${user!.id!}`);
    if (data.faculteId) {
      formData.append("faculteId", data.faculteId)
    } else {
      formData.append("faculteId", String(facId!))
    };
    if (data.subjectId) formData.append("subjectId", data.subjectId);
    if (data.categoryId) formData.append("categoryId", data.categoryId);

    if (data.file) {
      const file = data.file as File;
    
      // Récupérer l'extension du fichier
      const fileName = file.name;
      const extension = fileName.split('.').pop()?.toLowerCase();
    
      if (extension && ["pdf", "doc", "docx", "ppt", "pptx"].includes(extension)) {
        formData.append("file", file);
        formData.append("fileType", extension);
      } else {
        console.error("Extension de fichier non supportée !");
        alert("Le fichier doit être un PDF, Word ou PowerPoint.");
        return;
      }
    } else {
      console.error("Aucun fichier sélectionné !");
      alert("Veuillez sélectionner un fichier.");
      return;
    }
    
    dispatch(addBook(formData))
    reset()
    setFlashMessage("Ajout du livre avec success")

    setLoading(false);
  };

  return (
    <div className=" mx-auto">
      <h1 className="text-xl my-4">Ajouter un document</h1>
      {flashMesage && (<div className="py-2 rounded-xl bg-green-800 text-green-300">{flashMesage}</div>)}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("title")} placeholder="Title" className="w-full p-2 border rounded" />
        {errors.title && <p className="text-red-500">{String(errors.title.message)}</p>}

        <div className="w-full">
          <select {...register("subjectId")} id="" className="w-full p-2 border rounded">
            <option value="">Choisi la matière</option>
            {
              subjects.map(subject => <option key={subject.id} value={subject.id} >{subject.name}</option>)
            }
          </select>
        </div>

        {!facId && (
          <div className="w-full">
            <select {...register("faculteId")} id="" className="w-full p-2 border rounded">
              <option value="" className="text-gray-400">Choisi la fac</option>
              {
                faculties.map(fac => <option key={fac.id} value={fac.id} >{fac.name}</option>)
              }
            </select>
          </div>
        )}

        <input
          type="file"
          accept=".pdf,.docx, .pptx"
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
