"use client"
import ChangePasswordForm from "@/components/forms/changePasswordForm";
import EditUserForm from "@/components/forms/editUserForm";
import { Navbar } from "@/components/navigation/navbar";
import { BigTitle } from "@/components/ui/bigTitle";
import { SecondTitle } from "@/components/ui/secondTitle";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUser, logoutUser } from "@/redux/user/userSlice";
import {  BookIcon, Star } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Account() {
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state: RootState) => state.user.user)
    const currentUser = useCurrentUser()

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchUser(currentUser.id!))
        }
    }, [currentUser, dispatch])

    const handleLogout = () => dispatch(logoutUser())

    return <div className="">
        <Navbar />
        <div className="m-auto w-2/4 py-6">
            <div className="mb-4 flex justify-between items-center shadow-md p-3 rounded-lg">
                <div>
                    <div className="flex">
                        <BigTitle title={user?.name!} className="mr-3" />
                        <BigTitle title={user?.postnom!} />
                    </div>
                    <div className="text-blue-700 text-[15px]">{user?.email}</div>
                    <div> {user?.role === "USER" && "Etudiant"}</div>
                    <div > Faculté: {user?.faculty?.name} </div>
                </div>
                <span className="text-blue-700 text-[15px]"></span>
            </div>


            <div className="grid grid-cols-4 gap-4 my-4">
                <div className="col-span-2 flex items-center p-3 rounded-xl shadow-md">
                    <BookIcon size={30} className="text-green-500" />
                    <div className="ml-4">
                        <div className="text-md">Nombre de livres consultés</div>
                        <div className="font-semibold">{user?.View?.length ?? 0}</div>
                    </div>
                </div>
                <div className="col-span-2 flex items-center p-3 rounded-xl shadow-md">
                    <Star size={30} className="text-yellow-500" />
                    <div className="ml-4">
                        <div className="text-md">Nombre de livres en favoris</div>
                        <div className="font-semibold">{user?.FavoriteBook?.length ?? 0}</div>
                    </div>
                </div>
            </div>


            <div className="mb-4">
                <SecondTitle title={"Modifier vos informations"} subtitle={""} />
            </div>
            <div className="w-full">
                <EditUserForm />
            </div>
            <div className="mt-4">
                <SecondTitle
                    title={"Changer le Mot de passe"}
                    subtitle={""} className="my-4" />
                <ChangePasswordForm />
            </div>
            <div className="my-6">
                <button onClick={handleLogout} className="px-10 py-[3px] rounded-lg bg-red-700 text-red-200">Deconnexion</button>
            </div>
        </div>
    </div>
}