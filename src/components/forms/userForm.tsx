import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/lib/validationSchema"
import { UserFormValues } from "@/types/validation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

export const UserForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
    });
    const dispatch = useDispatch<AppDispatch>()

    const onSubmit = async (data: UserFormValues) => {
        
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input {...register("name")} placeholder="Nom" />
                {errors.name && <span>{errors.name.message}</span>}
            </div>

            <div>
                <input {...register("postnom")} placeholder="Postnom" />
                {errors.postnom && <span>{errors.postnom.message}</span>}
            </div>

            <div>
                <input {...register("email")} type="email" placeholder="Email" />
                {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div>
                <input {...register("faculteId")} placeholder="Faculté ID" />
                {errors.faculteId && <span>{errors.faculteId.message}</span>}
            </div>

            <div>
                <select {...register("role")}>
                    <option value="admin">Admin</option>
                    <option value="etudiant">Étudiant</option>
                    <option value="professeur">Professeur</option>
                </select>
                {errors.role && <span>{errors.role.message}</span>}
            </div>

            <div>
                <input {...register("password")} type="password" placeholder="Mot de passe" />
                {errors.password && <span>{errors.password.message}</span>}
            </div>

            <button type="submit">Ajouter</button>
        </form>
    );
};