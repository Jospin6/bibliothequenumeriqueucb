"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updateUser } from "@/redux/user/userSlice";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useEffect } from "react";

const schema = z.object({
    name: z.string().min(2, "Le nom doit avoir au moins 2 caractères"),
    postNom: z.string().min(2, "Le post-nom doit avoir au moins 2 caractères"),
});

type FormValues = z.infer<typeof schema>;

export default function EditUserForm() {
    const dispatch = useDispatch<AppDispatch>();
    const user = useCurrentUser()

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            postNom: ""
        },
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user.name,
                postNom: user.postnom
            });
        }
    }, [user, reset]);

    const onSubmit = (data: FormValues) => {
        const body = {
            id: user!.id!.toString(),
            name: data.name,
            postnom: data.postNom,
        }
        dispatch(updateUser(body));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded-lg shadow-md w-full">
            <div>
                <label className="block text-sm font-medium">Nom</label>
                <input
                    {...register("name")}
                    className="mt-1 block w-full h-[35px] border rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200 p-2"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium">Post-nom</label>
                <input
                    {...register("postNom")}
                    className="mt-1 block w-full h-[35px] border rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200 p-2"
                />
                {errors.postNom && <p className="text-red-500 text-sm">{errors.postNom.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
                {isSubmitting ? "Modification en cours..." : "Modifier"}
            </button>
        </form>
    );
}
