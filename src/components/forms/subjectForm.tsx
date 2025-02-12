import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../ui/inputField";
import { TextAreaField } from "../ui/textAreaField";
import { Button } from "../ui/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { subjectAndFacultySchema } from "@/lib/validationSchema"
import { SubjectAndFacutlyFormValues } from "@/types/validation"
import { addSubject } from "@/redux/subject/subjectSlice";

export const SubjectForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SubjectAndFacutlyFormValues>({
        resolver: zodResolver(subjectAndFacultySchema),
    });
    const dispatch = useDispatch<AppDispatch>()

    const onSubmit = async (data: SubjectAndFacutlyFormValues) => {
        const formData = new FormData();
        formData.append("nom", data.nom);
        formData.append("description", data.description || "");
        dispatch(addSubject(formData))
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputField name={"nom"} placeholder={"Nom de la matière"} register={register} errors={errors} />
            <TextAreaField name={"description"} placeholder={"Description"} label={"Description"} register={register} errors={errors} />
            <Button label={"Ajouter"} />
        </form>
    );
};