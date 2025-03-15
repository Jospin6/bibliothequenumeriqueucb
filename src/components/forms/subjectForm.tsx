"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../ui/inputField";
import { Button } from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { subjectSchema } from "@/lib/validationSchema"
import { SubjectFormValues } from "@/types/validation"
import { addSubject } from "@/redux/subject/subjectSlice";
import { SelectField } from "../ui/selectField";
import {fetchFaculties, selectFaculties} from "@/redux/faculty/facultySlice"
import { useEffect } from "react";

export const SubjectForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<SubjectFormValues>({
        resolver: zodResolver(subjectSchema),
    });
    const dispatch = useDispatch<AppDispatch>()
    const faculties = useSelector(selectFaculties)

    useEffect(() => {
        dispatch(fetchFaculties())
    }, [])

    const onSubmit = async (data: SubjectFormValues) => {
        dispatch(addSubject({ name: data.name, faculteId: data.faculteId }))
        reset()
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputField name={"nom"} placeholder={"Nom de la matière"} register={register} errors={errors} />
            <SelectField
                name="faculteId"
                label="Faculté"
                options={[ 
                    {value: "", label: "Choisi une faculté"},
                    ...(faculties ? faculties.map(fac => ({ value: fac.id?.toString(), label: fac.name })) : []),
                ]}
                register={register}
                errors={errors}
            />
            <div className="flex justify-end">
                <Button label={"Ajouter"} />
            </div>
        </form>
    );
};