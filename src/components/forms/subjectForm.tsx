"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../ui/inputField";
import { Button } from "../ui/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { subjectSchema } from "@/lib/validationSchema"
import { SubjectFormValues } from "@/types/validation"
import { addSubject } from "@/redux/subject/subjectSlice";

export const SubjectForm = ({ id }: { id: number }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<SubjectFormValues>({
        resolver: zodResolver(subjectSchema),
    });
    const dispatch = useDispatch<AppDispatch>()

    const onSubmit = async (data: SubjectFormValues) => {
        dispatch(addSubject({ name: data.name, faculteId: Number(id) }))
        reset()
    };

    return (
        <>
            <div className="text-xl my-3">Ajouter une matière</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField name={"name"} placeholder={"Nom de la matière"} register={register} errors={errors} />
                <div className="flex justify-end">
                    <Button label={"Ajouter"} />
                </div>
            </form>
        </>
    );
};