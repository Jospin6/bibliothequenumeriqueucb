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
  password: z.string().min(6, "Mot de passe trop court"),
});

export default function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<User>({ resolver: zodResolver(schema) });

  const [error, setError] = useState("");

  const onSubmit = async (data: User) => {
    setError("");

    try {
      const response = await dispatch(postUser(data)).unwrap();
      console.log(response)

    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
    redirect("/");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Inscription</h2>
      {error && <p className="text-red-500">{error}</p>}
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
        <InputField
          name={"password"}
          placeholder={"Mot de passe"}
          register={register}
          errors={errors} />

        <div className="flex justify-end">
          <Button label={"Ajouter"} />
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
