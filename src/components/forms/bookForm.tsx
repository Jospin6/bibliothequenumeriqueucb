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


export const BookForm = () => {
  const { register, handleSubmit, setValue, reset, watch, trigger, formState: { errors } } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
  });
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: BookFormValues) => {
    const formData = new FormData();
    formData.append("titre", data.titre);
    formData.append("auteurId", "1");
    formData.append("auteurNom", "Auteur");
    formData.append("faculteId", data.faculteId);
    formData.append("matiereId", data.matiereId);

    if (data.file) {
      formData.append("file", data.file);
    }

    dispatch(addBook(formData));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField name={"titre"} placeholder={"Entrer le titre"} register={register} errors={errors} />
      <SelectField
        name="faculteId"
        label="Faculté"
        options={[
          { value: "sciences", label: "Sciences" },
          { value: "droit", label: "Droit" },
          { value: "medecine", label: "Medecine" }
        ]}
        register={register}
        errors={errors}
      />
      <SelectField
        name="matiereId"
        label="Matière"
        options={[
          { value: "math", label: "Math" },
          { value: "biologie", label: "Biologie" },
          { value: "chimie", label: "Chimie" }
        ]}
        register={register}
        errors={errors}
      />
      <ImageField 
        name="file" 
        accept=".pdf,.doc,.docx,.ppt,.pptx" 
        register={register} 
        setValue={setValue} 
        trigger={trigger} 
        watch={watch}
        errors={errors} />
      <div className="flex justify-end">
        <Button label={"Ajouter"} />
      </div>
    </form>
  );
};
