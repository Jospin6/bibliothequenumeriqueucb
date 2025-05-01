"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import * as z from "zod";
import { fetchFaculty, selectFaculty } from "@/redux/faculty/facultySlice";
import { Button } from "../ui/Button";
import { changeUserRole } from "@/redux/user/userSlice";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { customStyles } from "@/lib/functions";
import { SelectField } from "../ui/selectField";

const Select = dynamic(() => import("react-select"), { ssr: false });


const userRoleSchema = z.object({
    role: z.string()
});

type ChangeUserRoleFormValues = z.infer<typeof userRoleSchema>;

export const ChangeUserRole = ({ facId }: { facId: number }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ChangeUserRoleFormValues>({
        resolver: zodResolver(userRoleSchema),
    });
    const dispatch = useDispatch<AppDispatch>()
    const faculty = useSelector(selectFaculty)
    const [flashMesage, setFlashMessage] = useState<string>('')
    useEffect(() => {
        dispatch(fetchFaculty(facId))
    }, [dispatch])

    const [userId, setUserId] = useState<string>();
    const facultyUserChange = (selectedOption: any) => setUserId(selectedOption.value)

    const facultyUserOptions = faculty?.users?.map((user) => ({
        label: `${user.name} ${user.postnom}, role: ${user.role}`,
        value: user.id,
    }));


    const onSubmit = async (data: ChangeUserRoleFormValues) => {
        dispatch(changeUserRole({ userId: +userId!, role: data.role }))
        reset()
        setFlashMessage("Rôle modifié avec success") 
    };

    return (
        <div>
            <div className="text-xl my-3">Changer le Rôle</div>
            <div className="py-2 rounded-xl bg-green-800 text-green-300">{flashMesage}</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <Select
                        options={facultyUserOptions}
                        onChange={facultyUserChange}
                        placeholder="Choisir un utilisateur"
                        isClearable
                        styles={customStyles}
                    />
                </div>
                <div className="mb-4">
                    <SelectField
                        name={"role"}
                        label={"Role"}
                        options={[
                            { value: "USER", label: "Utilisateur" },
                            { value: "ADMIN", label: "Gestionnaire fac" },
                            { value: "SUPERADMIN", label: "Administrateur" }
                        ]}
                        register={register}
                        errors={errors}
                    />
                </div>
                <div className="flex justify-end">
                    <Button className="bg-black text-gray-200">Ajouter</Button>
                </div>
            </form>
        </div>
    );
};