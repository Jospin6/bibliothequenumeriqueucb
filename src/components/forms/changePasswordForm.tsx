import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { updatePassword } from "@/redux/user/userSlice";
import { useState } from "react";

const schema = z
    .object({
        oldPassword: z.string().min(1, "L'ancien mot de passe est requis"),
        newPassword: z.string().min(6, "Le nouveau mot de passe doit avoir au moins 6 caractères"),
        confirmPassword: z.string().min(6, "Veuillez confirmer votre nouveau mot de passe"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmPassword"],
    });

type FormValues = z.infer<typeof schema>;

export default function ChangePasswordForm() {
    const dispatch = useDispatch<AppDispatch>();
    const user = useCurrentUser()
    const [flashMesage, setFlashMessage] = useState<string>('')
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormValues) => {
        const body = {
            id: user!.id!.toString(),
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
        }
        dispatch(updatePassword(body))
        reset();
        setFlashMessage("Mot de passe modifié avec success") 
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded-lg shadow-md w-full">
            <div className="py-2 rounded-xl bg-green-800 text-green-300">{flashMesage}</div>
            <div>
                <label className="block text-sm font-medium">Ancien mot de passe</label>
                <input
                    type="password"
                    {...register("oldPassword")}
                    className="mt-1 block w-full rounded-md h-[35px] border border-gray-300 shadow-sm focus:ring focus:ring-blue-200 p-2"
                />
                {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium">Nouveau mot de passe</label>
                <input
                    type="password"
                    {...register("newPassword")}
                    className="mt-1 block w-full h-[35px] rounded-md shadow-sm border border-gray-300 focus:ring focus:ring-blue-200 p-2"
                />
                {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium">Confirmer le nouveau mot de passe</label>
                <input
                    type="password"
                    {...register("confirmPassword")}
                    className="mt-1 block w-full rounded-md h-[35px] border border-gray-300 shadow-sm focus:ring focus:ring-blue-200 p-2"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
                {isSubmitting ? "Modification en cours..." : "Modifier le mot de passe"}
            </button>
        </form>
    );
}
