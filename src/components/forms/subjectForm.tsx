import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../ui/inputField";
import { TextAreaField } from "../ui/textAreaField";
import { Button } from "../ui/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { subjectSchema } from "@/lib/validationSchema"
import { SubjectFormValues } from "@/types/validation"
import { addSubject } from "@/redux/subject/subjectSlice";

export const SubjectForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<SubjectFormValues>({
        resolver: zodResolver(subjectSchema),
    });
    const dispatch = useDispatch<AppDispatch>()

    const onSubmit = async (data: SubjectFormValues) => {
        dispatch(addSubject({name: data.name, faculteId: data.faculteId}))
        reset()
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputField name={"nom"} placeholder={"Nom de la matière"} register={register} errors={errors} />
            <TextAreaField name={"description"} placeholder={"Description"} label={"Description"} register={register} errors={errors} />
            <div className="flex justify-end">
                <Button label={"Ajouter"} />
            </div>
        </form>
    );
};