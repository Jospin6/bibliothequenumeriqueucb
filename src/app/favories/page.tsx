"use client";

import { Navbar } from "@/components/navigation/navbar";
import { MainItem } from "@/components/ui/mainItem";
import { MainItemSkeleton } from "@/components/ui/mainItemSkeleton";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUser } from "@/redux/user/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading } = useSelector((state: RootState) => state.user);
    const currentUser = useCurrentUser();

    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        if (currentUser && !hasFetched) {
            dispatch(fetchUser(currentUser.id!));
            setHasFetched(true);
        }
    }, [currentUser, hasFetched, dispatch]);

    return (
        <>
            {user && (<Navbar userFacId={user.faculteId!} />)}
            <div className="md:mx-[5%] mx-2 flex">
                <div className="h-auto md:w-[60%] w-full min-h-[calc(100vh-50px)] md:border-r-[1px] md:border-gray-200 md:px-[50px]">
                    <h2 className="text-2xl font-bold mb-5">Favories</h2>

                    {user && user.FavoriteBook?.length ? (
                        user.FavoriteBook.map((favorite) => (
                            <MainItem book={favorite.book} key={favorite.book.id} />
                        ))
                    ) : (
                        <p className="text-gray-500">Aucun livre favori trouvé.</p>
                    )}
                </div>

                <div className="h-[80px] w-[40%] hidden md:block px-[30px]">
                    <h1 className="mt-6 mb-4 font-semibold text-xl font-verdana">Ça peut vous intéresser</h1>
                    {/* Lazy-load ou suspense futur pour suggestions */}
                </div>
            </div>
        </>
    );
}
