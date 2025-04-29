"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { User } from "@/types/user_type";
import { postUser } from "@/redux/user/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { InputField } from "@/components/ui/inputField";
import { SelectField } from "@/components/ui/selectField";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  name: z.string().min(2, "Nom trop court"),
  email: z.string().email("Email invalide"),
  postnom: z.string().min(2, "Post nom trop court"),
  password: z.string().min(6, "Mot de passe trop court"),
});

type registrationFormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<registrationFormData>({ resolver: zodResolver(schema) });

  const [error, setError] = useState("");

  const onSubmit = async (data: registrationFormData) => {
    setError("");
    try {
      await dispatch(postUser(data)).unwrap();

    } catch (error) {
      console.log("Erreur lors de l'inscription de l'utilisateur :", error);
    }
    redirect("/");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Inscription</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name={"name"}
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
        <InputField
          name={"password"}
          placeholder={"Mot de passe"}
          register={register}
          errors={errors} />

        <div className="flex justify-end">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Connexion..." : "S'inscrire"}
        </button>
        </div>
      </form>
      <div className="mt-4 flex text-sm justify-center">
        <span className="pr-2">Already have an account?</span>
        <Link href="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}
