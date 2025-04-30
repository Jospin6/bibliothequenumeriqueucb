"use client"
import { Navbar } from "@/components/navigation/navbar";
import { MainItem } from "@/components/ui/mainItem";
import { MainItemSkeleton } from "@/components/ui/mainItemSkeleton";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUser } from "@/redux/user/userSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Lecture() {
    const dispatch = useDispatch<AppDispatch>();
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const currentUser = useCurrentUser();

    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        if (currentUser && !hasFetched) {
            dispatch(fetchUser(currentUser.id!));
            setHasFetched(true);
        }
    }, [currentUser, hasFetched, dispatch]);

    useEffect(() => {
        const fetchBooks = async () => {
            const url = "http://localhost:3000/api/books";
            const res = await fetch(url);
            const data = await res.json();
            setBooks(data);
            setLoading(false);
        };

        fetchBooks();
    }, []);

    return <>
        <Navbar />

        <div className="md:mx-[5%] mx-2 flex">
            <div className="h-auto md:w-[60%] w-full min-h-[calc(100vh-50px)] md:border-r-[1px] md:border-gray-200 md:px-[50px]">
                <h2 className="text-2xl font-bold mb-5">Pour Toi</h2>
                {loading && "ucb".split("").map(i => <MainItemSkeleton key={i} />)}
                {books.length === 0 ? (
                    <MainItemSkeleton />
                ) : (
                    <ul className="space-y-4">
                        {loading
                            ? (<div className="text-black">Loading...</div>)
                            : books.map(book => <MainItem key={book.id} book={book} />)
                        }
                    </ul>
                )}
            </div>
            <div className="h-[80px] w-[40%] hidden md:block px-[30px]">
                <h1 className="mt-6 mb-4 font-semibold text-xl font-verdana">Les Nouveau documents</h1>
            </div>

        </div>
    </>
}