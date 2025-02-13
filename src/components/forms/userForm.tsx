import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/lib/validationSchema"
import { UserFormValues } from "@/types/validation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { InputField } from "../ui/inputField";
import { SelectField } from "../ui/selectField";
import { addUser } from "@/redux/user/userSlice";
import { Button } from "../ui/Button";


export const UserForm = () => {
    const { register, handleSubmit,reset, formState: { errors } } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
    });
    const dispatch = useDispatch<AppDispatch>()

    const onSubmit = async (data: UserFormValues) => {
        const formData = new FormData();
        formData.append("nom", data.nom);
        formData.append("postnom", data.postnom);
        formData.append("email", data.email);
        formData.append("role", data.role);
        formData.append("faculteId", data.faculteId);
        formData.append("password", data.password);
        dispatch(addUser(formData))
        reset()
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
                name={"nom"}
                placeholder={"Nom"}
                register={register}
                errors={errors} />
            <InputField
                name={"postnom"}
                placeholder={"Postnom"}
                register={register}
                errors={errors} />
            <InputField
                name={"email"}
                placeholder={"Email"}
                register={register}
                errors={errors} />
            <div className="grid grid-cols-2 gap-4">
                <SelectField
                    name="faculteId"
                    label="Faculté"
                    options={[
                        { value: "", label: "Choisir une fac" },
                        { value: "science", label: "Sciences" },
                        { value: "droit", label: "Droit" },
                        { value: "medecine", label: "Medecine" }
                    ]}
                    register={register}
                    errors={errors}
                />
                <SelectField
                    name="role"
                    label="Rôle"
                    options={[
                        { value: "", label: "Rôle de l'utilisateur" },
                        { value: "admin", label: "Admin" },
                        { value: "etudiant", label: "Étudiant" },
                        { value: "professeur", label: "Professeur" }
                    ]}
                    register={register}
                    errors={errors}
                />
            </div>
            <InputField
                name={"password"}
                placeholder={"Mot de passe"}
                register={register}
                errors={errors} />

            <div className="flex justify-end">
                <Button label={"Ajouter"} />
            </div>
        </form>
    );
};