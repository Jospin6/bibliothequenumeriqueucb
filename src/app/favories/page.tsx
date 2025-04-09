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
    const { loading, user } = useSelector((state: RootState) => state.user)
    const currentUser = useCurrentUser()

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchUser(currentUser.id!))
        }
    }, [currentUser, dispatch])

    return (
        <>
            <Navbar />

            <div className="md:mx-[5%] mx-2 flex">
                <div className="h-auto md:w-[60%] w-full min-h-[calc(100vh-50px)] md:border-r-[1px] md:border-gray-200 md:px-[50px]">
                    <h2 className="text-2xl font-bold mb-5">Favories</h2>
                    {user && user.FavoriteBook?.map((favorite) => (
                        <MainItem book={favorite.book} key={favorite.book.id} />
                    ))}
                </div>
                <div className="h-[80px] w-[40%] hidden md:block px-[30px]">
                    <h1 className="mt-6 mb-4 font-semibold text-xl font-verdana">Ca peut vous interesser</h1>
                    {/* {getForYou.map(book => (<SideItem book={book} key={book.id} />))} */}
                </div>

            </div>
        </>
    );
}
