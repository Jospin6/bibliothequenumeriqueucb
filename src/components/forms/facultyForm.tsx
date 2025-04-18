import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import * as z from "zod";
import { addFaculty } from "@/redux/faculty/facultySlice";
import { InputField } from "../ui/inputField";
import { TextAreaField } from "../ui/textAreaField";
import { Button } from "../ui/button";
import { facultySchema } from "@/lib/validationSchema"
import { faculteFormValues } from "@/types/validation"

export const FacultyForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<faculteFormValues>({
    resolver: zodResolver(facultySchema),
  });
  const dispatch = useDispatch<AppDispatch>()

  const onSubmit = async (data: faculteFormValues) => {
    dispatch(addFaculty({ name: data.name }))
    reset()
  };

  return (
    <div>
      <div className="text-xl my-3">Ajouter une faculté</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField name={"name"} placeholder={"Nom de la faculté"} register={register} errors={errors} />
        <div className="flex justify-end">
          <Button className="bg-black text-gray-200">Ajouter</Button>
        </div>
      </form>
    </div>
  );
};