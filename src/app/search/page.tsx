"use client"
import { Navbar } from "@/components/navigation/navbar";
import { Searchbar } from "@/components/ui/searchbar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { AppDispatch } from "@/redux/store";
import { fetchUser, selectUser } from "@/redux/user/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Search() {
    const dispatch = useDispatch<AppDispatch>()
    const currentUser = useCurrentUser()
    const user = useSelector(selectUser)

    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        if (currentUser && !hasFetched) {
            dispatch(fetchUser(currentUser.id!));
            setHasFetched(true);
        }
    }, [currentUser, hasFetched, dispatch]);

    return <>
        <Navbar />
        <div className="w-full md:w-8/12 md:m-auto">
            <div className="mt-3 w-full flex justify-center px-4"><Searchbar facId={user?.faculteId!} /></div>
            <div className="mt-4 px-2">
                mes recherches
            </div>
        </div>
    </>
}