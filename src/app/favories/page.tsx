"use client"
import { Navbar } from "@/components/navigation/navbar";
import { MainItem } from "@/components/ui/mainItem";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUser } from "@/redux/user/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
    const dispatch = useDispatch<AppDispatch>()
    const {loading, user} = useSelector((state: RootState) => state.user)
    const currentUser = useCurrentUser()

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchUser(currentUser.id!))   
        }
    }, [currentUser, dispatch])

    return (
        <>
            <Navbar />
            <div className="w-2/4 m-auto">
                <h2 className="text-2xl font-bold mb-5">Favories</h2>
                {user && user.FavoriteBook?.map((favorite) => (
                    <MainItem book={favorite.book} key={favorite.book.id}/>
                ))}
            </div>
        </>
    );
}
