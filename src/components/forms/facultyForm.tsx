import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import * as z from "zod";
import { addFaculty } from "@/redux/faculty/facultySlice";
import { InputField } from "../ui/inputField";
import { TextAreaField } from "../ui/textAreaField";
import { Button } from "../ui/Button";
import { subjectAndFacultySchema } from "@/lib/validationSchema"
import { SubjectAndFacutlyFormValues } from "@/types/validation"

export const FacultyForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SubjectAndFacutlyFormValues>({
    resolver: zodResolver(subjectAndFacultySchema),
  });
  const dispatch = useDispatch<AppDispatch>()

  const onSubmit = async (data: SubjectAndFacutlyFormValues) => {
    const formData = new FormData();
    formData.append("nom", data.nom);
    formData.append("description", data.description || "");
    dispatch(addFaculty(formData))
    reset()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField name={"nom"} placeholder={"Nom de la faculté"} register={register} errors={errors} />
      <TextAreaField name={"description"} placeholder={"Description"} label={"Description"} register={register} errors={errors} />
      <div className="flex justify-end">
        <Button label={"Ajouter"} />
      </div>
    </form>
  );
};